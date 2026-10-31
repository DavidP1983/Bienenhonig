'use client';
import type { CloudinaryImage } from '@/shared/types/types';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Video } from './Video';

import { ProductImage } from '@/shared/ui/ProductImage/ProductImage';
import styles from './Location.module.scss';

type LocationGalleryProps = {
  galleryImage: CloudinaryImage[];
};

export const LocationGallery = ({ galleryImage }: LocationGalleryProps) => {
  const t = useTranslations('LocationGallery');

  const updatedGallery = galleryImage.slice(1);

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
        {updatedGallery.map((item) => (
          <div
            className={`box ${styles.items}`}
            key={item.publicId}>
            <ProductImage
              image={item}
              width={800}
              height={600}
            />
          </div>
        ))}
        <div
          className={`box ${styles.items}`}
          id={styles.video}>
          <Video />
        </div>
      </div>
    </section>
  );
};
