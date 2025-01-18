import Link from 'next/link';
import Image from 'next/image';
import { Products } from '@/shared/types/type';
import { useProducts } from '@/store';
import { RateProducts } from '../UI/rate/Rate';


import '../products/styles/products.scss';

interface IProductsItem {
    data: Products[][];
}

export const ProductsItem = ({ data }: IProductsItem) => {
    const page = useProducts(state => state.page);

    if (!data.length) {
        return (
            <div className='articlescontainer'>
                <h2 className='nodata'><strong>No Data</strong> to display for this request</h2>
            </div>
        )
    }

    return (
        <div className='articlescontainer'>
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
                    <div className={stock ? 'content' : 'outstock'} key={_id}>
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
                        <div className='sort'>{sort}</div>
                        <Link href={`/products/${_id}`} className='descr'>{title} {size[0] ? `- ${size[0]}g` : ''}</Link>
                        <div className='price'><span>&#8364;</span>{price[0]}</div>
                        <div className='rating'>
                            <RateProducts rating={reviews} />
                            <Link href={`/products/${_id}`} className='qnt'>{reviews?.length} reviews</Link>
                        </div>
                        <div className={stock ? 'stock' : 'empty'}>
                            <div className='indicator'></div>
                            <div className='units'>In Stock, {qnt[0]} units</div>
                        </div>
                        <Link href={`/products/${_id}`} className={stock || qnt[0] ? 'checkOut' : 'outstockbtn'}>Check Product</Link>
                    </div>

                ))
            }
        </div>
    );
}


