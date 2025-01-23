'use client';
import Link from "next/link";
import { arrowup } from '@/assets/icons';
import { useEffect, useState } from "react";
import Image from "next/image";
import { throttle } from 'throttle-debounce';

import './styles/arrowup.scss';

export const ArrowUp = () => {
    const [scroll, setScrollTop] = useState<boolean>(false);


    useEffect(() => {
        const throttledScroll = throttle(1000, () => {
            setScrollTop(window.scrollY > 800);

        });
        window.addEventListener('scroll', throttledScroll);
        return () => {
            window.removeEventListener('scroll', throttledScroll);
        };
    }, []);


    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <Link href='#body'
            className={`arrowup ${scroll ? 'show' : ''}`}
            onClick={handleClick}
        >
            <Image
                src={arrowup}
                alt="arrow up"
                width={50}
                height={50} />
        </Link>
    );
}