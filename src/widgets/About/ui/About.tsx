import { ProductImage } from '@/shared/ui/ProductImage/ProductImage';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';
import { aboutContent } from '../config/aboutContent';

import styles from './About.module.scss';

export const About = () => {
  const t = useTranslations('About');

  return (
    <div className={styles.content}>
      <motion.div
        className={styles.item}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}>
        <div className={styles.image}>
          <ProductImage
            image={aboutContent.author.image}
            alt={aboutContent.author.image.alt}
            width={400}
            height={400}
            priority
          />
        </div>
        <div>
          <h2 className={styles.title}>{t('author.title')}</h2>
          <div className={styles.divider}></div>
          <p className={styles.text}>{t('author.text')}</p>
        </div>
      </motion.div>

      <motion.div
        className={styles.item}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}>
        <div className={styles.image}>
          <ProductImage
            image={aboutContent.products.image}
            alt={aboutContent.products.image.alt}
            width={400}
            height={400}
            priority
          />
        </div>
        <div>
          <h2 className={styles.title}>{t('products.title')}</h2>
          <div className={styles.divider}></div>
          <p className={styles.text}>{t('products.text')}</p>
        </div>
      </motion.div>
    </div>
  );
};
