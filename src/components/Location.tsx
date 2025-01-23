'use client';

import Image from 'next/image';
import { Accordion } from "@/components/UI/accordion/Accordion";
import { Video } from "@/components/UI/video/Video";
import Link from "next/link";   // заменить позже вместо кнопки
import { useSearchParams } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react';

import { LocationType } from '@/shared/types/type';

import { location } from '@/assets/icons';
import styles from '@/styles/Location.module.scss';


export const Location = ({ title, city, srcURI, info, description, gelleryImage }: LocationType) => {
    const router = useSearchParams();
    const forwardProductItem = router.get('products');

    const container = useRef(null);
    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: '100%',
                scrub: 4,
                toggleActions: "play pause resume reset"
            }
        });


        tl.fromTo('.title',
            { x: -1100, opacity: 0, fontSize: 0, ease: "power1.out" },
            { x: 0, opacity: 1, fontSize: 80, duration: 6, delay: 1.2, ease: "power1.out" }
        );

        tl.fromTo('.box', {
            x: -1100, rotation: -360, opacity: 0, ease: "power1.out"
        },
            {
                x: 0,
                opacity: 1,
                rotation: 0,
                duration: 5,
                ease: "power1.out",
                stagger: 1.2,
            });

    },
    );

    return (
        <main id={styles.sectionloacation}>
            <section className={styles.location}>
                <div className="container">
                    <div className={styles.title}>
                        <div></div>
                        <h1>Our <span>{title}</span> Honey from the  Heart of Nature</h1>
                        <div></div>
                    </div>
                    <div className={styles.addr}>
                        <Image
                            src={location} alt={city} width={30} height={30} />
                        <address><strong>{city}, Germany</strong></address>
                        <Image
                            src={srcURI}
                            alt={title}
                            title={title}
                            width={508}
                            height={340}
                            className={styles.clover}
                        />
                    </div>
                    <div className={styles.desc}><q>{info}</q></div>
                </div>
            </section>
            <section className={styles.reason} ref={container}>
                <div className="container">
                    <h2 className={styles.title}>Why this region?</h2>
                    <article >
                        <div className={styles.article}>{description}</div>
                    </article>
                </div>
                <Link href={forwardProductItem ? `/products/${forwardProductItem}` : '/products'} className={styles.btn} >Try our honey</Link>
            </section>
            <section className={styles.gellery} >
                <h2 className={`title ${styles.title}`}>Gellery of Loaction</h2>
                <div className="container" >
                    <div className={styles.gellerycontainer} >
                        <div className={`box ${styles.items}`} >
                            <Image
                                src={gelleryImage.img1}
                                alt={`photo of location ${city}`}
                                title={city}
                                width={1600}
                                height={1200}
                            />
                        </div>
                        <div className={`box ${styles.items}`}>
                            <Image
                                src={gelleryImage.img2}
                                alt={`photo of location ${city}`}
                                title={city}
                                width={1600}
                                height={1200}
                            />
                        </div>
                        <div className={`box ${styles.items}`}>
                            <Image
                                src={gelleryImage.img3}
                                alt={`photo of location ${city}`}
                                title={city}
                                width={1600}
                                height={1200}
                            />
                        </div>
                        <div className={`box ${styles.items}`} id={styles.video}>
                            <Video />
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.accordion}>
                <div className="container">
                    <h2 className={styles.title}>Recipes & Opinions</h2>
                    <div>
                        <Accordion />
                    </div>
                </div>
            </section>
        </main>
    );
}