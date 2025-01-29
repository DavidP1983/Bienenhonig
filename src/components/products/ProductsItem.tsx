import Link from 'next/link';
import Image from 'next/image';
import { Products } from '@/shared/types/type';
import { useProducts } from '@/store';
import { RateProducts } from '../UI/rate/Rate';
import { useState } from 'react';
import * as motion from "motion/react-client";


import '../products/styles/products.scss';
import classNames from 'classnames';

interface IProductsItem {
    data: Products[][];
}

export const ProductsItem = ({ data }: IProductsItem) => {
    const page = useProducts(state => state.page);
    const [view, setView] = useState('grid');

    if (!data.length) {
        return (
            <div className='articlescontainer'>
                <h2 className='nodata'><strong>No Data</strong> to display for this request</h2>
            </div>
        )
    }

    const viewDirection = classNames({
        ['articlescontainer']: true,
        ['listViewHorizontal']: view === 'list'
    })

    return (
        <div id='container'>
            <div className='view'>
                <div className='viewTitle'>View</div>
                <button
                    className='viewBtn'
                    title='vertical view'
                    onClick={() => setView('grid')}>
                    <i className={`${"material-icons"} ${view === 'grid' ? 'active' : ''}`}>view_module</i></button>
                <button
                    className='viewBtn'
                    title='horizontal view'
                    onClick={() => setView('list')}>
                    <i className={`${"material-icons"} ${view === 'list' ? 'active' : ''}`}>view_list</i></button>
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


