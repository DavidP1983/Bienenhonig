import type { NavigationType } from '@/shared/config/types';
import { NavBarItem } from '@/shared/ui/NavBarItem';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';
import { itemVariants } from '../model/animation';

import styles from './NavBarMobile.module.scss';

export const MenuItem = ({
  item,
  toggle,
  isActive,
}: {
  item: NavigationType;
  toggle: () => void;
  isActive: boolean;
}) => {
  const t = useTranslations('Navbar');

  return (
    <motion.li
      onClick={toggle}
      className={`${styles.listItem} ${isActive ? styles.active : ''}`}
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}>
      <svg
        className={`${styles.listItemBorder} ${isActive ? styles.active : ''}`}
        viewBox="0 0 600 80"
        preserveAspectRatio="none"
        aria-hidden="true">
        <path
          d="M 30 1 L 570 1 L 599 40 L 570 79 L 30 79 L 1 40 Z"
          fill="none"
          stroke="rgba(220, 177, 103, 0.7)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <NavBarItem
        {...item}
        title={t(item.translationKey)}
        isActive={isActive}
      />
    </motion.li>
  );
};
