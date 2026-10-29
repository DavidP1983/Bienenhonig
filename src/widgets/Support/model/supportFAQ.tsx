import type { CollapseProps } from 'antd';
import type { useTranslations } from 'next-intl';

type Translator = ReturnType<typeof useTranslations<'SupportFAQ'>>;

export const getSupportFAQ = (
  t: Translator
): Record<string, CollapseProps['items']> => ({
  orders: [
    {
      key: '1',
      label: t('orders.trackOrder.question'),
      children: <p>{t('orders.trackOrder.answer')}</p>,
    },
    {
      key: '2',
      label: t('orders.cancelOrder.question'),
      children: <p>{t('orders.cancelOrder.answer')}</p>,
    },
  ],

  delivery: [
    {
      key: '1',
      label: t('delivery.deliveryTime.question'),
      children: <p>{t('delivery.deliveryTime.answer')}</p>,
    },
    {
      key: '2',
      label: t('delivery.deliveryCost.question'),
      children: <p>{t('delivery.deliveryCost.answer')}</p>,
    },
  ],

  returns: [
    {
      key: '1',
      label: t('returns.returnProduct.question'),
      children: <p>{t('returns.returnProduct.answer')}</p>,
    },
  ],

  payments: [
    {
      key: '1',
      label: t('payments.paymentMethods.question'),
      children: <p>{t('payments.paymentMethods.answer')}</p>,
    },
  ],
});
