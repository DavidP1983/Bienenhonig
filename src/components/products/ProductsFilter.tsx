import { SelectFilter } from '../UI/select/SelectFilter';
import { InputSearch } from '../UI/input/InputSearch';

import { Products } from '@/shared/types/type';

import '../products/styles/products.scss';

interface ProductsFilterType {
    showingItem: Products[];
    totalItem: number;
}

export const ProductsFilter = (props: ProductsFilterType) => {
    const { showingItem, totalItem } = props;
    return (
        <div className='articlefilter'>
            <div className='totalarticle'>{`Showing 1 - ${showingItem?.length ?? 0} of ${totalItem ?? 0} products`}</div>
            <SelectFilter />
            <InputSearch />
        </div>
    );
}