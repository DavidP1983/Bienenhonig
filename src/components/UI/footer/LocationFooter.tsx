import Image from 'next/image';
import Link from 'next/link';

import { facebook, instagram, whatsup } from '@/assets/icons/index';
import logo from '@/assets/img/logo.png';
import styles from '@/styles/Location.module.scss';

export const LocationFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerLogo}>
                    <Link href='/'>
                        <Image
                            src={logo}
                            alt="logo" />
                    </Link>
                </div>
                <div className={styles.footerLinks}>
                    <h2>Useful links</h2>
                    <ul>
                        <li>
                            <Link href='/'>Home</Link>
                        </li>
                        <li>
                            <Link href='/products'>Products</Link>
                        </li>
                        <li>
                            <Link href='/contacts'>Contacts</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.footerAddr}>
                    <h2>Address</h2>
                    <address>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className='fa fa-map-marker'></i>Germany, Dusseldorf</a>
                        <a href="mailto:bienenhonig.info@gmail.com" target="_blank" rel="noopener noreferrer">
                            <i className='fa fa-envelope-open'></i>bienenhonig.info@gmail.com</a>
                        <a href="tel:+99559951242628" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-phone"></i>+4(551) 243-263-283</a>
                    </address>
                </div>
            </div >
            <div className={styles.socialItems}>
                <a href="#" className={styles.social} target="_blank" rel="noopener noreferrer">
                    <Image
                        src={facebook} alt="facebook" />
                </a>
                <a href="#" className={styles.social} target="_blank" rel="noopener noreferrer">
                    <Image
                        src={instagram} alt="instagram" />
                </a>
                <a href="#" className={styles.social} id='whatsup' target="_blank" rel="noopener noreferrer">
                    <Image
                        src={whatsup} alt="whatsup" width={52} height={52} />
                </a>
            </div>
            <div className={styles.rights}>Copyright &copy;2025- Bienenhonig. All rights reserved.</div>
        </footer >
    );
}