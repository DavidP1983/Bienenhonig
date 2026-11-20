'use client';
import { SyncOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import type { TBackInStock } from '../model/types';
import { useBackInStock } from '../model/useBackInStock';

import styles from './BackInStockSubscribeForm.module.scss';

export const BackInStockSubscribeForm = ({
  productId,
}: {
  productId: string;
}) => {
  const t = useTranslations('BackInStock');

  const [form] = Form.useForm<TBackInStock>();

  const { mutate, isPending } = useBackInStock();

  const handleSubmit = (values: TBackInStock) => {
    const payload = {
      productId: productId,
      email: values.email.trim(),
    };
    mutate(payload);
    form.resetFields();
  };

  return (
    <Form
      className={styles.backInStock}
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark>
      <Form.Item
        className={styles.formItem}
        label={t('fields.email.label')}
        name="email"
        rules={[
          {
            required: true,
            whitespace: true,
            message: t('fields.email.required'),
          },
          {
            type: 'email',
            message: t('fields.email.invalid'),
          },
        ]}>
        <Input
          className={styles.input}
          id="email"
          inputMode="email"
          placeholder={t('placeholder')}
          autoComplete="email"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          icon={isPending ? <SyncOutlined spin /> : null}
          disabled={isPending}
          htmlType="submit"
          block
          className={styles.btn}>
          {isPending ? t('submitting') : t('submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};
