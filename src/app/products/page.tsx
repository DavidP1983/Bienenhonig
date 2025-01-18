import { Metadata } from "next";
import { AllProducts } from '@/components/products/AllProducts';

export const metadata: Metadata = {
    title: 'Products | Page',
}

export const revalidate = 10;

const Products = () => {
    return (
        <AllProducts />
    )
}

export default Products;