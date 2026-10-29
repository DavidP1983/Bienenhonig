import { navigation } from '@/shared/config/navigation';
import * as motion from 'motion/react-client';
import { navVariants } from '../model/animation';
import { MenuItem } from './MenuItem';

import styles from './NavBarMobile.module.scss';

export const Navigation = ({ toggle }: { toggle: () => void }) => {
  return (
    <motion.ul
      className={styles.list}
      variants={navVariants}>
      {navigation.map((item) => (
        <MenuItem
          item={item}
          key={item.id}
          toggle={toggle}
        />
      ))}
    </motion.ul>
  );
};
