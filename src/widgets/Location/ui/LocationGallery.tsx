'use client';
import type { LocationType } from '@/entities/location/model/type';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';
import { Video } from './Video';

import styles from './Location.module.scss';

export const LocationGallery = ({
  gelleryImage,
  city,
}: Partial<LocationType>) => {
  const t = useTranslations('LocationGallery');
  const container = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      gsap.fromTo(
        '.title',
        {
          x: -500,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.from('.box', {
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      className={styles.gellery}
      ref={container}>
      <h2 className={`title ${styles.title}`}>{t('title')}</h2>
      <div className={styles.gellerycontainer}>
        <div className={`box ${styles.items}`}>
          <Image
            src={gelleryImage?.img1 ?? ''}
            alt={`photo of location ${city}`}
            title={city}
            width={800}
            height={600}
          />
        </div>
        <div className={`box ${styles.items}`}>
          <Image
            src={gelleryImage?.img2 ?? ''}
            alt={`photo of location ${city}`}
            title={city}
            width={800}
            height={600}
          />
        </div>
        <div className={`box ${styles.items}`}>
          <Image
            src={gelleryImage?.img3 ?? ''}
            alt={`photo of location ${city}`}
            title={city}
            width={800}
            height={490}
          />
        </div>
        <div
          className={`box ${styles.items}`}
          id={styles.video}>
          <Video />
        </div>
      </div>
    </section>
  );
};
