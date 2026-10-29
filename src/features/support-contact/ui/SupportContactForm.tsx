"use client";
import { ResultModal } from "@/shared/ui";
import { SyncOutlined } from "@ant-design/icons";
import { Button, Form, Input, Result, Space } from "antd";
import { useTranslations } from "next-intl";
import { getSupportFormFields } from "../config/supportForm.config";
import type { SupportFormValues } from "../model/types";
import { useCreateTicket } from "../model/useCreateTicket";

import styles from "./SupportContactForm.module.scss";

const { TextArea } = Input;

export const SupportContactForm = () => {
  const t = useTranslations("SupportContactForm");
  const supportFormFields = getSupportFormFields(t);

  const [form] = Form.useForm<SupportFormValues>();
  const {
    mutate: createTicket,
    isPending,
    contextHolder,
    modalOpen,
    onClose,
    data,
  } = useCreateTicket();

  const handleSubmit = (values: SupportFormValues) => {
    const payload = {
      email: values.email,
      orderNumber: values.orderNumber,
      subject: values.subject,
      comment: values.comment,
    };

    createTicket(
      { payload },
      {
        onSuccess: (response) => {
          if (
            response.customerEmailStatus === "failed" ||
            response.supportEmailStatus === "failed"
          ) {
            return;
          }
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
          <div style={{ textAlign: "center", fontSize: 25, color: "#2b992b" }}>
            {t("successTitle")}
          </div>
        }
        open={modalOpen}
        onClose={onClose}
        closable
      >
        <Result
          status="success"
          title={
            <>
              {t("ticketNumber")} <strong>{data?.ticketNumber}</strong>
            </>
          }
          subTitle={t("successSubtitle")}
          extra={
            <Space
              className={styles.space}
              direction="vertical"
              size="middle"
              style={{ width: "100%", textAlign: "left" }}
            >
              <div>
                {t("orderNumber")}: <strong>{data?.order?.orderNumber}</strong>
              </div>
              <div>
                {t("orderTotal")}: <strong>{data?.order?.totalPrice}€</strong>
              </div>
              <div>
                {t("status")}:{" "}
                <strong className={styles.label}>{data?.status}</strong>
              </div>
              <div className={styles.desc}>{t("reviewMessage")}</div>
            </Space>
          }
        />
      </ResultModal>

      <div className={styles.supportForm}>
        <h3 className={styles.supportForm__title}> {t("formTitle")}</h3>
        <p className={styles.supportForm__desc}>{t("formDescription")}</p>
        <Form
          className={styles.supportForm__form}
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={true}
        >
          {supportFormFields.map((field) => (
            <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              data-label="label"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: field.message,
                },
              ]}
            >
              <Input
                className={styles.input}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                inputMode={field.inputMode}
                data-id="input"
              />
            </Form.Item>
          ))}
          <Form.Item label={t("comment.label")} name="comment">
            <TextArea
              className={styles.input}
              placeholder={t("comment.placeholder")}
              autoSize={{ minRows: 3, maxRows: 6 }}
              inputMode="text"
              data-id="textArea"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              icon={isPending ? <SyncOutlined spin /> : null}
              disabled={isPending}
              htmlType="submit"
              block
              className={styles.btn}
            >
              {isPending ? t("sendingMessage") : t("sendMessage")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
