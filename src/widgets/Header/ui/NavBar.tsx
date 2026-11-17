'use client';
import { navigation } from '@/shared/config/navigation';
import { NavBarItem } from '@/shared/ui';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import styles from './Header.module.scss';

export const Navbar = () => {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav
      className={styles.navbar}
      aria-label="Desktop Navigation">
      <svg
        className={styles.navBorder}
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
      <ul className={styles.navList}>
        {navigation.map((item) => {
          const localizedPath = `/${locale}${item.path}`;
          const normalizedPath =
            localizedPath.replace(/\/$/, '') || `/${locale}`;
          const isActive = pathname === normalizedPath;
          return (
            <li
              className={isActive ? styles.active : styles.links}
              key={item.id}>
              <NavBarItem
                {...item}
                title={t(item.translationKey)}
                isActive={isActive}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
