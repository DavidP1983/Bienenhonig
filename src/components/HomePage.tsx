'use client';
import Image from 'next/image';
import { textAnimation } from '@/animation/textAnimation';
import { urls } from '@/assets/img/index';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import styles from '@/styles/Home.module.scss';

export const HomePage = () => {
    const myRef = useRef<HTMLUListElement>(null);

    useGSAP(() => {
        gsap.registerPlugin(MotionPathPlugin);
        gsap.set(".bee", { opacity: 0, visibility: "hidden", x: -1100, y: -100 });
        const beeTimeline = gsap.timeline();
        beeTimeline
            .to(".bee", {
                visibility: "visible", // Пчелка становится видимой
                opacity: 1,
                duration: 1.5,
                ease: "power1.inOut",
            })
            .to(".bee", {
                motionPath: {
                    path: "#beePath",
                    align: "#beePath",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                },
                duration: 6,
                ease: "power1.inOut",
            })
            .to(".bee", {
                opacity: 0,
                scale: 0, // Уходит за пределы экрана
                duration: 1.5,
                ease: "power1.inOut",
                onComplete: () => {
                    // Устанавливаем финальное состояние, чтобы предотвратить "возврат"
                    gsap.set(".bee", { visibility: "hidden", x: 0, scale: 1 });
                },
            });

        if (myRef?.current) {
            const elem = myRef?.current.querySelectorAll(`.${styles.words} li`);
            textAnimation(elem);
        }

    });

    return (
        <section className={styles.about}>
            <div className="container">
                <div className={styles.maintitle}>
                    <h1 className={styles.title} id="words">Welcome to the World </h1>
                    <h1 className={styles.subtitle}>of
                        <ul className={styles.words} ref={myRef}>
                            <li>Honey</li>
                            <li>Bee</li>
                            <li>And more...</li>
                        </ul>
                    </h1>
                </div>
                <div style={{ maxWidth: "200px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" width="100%" height={0}>
                        <path
                            id="beePath"
                            fill="none"
                            stroke="transparent"
                            strokeWidth="2"
                            d="M-100,-50 C300,50 900,50 1540,-50"
                        />
                    </svg>
                    <div className='bee' style={{ position: "absolute", top: 0, left: 0, zIndex: 3, visibility: "hidden", }}>
                        <Image
                            src="https://res.cloudinary.com/dmrsemgsn/image/upload/v1738612908/output-onlinegiftools_jfpkky.gif"
                            alt="bee"
                            width={100}
                            height={100}
                            unoptimized
                        />
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.image}>
                        <Image
                            id="passika"
                            src={urls.passika}
                            alt="passika"
                            priority={true}
                            width={400}
                            height={400}
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
                    <div className={styles.image} >
                        <Image
                            id={styles.propose}
                            src={urls.propose}
                            alt="propose"
                            width={400}
                            height={400}
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