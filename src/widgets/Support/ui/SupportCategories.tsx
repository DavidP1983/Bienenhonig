'use client';
import { supportCategories } from '@/widgets/Support/model/supportCategories';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
  containerVariants,
  itemVariants,
} from '../animation/support.animation';
import type { TCategory } from '../model/types';

import styles from './SupportCategories.module.scss';

type SupportCategoriesProps = {
  activeCategory: string;
  onCategoryChange: (id: TCategory) => void;
};

export const SupportCategories = ({
  activeCategory,
  onCategoryChange,
}: SupportCategoriesProps) => {
  const t = useTranslations('SupportCategories');

  return (
    <div className={styles.categories}>
      <h2 className={styles.categories__title}> {t('title')}</h2>
      <motion.ul
        className={styles.categories__section}
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        {supportCategories.map(({ id, icon: Icon, faqId }) => (
          <motion.li
            key={id}
            variants={itemVariants}
            className={activeCategory === faqId ? styles.active : ''}>
            <button
              type="button"
              onClick={() => onCategoryChange(id)}>
              <Icon />
              <h3>{t(`categories.${id}.title`)}</h3>
              <p>{t(`categories.${id}.description`)}</p>
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};
