'use client';
import { TbZoomScan } from '@/shared/assets/icons';
import { getImageUrl } from '@/shared/lib/getImageUrl';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { SellerContacts } from '.';
import type { Product } from '../model/types';
import { ProductImageMagnifier } from './ProductImageMagnifier';

import styles from './ProductDetailsContent.module.scss';

type ProductDetailsProps = {
  data: Product;
};

export const ProductDetailsContent = ({ data }: ProductDetailsProps) => {
  const t = useTranslations('ProductDetailsContent');

  const images = data.images?.length
    ? getImageUrl(data.images?.[0])
    : '/placeholder-image.jpg';

  const [isOpen, setIsOpen] = useState(false);
  const [readMoreButton, setReadMoreButton] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current;
      setReadMoreButton(scrollHeight !== clientHeight);
    }
  }, []);

  const toggleText = () => {
    const element = contentRef.current;
    if (element) {
      const { scrollHeight } = element;
      if (!isOpen) {
        element.style.height = `${scrollHeight}px`;
        element.classList.toggle('open');
      } else {
        element.style.height = `${52}px`;
        element.classList.toggle('open');
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.detailsContent}>
      <div className={styles.detailsContent__gallery}>
        <ProductImageMagnifier imageSrc={images} />
        <span>
          <TbZoomScan />
          {t('zoom')}
        </span>
      </div>

      <div className={styles.detailsContent__description}>
        <h2 className={styles.title}>{t('title')}</h2>

        <dl className={styles.attributes}>
          <div className={styles.producer}>
            <dt>{t('producer')}</dt>
            <dd>{data.description.producer}</dd>
          </div>

          <div className={styles.color}>
            <dt>{t('color')}</dt>
            <dd>{data.description.color}</dd>
          </div>

          <div className={styles.origin}>
            <dt>{t('origin')}</dt>
            <dd>{data.description.origin}</dd>
          </div>

          <div
            ref={contentRef}
            className={`${styles.originDescription} ${isOpen ? styles.open : ''}`}>
            <p>{data.description.text}</p>
          </div>

          {readMoreButton && (
            <button
              type="button"
              className={styles.readMore}
              onClick={toggleText}>
              {isOpen ? `${t('readLess')}` : `${t('readMore')}`}
            </button>
          )}
        </dl>
        <p className={styles.photoDisclaimer}>{t('disclaimer')}</p>
      </div>
      <SellerContacts contacts={data.contacts} />
    </div>
  );
};
