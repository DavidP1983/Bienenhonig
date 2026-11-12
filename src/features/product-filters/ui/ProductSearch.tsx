'use client';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDebounce } from '../model/useDebounce';

export const ProductSearch = () => {
  const t = useTranslations('ProductFilter');

  const [searchValue, setSearchValue] = useState('');
  const { debouncedInput } = useDebounce();

  const suffix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedInput(value);
  };

  return (
    <Input
      placeholder={t('searchPlaceholder')}
      size="large"
      name="search"
      value={searchValue}
      allowClear
      suffix={suffix}
      onChange={onSearch}
    />
  );
};
