'use client';

import Link from 'next/link';
import { urls } from '@/assets/img/index';
import Image from 'next/image';
import { NavigationType } from '@/shared/types/type';
import { usePathname } from 'next/navigation';
import { Cart } from './cart/Cart';


import styles from '../styles/Header.module.scss';

const navigation: NavigationType[] = [
    { id: 1, title: "Home", path: "/", img: urls.home, subtitle: 'Back home' },
    { id: 2, title: "Products", path: "/products", img: urls.products, subtitle: 'Checkout our Products' },
    { id: 3, title: "Contacts", path: "/contacts", img: urls.contacts, subtitle: 'Contact us' },
];


export const Navbar = () => {
    const pathname = usePathname();

    return (

        <nav className={styles.content}>
            {
                navigation.map(({ id, title, path, img, subtitle }) => (
                    <div className={pathname === path ? styles.active : styles.links} key={id}>
                        <Link href={path}>{title}</Link>
                        <Image
                            src={img}
                            alt={title}
                            priority={true}
                            width={300}
                            height={300} />
                        <div className={styles.popup}>{subtitle}</div>
                    </div>
                ))
            }
            <Cart />
        </nav>
    )
}