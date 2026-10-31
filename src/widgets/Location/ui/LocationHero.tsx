import { IoLocation } from '@/shared/assets/icons';
import type { CloudinaryImage } from '@/shared/types/types';
import { ProductImage } from '@/shared/ui/ProductImage/ProductImage';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';
import { fadeIn, fadeUp } from '../animation/location.animations';

import styles from './Location.module.scss';

type LocationHeroProps = {
  city: string;
  info: string;
  title: string;
  galleryImage: CloudinaryImage[];
};

export const LocationHero = ({
  title,
  city,
  galleryImage,
  info,
}: LocationHeroProps) => {
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
          <ProductImage
            style={styles.clover}
            image={galleryImage[0]}
            width={250}
            height={150}
            priority
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
