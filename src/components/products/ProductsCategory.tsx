import { useState } from 'react';
import { Checkbox, Group, Stack, Text } from '@mantine/core';
import { dbCategory } from './dbCategory';

import { useFilter, useMobileFilter, useProducts } from '@/store';
import '../products/styles/products.scss';

export const ProductsCategory = () => {
    const [value, setValue] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const handleCheck = useFilter(state => state.handleSelect);
    const changePageNumber = useProducts(state => state.changePageNumber);
    const changeStatus = useMobileFilter(state => state.changeStatus);


    const handleCheckboxChange = (event: React.MouseEvent<HTMLButtonElement>, currentVal: string) => {
        const attrValue = event.currentTarget.dataset.set as string;
        const checkBox = event.currentTarget.role as string;
        setSelected((prev) => (prev === attrValue ? null : attrValue));
        const isEmptyValue = selected === currentVal ? [''] : [attrValue];
        setValue(isEmptyValue);
        changePageNumber(1);// из-за пагинации
        changeStatus(); //close filter modal on mobile 
        handleCheck(checkBox, isEmptyValue[0]);

    }


    const cards = dbCategory.map((item) => (
        <Checkbox.Card
            radius="md"
            value={item.category}
            key={item.category}
            data-set={item.category}
            className='root'
            checked={selected === item.category}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleCheckboxChange(event, item.category)} >
            <Group wrap="nowrap" align="flex-start" >
                <Checkbox.Indicator classNames={{ indicator: 'input' }} />
                <div>
                    <Text style={{ fontSize: "18px", fontWeight: 700, color: "#000" }}>{item.category}</Text>
                    <Text style={{ fontWeight: 700 }}>{item.description}</Text>
                </div>
            </Group>
        </Checkbox.Card>
    ));

    return (
        <>
            <Checkbox.Group
                value={value}
                label="Categories"
                classNames={{ label: 'title', description: 'description' }}
                description="Choose your category that you will need to be shown"
            >
                <Stack pt="md" gap="xs">
                    {cards}
                </Stack>
            </Checkbox.Group>

            <Text style={{ marginTop: "10px", fontWeight: 500 }}>
                Selected Category: {value}
            </Text>
        </>
    );
}