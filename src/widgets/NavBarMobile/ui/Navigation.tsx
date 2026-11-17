import logo from '@/shared/assets/img/logo/logo.png';
import { navigation } from '@/shared/config/navigation';
import * as motion from 'motion/react-client';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navVariants } from '../model/animation';
import { MenuItem } from './MenuItem';

import styles from './NavBarMobile.module.scss';

export const Navigation = ({ toggle }: { toggle: () => void }) => {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <>
      <motion.ul
        className={styles.list}
        variants={navVariants}>
        {navigation.map((item) => {
          const localizedPath = `/${locale}${item.path}`;
          const normalizedPath =
            localizedPath.replace(/\/$/, '') || `/${locale}`;

          const isActive = pathname === normalizedPath;

          return (
            <MenuItem
              item={item}
              key={item.id}
              toggle={toggle}
              isActive={isActive}
            />
          );
        })}
      </motion.ul>
      <Link
        href="/"
        aria-label="Bienenhonig — home"
        className={styles.brand}>
        <Image
          className={styles.logo}
          width={120}
          height={120}
          src={logo}
          alt="Bienenhonig"
        />
        <span className={styles.brandName}>Bienenhonig</span>
      </Link>
    </>
  );
};
