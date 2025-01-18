import { useReviews } from '@/store';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

export const Breadcrumbs = () => {
    const dataSingleItem = useReviews(state => state.dataSingleItem);

    return (
        <Breadcrumb
            style={{ marginLeft: "21px", position: "absolute" }}
            items={[
                {
                    title: <Link href='/'><HomeOutlined /></Link>,
                },
                {
                    title: (
                        <>
                            <UserOutlined />
                            <span><Link href='/products'>All Products</Link></span>
                        </>
                    ),
                },
                {
                    title: dataSingleItem.title ?? "Raw Certified Organic Honey",
                },
            ]}
        />
    );
}
