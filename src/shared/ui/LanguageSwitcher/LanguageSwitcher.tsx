'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { Select } from 'antd';
import { useLocale } from 'next-intl';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Select
      value={locale}
      onChange={handleChange}
      options={[
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Русский' },
      ]}
      aria-label="Select language"
      style={{ width: 120 }}
    />
  );
};
