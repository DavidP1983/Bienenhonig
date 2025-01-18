import Image from 'next/image';
import { urls } from '@/assets/img/index';

import styles from '@/styles/Home.module.scss';

export const HomePage = () => {
    return (
        <section className={styles.about}>
            <div className="container">
                <h1 className={styles.maintitle}>Welcome to the World <br />of Honey</h1>
                <div className={styles.content}>
                    <div className={styles.image}>
                        <Image
                            src={urls.passika}
                            alt="passika"
                            priority={true}
                            width={1200}
                            height={800}
                            style={{ width: "100%", height: "100%", aspectRatio: 1 }}
                        />
                    </div>
                    <div>
                        <h2 className={styles.title}>About me</h2>
                        <div className={styles.divider}></div>
                        <div className={styles.subtitle} >My name is Sergyi</div>
                        <p className={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        </p>
                    </div>
                    <div className={styles.image}>
                        <Image
                            src={urls.propose}
                            alt="propose"
                            width={1200}
                            height={800}
                            priority={true}
                        />
                    </div>
                    <div>
                        <h2 className={styles.title}>About my Products</h2>
                        <div className={styles.divider}></div>
                        <div className={styles.subtitle} >What i Propose</div>
                        <p className={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}