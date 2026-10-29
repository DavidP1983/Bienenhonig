"use client";
import { useCartOrder } from "@/entities/cart";
import { Link } from "@/i18n/navigation";
import { ResultModal } from "@/shared/ui";
import { SyncOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Result, Row, Space } from "antd";
import { useTranslations } from "next-intl";
import { useShallow } from "zustand/react/shallow";
import {
  getCheckoutAddressFields,
  getCheckoutFormFields,
} from "../config/checkoutForm.config";
import type { CheckoutFormValues, CreateOrderPayload } from "../model/types";
import { useCreateOrder } from "../model/useCreateOrder";
import { RenderField } from "./RenderField";

import styles from "./CheckoutForm.module.scss";

const { TextArea } = Input;

export const CheckoutForm = () => {
  const t = useTranslations("CheckoutForm");
  const tResult = useTranslations("OrderConfirmResult");
  const checkoutFormFields = getCheckoutFormFields(t);
  const checkoutAddressFields = getCheckoutAddressFields(t);

  const [form] = Form.useForm<CheckoutFormValues>();

  const {
    mutate: createOrder,
    isPending,
    contextHolder,
    modalOpen,
    data,
  } = useCreateOrder();

  const { cartOrder, clearCart, idempotencyKey, setIdempotencyKey } =
    useCartOrder(
      useShallow((state) => ({
        idempotencyKey: state.idempotencyKey,
        cartOrder: state.cartOrder,
        setIdempotencyKey: state.setIdempotencyKey,
        clearCart: state.clearCart,
      })),
    );

  const handleSubmit = (values: CheckoutFormValues) => {
    const payload: CreateOrderPayload = {
      customer: values,
      items: cartOrder.map(({ productId, size, quantity }) => ({
        productId,
        size,
        quantity,
      })),
    };

    const key = idempotencyKey ?? crypto.randomUUID();

    if (!idempotencyKey) {
      setIdempotencyKey(key);
    }

    createOrder(
      { payload, idempotencyKey: key },
      {
        onSuccess: () => {
          setIdempotencyKey(null);
          clearCart();
          form.resetFields();
        },
      },
    );
  };

  return (
    <>
      {contextHolder}

      <ResultModal
        title={
          <div style={{ textAlign: "center", fontSize: 30, color: "#2b992b" }}>
            {tResult("successTitle")}
          </div>
        }
        open={modalOpen}
        closable={false}
      >
        <Result
          status="success"
          title={
            <>
              {tResult("orderNumber")} <strong>{data?.orderNumber}</strong>
            </>
          }
          subTitle={tResult("subTitle")}
          extra={
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Button type="primary" block>
                <Link href="/products">{tResult("continueShopping")}</Link>
              </Button>
            </Space>
          }
        />
      </ResultModal>

      <Form
        className={styles.checkoutForm}
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={true}
      >
        {checkoutFormFields.map((field) => (
          <RenderField key={field.id} field={field} />
        ))}

        <Row gutter={[16, 0]}>
          {checkoutAddressFields.map((field) => (
            <Col key={field.id} xs={field.xs} sm={field.sm} span={field.span}>
              <RenderField field={field} />
            </Col>
          ))}
        </Row>

        <Form.Item label={t("fields.comment.label")} name="comment">
          <TextArea
            placeholder={t("fields.comment.placeholder")}
            autoSize={{ minRows: 3, maxRows: 6 }}
            inputMode="text"
            data-id="textArea"
          />
        </Form.Item>

        <Form.Item className={styles.checkoutForm__btnCover}>
          <Button
            type="primary"
            icon={isPending ? <SyncOutlined spin /> : null}
            disabled={isPending}
            htmlType="submit"
            block
            className={styles.checkoutForm__btn}
          >
            {isPending
              ? t("placeOrder.placingOrder")
              : t("placeOrder.placeOrder")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
