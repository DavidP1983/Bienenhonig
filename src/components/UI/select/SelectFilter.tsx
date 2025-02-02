import { Select, Space } from 'antd';

import styles from '@/styles/Select.module.scss';
import { useFilter } from '@/store';
import React from 'react';
import { DefaultOptionType } from 'antd/es/select';

export const SelectFilter = () => {
    const handleSelect = useFilter(state => state.handleSelect);

    const handleChange = (value: string, option?: DefaultOptionType) => {
        handleSelect(option?.title as string, value)
    };

    return (
        <div className={styles.selectfilter}>
            <div className={styles.title}>Sort by:</div>
            <Space >
                <Select
                    defaultValue="select options"
                    style={{ width: "147px" }}
                    onChange={handleChange}
                    allowClear
                    title='select'
                    aria-label='select options'
                    options={[
                        { value: 'sort', label: 'Alphabetically, A-Z', title: 'select' },
                        { value: 'price,L-H', label: 'Price, low to high', title: 'select' },
                        { value: 'price,H-L', label: 'Price, high to low', title: 'select' },
                    ]}
                    placeholder="select options"
                />
            </Space>
        </div>
    );
}