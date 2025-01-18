'use client';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDeboucne } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { useFilter, useProducts } from '@/store';

export const InputSearch = () => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const changePageNumber = useProducts(state => state.changePageNumber);
    const { debouncedInput } = useDeboucne();
    const search = useFilter(state => state.filter.search)


    useEffect(() => {
        if (!search) {
            router.push('/products')
        } else {
            router.push(`/products?search=${search}`)
        }
    }, [router, search]);

    const suffix = (
        <SearchOutlined
            style={{
                fontSize: 16,
                color: '#1677ff',
            }}
        />
    );

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.getAttribute('name') as string;
        const value = e.target.value;
        setSearchValue(value);
        changePageNumber(1);//для пагинации
        debouncedInput(key, value);
    }


    return (

        <Input
            style={{ marginTop: 10 }}
            placeholder="Search by article name..."
            size="large"
            name='search'
            value={searchValue}
            allowClear
            suffix={suffix}
            onChange={onSearch}
        />
    );
}