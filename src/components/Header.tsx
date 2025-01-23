'use client';
import Link from 'next/link';
import logo from "@/assets/img/logo.png";
import Image from 'next/image';
import { headerAnimation } from '@/animation/headerAnimatiom';
import { Navbar } from './Navbar';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

import styles from '../styles/Header.module.scss';

export const Header = () => {
    const myRef = useRef<HTMLHeadElement>(null);

    useGSAP(() => {
        if (myRef?.current) {
            const elem = myRef?.current;
            headerAnimation(elem);
        }
    });

    return (
        <header className={styles.header} ref={myRef}>
            <div>
                <svg className={styles.circle} viewBox="0 0 100 100">
                    <path id="circle" d="M 0,50 a 50,50 0 1,1 0,1 z" />
                    <text>
                        <textPath xlinkHref="#circle">
                            raw honey
                        </textPath>
                    </text>
                </svg>
            </div>

            <div className={styles.logo} >
                <Link href='/'>
                    <Image
                        src={logo}
                        alt='logo'
                        width={100}
                        height={100}
                        priority={true} />
                </Link>
            </div>
            <Navbar />
        </header>
    )
}