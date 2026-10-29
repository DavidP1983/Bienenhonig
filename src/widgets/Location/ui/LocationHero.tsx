import type { LocationType } from '@/entities/location/model/type';
import { IoLocation } from '@/shared/assets/icons';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { fadeIn, fadeUp } from '../animation/location.animations';

import styles from './Location.module.scss';

export const LocationHero = ({
  title,
  city,
  srcURI,
  info,
}: Partial<LocationType>) => {
  const t = useTranslations('LocationHero');

  return (
    <section
      className={styles.location}
      aria-labelledby={`location-${city}`}>
      <motion.div
        className={styles.title}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}>
        <div></div>
        <h1 id={`location-${city}`}>
          {t('titlePrefix')} <span>{title}</span> {t('titleSuffix')}
        </h1>
        <div></div>
      </motion.div>

      <motion.div
        className={styles.addr}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.15 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: 'easeOut' }}>
          <IoLocation className={styles.icon} />
        </motion.div>

        <address>
          <strong>
            {city}, {t('country')}
          </strong>
        </address>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <Image
            src={srcURI ?? ''}
            alt={title ?? 'unknown'}
            title={title}
            width={250}
            height={150}
            className={styles.clover}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.desc}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2 }}>
        <q>{info}</q>
      </motion.div>
    </section>
  );
};
