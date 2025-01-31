'use client';


import Link from 'next/link';
import { ProductsItem } from '@/components/products/ProductsItem';
import { ProductsFilter } from '@/components/products/ProductsFilter';
import { ProductsCategory } from './ProductsCategory';
import { Paginations } from '../UI/pagination/Pagination';
import { Spinner } from '../UI/spinner/Spinner';
import { ErrorComponent } from '../UI/error/ErrorComponent';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import SkeletonUI from '../UI/skeleton/Skeleton';

import { useEffect } from 'react';
import { useShallow } from "zustand/shallow";

import { useFilter, useProducts } from '@/store';
import { useSelectAndFilterSort } from '@/hooks/useSelectAndFilterSort';

import classes from '@/styles/Error.module.scss';
import '../products/styles/products.scss';
import { MobileFilter } from '../UI/mobilefilter/MobileFilter';

export const AllProducts = () => {
    const { data, status, errorMessage, limit, page, getProducts, changePageNumber } = useProducts(useShallow((state) => ({
        data: state.data,
        status: state.status,
        errorMessage: state.errorMessage,
        limit: state.limit,
        page: state.page,
        getProducts: state.getProducts,
        changePageNumber: state.changePageNumber

    })));
    const selectFilter = useFilter(state => state.filter);


    useEffect(() => {

        selectFilter.search = '';
        changePageNumber(1);
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { paginatedArray, totalPages } = useSelectAndFilterSort(data, limit, selectFilter);

    const loading = status === 'loading' ? <div style={{ textAlign: "center", marginTop: "100px", position: 'relative', maxHeight: "340px" }}>
        <Spinner /><SkeletonUI /></div> : null;
    const error = status === 'error' ? <div className={classes.error}><ErrorComponent error={errorMessage} /></div> : null;
    const content = !(loading || error) ? <ErrorBoundary><ProductsItem data={paginatedArray} /></ErrorBoundary> : null;


    return (
        <section className='products' >

            <div className='productscontainer'>
                <div className='categories'>
                    <ProductsCategory />
                </div>

                <div className='articles'>
                    <h1>All Products</h1>
                    <ProductsFilter showingItem={paginatedArray[page - 1]} totalItem={data.length} />
                    {loading}
                    {error}
                    {content}
                    <Paginations pages={totalPages} />
                </div>

                <div className='info'>
                    <h2 className='title'>Locations</h2>
                    <ul className='addr'>
                        <li>
                            <Link href="/location/Erkrath-Hochdahl" title="location address Erkrath-Hochdahl"><address ><strong>Erkrath-Hochdahl, Germany</strong></address></Link>
                        </li>
                        <li>
                            <Link href="/location/Dusseldorf" title="location address Düsseldorf"><address ><strong>Düsseldorf, Germany</strong></address></Link>
                        </li>
                        <li>
                            <a className='phone' href="tel:44999228974" inputMode='tel'>+4 (499) 922-89-74</a>
                        </li>
                    </ul>
                </div>
            </div>
            < MobileFilter />
        </section>
    );
}



