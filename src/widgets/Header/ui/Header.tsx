'use client';
import logo from '@/shared/assets/img/logo.png';
import { headerAnimation } from '@/widgets/Header/lib/headerAnimation';
import { NavBarMobile } from '@/widgets/NavBarMobile/ui';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
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
      <div>
        <svg
          className={styles.circle}
          viewBox="0 0 100 100">
          <path
            id="circle"
            d="M 0,50 a 50,50 0 1,1 0,1 z"
          />
          <text>
            <textPath xlinkHref="#circle">raw honey</textPath>
          </text>
        </svg>
      </div>

      <div className={styles.logo}>
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={110}
            height={110}
            priority
          />
        </Link>
      </div>
      <div className={styles.desktopNav}>
        <Navbar />
      </div>
      <div className={styles.mobileNav}>
        <NavBarMobile />
      </div>
    </header>
  );
};
