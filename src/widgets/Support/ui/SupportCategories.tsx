'use client';
import { supportCategories } from '@/widgets/Support/model/supportCategories';
import { LazyMotion, domAnimation } from 'motion/react';
import * as m from 'motion/react-m';
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
      <LazyMotion features={domAnimation}>
        <m.ul
          className={styles.categories__section}
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          {supportCategories.map(({ id, icon: Icon, faqId }) => (
            <m.li
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
            </m.li>
          ))}
        </m.ul>
      </LazyMotion>
    </div>
  );
};
