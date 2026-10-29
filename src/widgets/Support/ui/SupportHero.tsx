import { useTranslations } from 'next-intl';
import { BiSupport } from 'react-icons/bi';

import styles from './SupportHero.module.scss';

export const SupportHero = () => {
  const t = useTranslations('SupportHero');

  return (
    <div className={styles.hero}>
      <div className={styles.hero__care}>
        <BiSupport />
        <div className={styles.hero__custom}> {t('customCare')}</div>
      </div>
      <h1
        id="support-page"
        className={`title ${styles.hero__title}`}>
        {t('title')}
      </h1>
      <p className={styles.hero__desc}>{t('description')}</p>
    </div>
  );
};
