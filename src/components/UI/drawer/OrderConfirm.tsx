import { Drawer, Popconfirm } from 'antd';
import Image from 'next/image';
import { Buttons } from '../button/Buttons';
import { useCartOrder } from '@/store';
import { useShallow } from 'zustand/shallow';
import { ICartOrder } from '@/shared/types/type';
import sadBee from '@/assets/img/error/sadBee.png';
import { useRouter } from 'next/navigation';


import './styles/orderConfirm.scss';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void
}

export const OrderConfirm = ({ open, setOpen }: Props) => {
    const router = useRouter();
    const { cartOrder, removeOrder } = useCartOrder(useShallow((state) => ({
        cartOrder: state.cartOrder,
        removeOrder: state.removeOrder,
    })))


    const renderOrder = (arr: ICartOrder[]) => {
        if (arr.length === 0) {
            return <div className='order__item-empty'>Currently you do not any order
                <Image
                    src={sadBee}
                    alt='sadBee'
                    width={200}
                    height={200} />
            </div>
        }
        const orderItems = arr.map((item) => {
            return (
                <li className='order__item' key={item.id}>
                    <div className='order__item-image'>
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={200}
                            height={200} />
                    </div>
                    <div className='order__item-descr'>
                        <div className='title'>{item.title}</div>
                        <div className='size'>Size: <strong>{item.size}g</strong></div>
                        <div className='price'>Price: <strong>&#8364; {item.price}</strong></div>
                        <div className='qnt'>Quantity: <strong>{item.qnt}</strong></div>
                    </div>
                    <Popconfirm
                        placement="topLeft"
                        title="Are you sure to delete this item"
                        description="delete the item"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => removeOrder(item.id)}
                    >
                        <button className='order__item-remove'>
                            <i className="fa fa-trash-o" style={{ fontSize: "24px" }}></i>
                        </button>
                    </Popconfirm>
                    <div></div>
                </li>

            );
        })

        return (
            <ul className='order'>
                {orderItems}
            </ul>
        );
    }


    const order = renderOrder(cartOrder)

    return (

        <Drawer
            closable
            destroyOnClose
            title={<p>Order confirmation <br /> Cart: {cartOrder.length ? `${cartOrder.length} items` : "is empty"}</p>}
            placement="right"
            open={open}
            onClose={() => setOpen(false)}
            classNames={
                {
                    wrapper: "order__drawerContent",
                    mask: "order__drawerMask",
                    header: "order__drawerTitle",
                    content: "order__drawerClose"

                }
            }
        >
            {order}
            <Buttons
                props={{
                    type: "primary",
                    style: { display: 'block', marginTop: '70px', width: '100%' },
                    onClick: () => {
                        setOpen(false);
                        router.push('/contacts');
                    },
                    disabled: !cartOrder.length
                }}>
                Checkout
            </Buttons>
        </Drawer>

    );
}