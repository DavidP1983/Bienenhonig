'use client';
import { useMemo, useState } from 'react';
import { RateProducts } from '../UI/rate/Rate';
import { useCalcPrice } from '@/hooks/useCalcPrice';
import { calcRating } from '@/utils/calcRating';
import { notification } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import { Products, ICartOrder } from '@/shared/types/type';

import classNames from 'classnames';

import '../singleItem/styles/singleItem.scss';
import { useCartOrder } from '@/store';
import { useShallow } from 'zustand/shallow';


export const SingleItemArticle = ({ size, price, title, sort, reviews, qnt, image }: Products) => {
    const [sizeItem, setSizeItem] = useState<number>(size[0]);
    const [priceItem, setPriceItem] = useState<number>(Number(price[0]));
    const [qntItem, setQntItem] = useState<number>(qnt[0]);
    const { counter, setCounter, increment, decrement } = useCalcPrice(1, qntItem);

    const [api, contextHolder] = notification.useNotification();
    const { status, getCartOrder } = useCartOrder(useShallow((state) => ({
        status: state.status,
        getCartOrder: state.getCartOrder,
    })));


    const isInStockClass = classNames({
        ['instock']: true,
        ['empty']: !qntItem
    })
    const isSizeValidClass = classNames({
        ['singleItem__article_size']: true,
        ['zeroSize']: !sizeItem
    })



    const onChangeFocus = (i: number) => {
        setSizeItem(size[i])
        setPriceItem(Number(price[i]))
        setQntItem(Number(qnt[i]));
    }

    const pickOrder = async () => {
        const id = uuidv4();
        const order: ICartOrder = {
            id: id,
            image: image,
            title: title,
            size: sizeItem,
            price: totalPrice,
            qnt: counter
        }

        try {
            await getCartOrder(order)
            api.open({
                message: <span style={{ color: "#33eb33", display: "block", textAlign: 'center' }}>Your order added successfully</span>,
                showProgress: true,
                pauseOnHover: false,
                placement: 'bottomRight'
            });
            setCounter(1);
        } catch (e) {
            if (e instanceof Error) {
                api.open({
                    message: <span style={{ color: "#eb0d10", display: "block", textAlign: 'center' }}>{e.message}</span>,
                    showProgress: true,
                    pauseOnHover: false,
                    placement: 'bottomRight'
                });
                setCounter(1);
            }
        }
    }



    const renderBtn = (btn: number[]) => {
        if (btn.length === 0) {
            return ''
        }
        const btnSize = btn.map((item, i) => {
            const btnClass = classNames({
                active: item === sizeItem
            });
            return (
                <button
                    className={`singleItem__article_choice-btn ${btnClass}`}
                    data-attr={item}
                    key={item}
                    onClick={() => onChangeFocus(i)}
                    suppressHydrationWarning={true}

                >
                    {item}g
                </button>
            )
        });

        return (

            <div className='singleItem__article_choice'>
                {btnSize}
            </div>
        )
    }

    const btn = renderBtn(size);
    const totalPrice = useMemo(() => (priceItem * counter).toFixed(2), [priceItem, counter]);
    const { totalStars } = calcRating(reviews);


    return (
        <div className='singleItem__article'>
            <div className='singleItem__article_fixe'>
                <h1 className='singleItem__article_title'>{title} {size[0] ? size[0] : ''}kg</h1>
                <div className='singleItem__article_sort'>{sort}</div>

                <div className='singleItem__article_rate'>
                    <div className='singleItem__article_rate-num'>{reviews.length ? totalStars : 'not rated yet'}</div>
                    <RateProducts rating={reviews} />
                </div>

                <div className='singleItem__article_divider'></div>

                <div className={isSizeValidClass}>Size: <span>{sizeItem}g</span></div>
                {btn}
                <div className='singleItem__article_price'>Price: <span>&#8364; {totalPrice || 0}</span> <em className={counter >= 3 ? 'visible' : ''}>(*Free shipping included)</em></div>

                <div className='singleItem__article_stock'>
                    <div className='singleItem__article_stock-label'>Stock:</div>
                    <div className='singleItem__article_stock-check'>
                        <div className={`singleItem__article_stock-check_indicator ${isInStockClass}`}></div>
                        <div className={`singleItem__article_stock-check_units ${isInStockClass}`}>In Stock, {qntItem < 4 && qntItem !== 0 ? `Only ${qntItem} units left` : `${qntItem} units`}</div>
                    </div>

                </div>

                <div className='singleItem__article_qnt'>
                    <div className='singleItem__article_qnt-label'>Quantity:</div>
                    <div className='singleItem__article_qnt-calculator'>
                        <button className='singleItem__article_qnt-min' type='button' suppressHydrationWarning={true} onClick={() => decrement()}>-</button>
                        <input type="text" value={counter} suppressHydrationWarning={true} readOnly aria-label="count" />
                        <button className='singleItem__article_qnt-max' type='button' suppressHydrationWarning={true} onClick={() => increment()}>+</button>
                    </div>
                </div>

                <div className='singleItem__article_discount'>*Free delivery In order more than 2 bottles</div>
                <button
                    className='singleItem__article_checkout'
                    type='button'
                    disabled={!qntItem || status}
                    suppressHydrationWarning={true}
                    onClick={pickOrder}
                >
                    Add to cart
                </button>
                {contextHolder}
            </div>
        </div>

    );
}