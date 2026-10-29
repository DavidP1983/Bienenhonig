import type { useTranslations } from 'next-intl';

type Translator = ReturnType<typeof useTranslations<'SupportContactForm'>>;

export const getSupportFormFields = (t: Translator) =>
  [
    {
      label: t('fields.email.label'),
      name: 'email',
      placeholder: t('fields.email.placeholder'),
      message: t('fields.email.message'),
      inputMode: 'email',
      autoComplete: 'email',
    },
    {
      label: t('fields.orderNumber.label'),
      name: 'orderNumber',
      placeholder: t('fields.orderNumber.placeholder'),
      message: t('fields.orderNumber.message'),
      inputMode: 'text',
      autoComplete: 'off',
    },
    {
      label: t('fields.subject.label'),
      name: 'subject',
      placeholder: t('fields.subject.placeholder'),
      message: t('fields.subject.message'),
      inputMode: 'text',
      autoComplete: 'off',
    },
  ] as const;
