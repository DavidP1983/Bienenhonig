'use client';
import type { LocationType } from '@/entities/location/model/type';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import styles from './Location.module.scss';

export const LocationReason = ({ description }: Partial<LocationType>) => {
  const t = useTranslations('LocationReason');

  return (
    <section className={styles.reason}>
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.desc}>{description}</p>
      <Link
        href="/products"
        className={styles.btn}>
        {t('linkTitle')}
      </Link>
    </section>
  );
};
