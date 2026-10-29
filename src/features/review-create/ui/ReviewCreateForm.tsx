'use client';
import type { Review } from '@/entities/review/model/type';
import { useCreateReview } from '@/entities/review/model/useCreateReview';
import { StatusMessage } from '@/shared/ui';
import { Button, Form, Input, Select, message } from 'antd';
import { useTranslations } from 'next-intl';

type ReviewCreateFormValues = Pick<
  Review,
  'name' | 'city' | 'title' | 'rating' | 'comment' | 'productId'
>;

type ReviewCreateFormProps = {
  productId: string;
  onCancel: () => void;
  onReviewCreated?: () => void;
};

export const ReviewCreateForm = ({
  productId,
  onCancel,
  onReviewCreated,
}: ReviewCreateFormProps) => {
  const t = useTranslations('ProductReviewModal');

  const [form] = Form.useForm<ReviewCreateFormValues>();
  const mutation = useCreateReview(productId);

  const onFinish = (value: Omit<ReviewCreateFormValues, 'productId'>) => {
    mutation.mutate(
      {
        ...value,
        productId,
      },
      {
        onSuccess: () => {
          form.resetFields();
          onReviewCreated?.();
          onCancel();
          message.success(t('successMessage'));
        },
      }
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}>
      <Form.Item
        label={t('name')}
        name="name"
        rules={[
          { required: true, message: t('nameRequired') },
          { max: 50, message: t('max50') },
        ]}
        hasFeedback
        validateTrigger="onBlur">
        <Input placeholder={t('namePlaceholder')} />
      </Form.Item>

      <Form.Item
        label={t('city')}
        name="city"
        rules={[
          { required: true, message: t('cityRequired') },
          { max: 50, message: t('max50') },
        ]}
        hasFeedback
        validateTrigger="onBlur">
        <Input placeholder={t('cityPlaceholder')} />
      </Form.Item>

      <Form.Item
        label={t('rating')}
        name="rating"
        rules={[
          { required: true, message: t('ratingRequired') },
          {
            type: 'number',
            min: 1,
            max: 5,
            message: t('ratingRange'),
          },
        ]}
        hasFeedback>
        <Select
          placeholder={t('ratingPlaceholder')}
          options={[
            { value: 1, label: t('ratingPoor') },
            { value: 2, label: t('ratingFair') },
            { value: 3, label: t('ratingGood') },
            { value: 4, label: t('ratingVeryGood') },
            { value: 5, label: t('ratingExcellent') },
          ]}
        />
      </Form.Item>

      <Form.Item
        label={t('title')}
        name="title"
        rules={[{ required: true, message: t('titlePlaceholder') }]}>
        <Select
          placeholder={t('titlePlaceholder')}
          options={[
            { value: 'Bad Honey', label: t('titleBadHoney') },
            { value: 'Good Honey', label: t('titleGoodHoney') },
            { value: 'Excellent honey', label: t('titleExcellentHoney') },
          ]}
        />
      </Form.Item>

      <Form.Item
        label={t('comment')}
        name="comment"
        rules={[
          { required: true, message: t('commentRequired') },
          { min: 10, message: t('commentMin') },
          { max: 1000, message: t('max1000') },
        ]}
        hasFeedback
        validateTrigger="onBlur">
        <Input.TextArea
          placeholder={t('commentPlaceholder')}
          rows={4}
          showCount
          maxLength={1000}
        />
      </Form.Item>

      <Form.Item>
        {mutation.isError && (
          <StatusMessage
            type="error"
            message={t('submitError')}
            description={mutation.error.message}
          />
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
            disabled={mutation.isPending}>
            {t('submit')}
          </Button>
          <Button
            onClick={onCancel}
            style={{ marginLeft: 8 }}
            htmlType="button">
            {t('cancel')}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
