import { CheckoutPage } from '@/pages_fsd/checkout/ui';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('CheckoutMetadata');

  return {
    title: t('checkoutTitle'),
  };
}

const Checkout = () => {
  return (
    <>
      <CheckoutPage />
    </>
  );
};

export default Checkout;
