import type { Rule } from 'antd/es/form';
import type { useTranslations } from 'next-intl';

export type CheckoutFieldConfig = {
  id: string;
  label: string;
  name: string | string[];
  placeholder: string;
  autoComplete: string;
  inputMode: 'text' | 'email' | 'tel';
  rules?: Rule[];
  span?: number;
  xs?: number;
  sm?: number;
};

type Translator = ReturnType<typeof useTranslations<'CheckoutForm'>>;

export const getCheckoutFormFields = (t: Translator): CheckoutFieldConfig[] => [
  {
    id: 'name',
    label: t('fields.name.label'),
    name: 'name',
    placeholder: t('fields.name.placeholder'),
    autoComplete: 'given-name',
    inputMode: 'text',
    rules: [
      {
        required: true,
        whitespace: true,
        message: t('fields.name.required'),
      },
    ],
  },
  {
    id: 'surname',
    label: t('fields.surname.label'),
    name: 'surname',
    placeholder: t('fields.surname.placeholder'),
    autoComplete: 'family-name',
    inputMode: 'text',
    rules: [
      {
        required: true,
        whitespace: true,
        message: t('fields.surname.required'),
      },
    ],
  },
  {
    id: 'email',
    label: t('fields.email.label'),
    name: 'email',
    placeholder: t('fields.email.placeholder'),
    autoComplete: 'email',
    inputMode: 'email',
    rules: [
      {
        required: true,
        whitespace: true,
        message: t('fields.email.required'),
      },
      {
        type: 'email',
        message: t('fields.email.invalid'),
      },
    ],
  },
  {
    id: 'phone',
    label: t('fields.phone.label'),
    name: 'phone',
    placeholder: t('fields.phone.placeholder'),
    autoComplete: 'tel',
    inputMode: 'tel',
  },
];

type TranslatorAddress = ReturnType<typeof useTranslations<'CheckoutForm'>>;

export const getCheckoutAddressFields = (
  t: TranslatorAddress
): CheckoutFieldConfig[] => [
  {
    id: 'country',
    label: t('fields.country.label'),
    name: ['address', 'country'],
    placeholder: t('fields.country.placeholder'),
    autoComplete: 'country-name',
    inputMode: 'text',
    rules: [
      {
        required: true,
        whitespace: true,
        message: t('fields.country.required'),
      },
    ],
    xs: 24,
    sm: 12,
  },
  {
    id: 'city',
    label: t('fields.city.label'),
    name: ['address', 'city'],
    placeholder: t('fields.city.placeholder'),
    autoComplete: 'address-level2',
    inputMode: 'text',
    rules: [
      {
        required: true,
        whitespace: true,
        message: t('fields.city.required'),
      },
    ],
    xs: 24,
    sm: 12,
  },
  {
    id: 'street',
    label: t('fields.street.label'),
    name: ['address', 'street'],
    placeholder: t('fields.street.placeholder'),
    autoComplete: 'street-address',
    inputMode: 'text',
    rules: [
      {
        required: true,
        whitespace: true,
        message: t('fields.street.required'),
      },
    ],
    span: 24,
  },
  {
    id: 'apartment',
    label: t('fields.apartment.label'),
    name: ['address', 'apartment'],
    placeholder: t('fields.apartment.placeholder'),
    autoComplete: 'address-line2',
    inputMode: 'text',
    xs: 24,
    sm: 12,
  },
  {
    id: 'postalCode',
    label: t('fields.postalCode.label'),
    name: ['address', 'postalCode'],
    placeholder: t('fields.postalCode.placeholder'),
    autoComplete: 'postal-code',
    inputMode: 'text',
    xs: 24,
    sm: 12,
  },
];
