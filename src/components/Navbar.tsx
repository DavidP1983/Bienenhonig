'use client';
import { urls } from '@/assets/img/index';
import { NavigationType } from '@/shared/types/type';
import { usePathname } from 'next/navigation';
import { Cart } from './cart/Cart';
import { MenuNavBar } from './MenuNavBar';


import styles from '../styles/Header.module.scss';

export const navigation: NavigationType[] = [
    { id: 1, title: "Home", path: "/", img: urls.home, subtitle: 'Back home' },
    { id: 2, title: "Products", path: "/products", img: urls.products, subtitle: 'Checkout our Products' },
    { id: 3, title: "Contacts", path: "/contacts", img: urls.contacts, subtitle: 'Contact us' },
];


export const Navbar = () => {
    const pathname = usePathname();

    return (

        <nav className={styles.content}>
            {
                navigation.map((item) => (
                    <div className={pathname === item.path ? styles.active : styles.links} key={item.id}>
                        <MenuNavBar {...item} />
                        <div className={styles.popup}>{item.subtitle}</div>
                    </div>
                ))
            }
            <Cart />
        </nav>
    )
}