import Link from 'next/link';
import logo from "@/assets/img/logo.png";
import Image from 'next/image';
import { Navbar } from './Navbar';

import styles from '../styles/Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
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

            <div className={styles.logo}>
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