'use client';
import { useCartOrder } from "@/store";
import { Cartsvg } from "../UI/cart/Cartsvg";
import { OrderConfirm } from "../UI/drawer/OrderConfirm";
import { useState } from "react";

import './style/cart.scss';

export const Cart = () => {
    const cartOrder = useCartOrder(state => state.cartOrder);
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <div className='cart'>
                <button className="cart__btn" suppressHydrationWarning={true} onClick={() => setOpen(true)}>
                    <Cartsvg />
                    <div className="cart__count">
                        <span>{cartOrder.length}</span>
                    </div>
                </button>
            </div>
            <OrderConfirm open={open} setOpen={setOpen} />
        </>
    );
}