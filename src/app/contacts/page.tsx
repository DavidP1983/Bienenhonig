import { Metadata } from "next";
import { CheckoutPage } from "@/components/checkoutPage/CheckoutPage";
export const metadata: Metadata = {
    title: 'Contacts | Page',
}

import styles from '@/styles/Contacts.module.scss';

const Products = () => {
    return (
        <div className={styles.contacts}>
            <div className="container">
                <h1 className={`${styles.title} ${styles.typewriter}`}>We are glad to see you and ready to process your order</h1>
                <div className={styles.subtitle}>*Before processing your order, Please fill out this form and we will contact you as soon as possible</div>
                <CheckoutPage />
            </div>
        </div>
    )
}

export default Products;
