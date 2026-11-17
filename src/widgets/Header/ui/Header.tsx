'use client';
import { Cart } from '@/features/checkout/ui/Cart';
import { headerAnimation } from '@/widgets/Header/lib/headerAnimation';
import { NavBarMobile } from '@/widgets/NavBarMobile/ui';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { useRef } from 'react';
import { Navbar } from './NavBar';

import styles from './Header.module.scss';

export const Header = () => {
  const myRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const element = myRef?.current;
    if (!element) return;
    return headerAnimation(element);
  });

  return (
    <header
      className={styles.header}
      ref={myRef}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Bienenhonig</Link>
        </div>
        <div className={styles.desktopNav}>
          <Navbar />
        </div>
        <div className={styles.mobileNav}>
          <NavBarMobile />
        </div>
        <div className={styles.cart}>
          <Cart />
        </div>
      </div>
    </header>
  );
};
