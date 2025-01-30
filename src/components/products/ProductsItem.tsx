import Link from 'next/link';
import Image from 'next/image';
import { Products } from '@/shared/types/type';
import { useMobileFilter, useProducts } from '@/store';
import { RateProducts } from '../UI/rate/Rate';
import { useState } from 'react';
import * as motion from "motion/react-client";
import classNames from 'classnames';
import { btnArray, IBtnView } from './dbProductsItem';

import '../products/styles/products.scss';

interface IProductsItem {
    data: Products[][];
}

export const ProductsItem = ({ data }: IProductsItem) => {
    const page = useProducts(state => state.page);
    const changeStatus = useMobileFilter(state => state.changeStatus);
    const [view, setView] = useState('vertical');

    if (!data.length) {
        return (
            <div className='articlescontainer'>
                <h2 className='nodata'><strong>No Data</strong> to display for this request</h2>
            </div>
        )
    }

    const viewDirection = classNames({
        ['articlescontainer']: true,
        ['listViewHorizontal']: view === 'horizontal'
    })


    const renderBtn = (arr: IBtnView[]) => {
        return arr.map((item) => (
            <button
                key={item.title}
                className={item.clazz}
                title={item.title}
                style={{ order: item.order }}
                onClick={() => {
                    setView(item.title);
                    if (item.title === 'filter') {
                        changeStatus();
                    }
                }}>
                <i className={`${"material-icons"} ${view === item.title ? 'active' : ''}`}>{item.content}</i></button>
        ));
    }

    const btn = renderBtn(btnArray);

    console.log("Products Item");


    return (
        <div id='container'>
            <div className='view'>
                <div className='viewTitle' style={{ order: 1 }}>View</div>
                {btn}
                <div className='viewTitle mobile' style={{ order: 4 }}>Filters</div>
            </div>

            <div className={viewDirection}>
                {
                    data[page - 1].map(({
                        _id,
                        image,
                        sort,
                        title,
                        price,
                        qnt,
                        size,
                        stock,
                        reviews
                    }) => (
                        <motion.div
                            className={stock ? 'content' : 'outstock'}
                            key={_id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                type: "tween",
                                stiffness: 80,
                                damping: 20,
                                ease: "linear"
                            }}>
                            <div className='image'>
                                <Link href={`/products/${_id}`}>
                                    <Image
                                        src={image}
                                        width={200}
                                        height={200}
                                        alt={sort}
                                        priority={true}
                                    />
                                </Link>
                            </div>

                            <div className='description'>
                                <div className='sort'>{sort}</div>
                                <Link href={`/products/${_id}`} className='descr'>{title} {size[0] ? `- ${size[0]}g` : ''}</Link>
                                <div className='price'><span>&#8364;</span>{price[0]}</div>
                                <div className='rating'>
                                    <RateProducts rating={reviews} />
                                    <Link href={`/products/${_id}#reviews`} className='qnt'>{reviews?.length} reviews</Link>
                                </div>
                                <div className={stock ? 'stock' : 'empty'}>
                                    <div className='indicator'></div>
                                    <div className='units'>In Stock, {qnt[0]} units</div>
                                </div>
                                <Link href={`/products/${_id}`} className={stock || qnt[0] ? 'checkOut' : 'outstockbtn'}>Check Product</Link>
                            </div>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    );
}


