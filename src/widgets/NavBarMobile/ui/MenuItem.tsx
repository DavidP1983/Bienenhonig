import { NavigationType } from "@/shared/config/types";
import { NavBarItem } from "@/shared/ui/NavBarItem";
import * as motion from "motion/react-client";
import { useTranslations } from "next-intl";
import { itemVariants } from "../model/animation";

import styles from "./NavBarMobile.module.scss";

export const MenuItem = ({
  item,
  toggle,
}: {
  item: NavigationType;
  toggle: () => void;
}) => {
  const t = useTranslations("Navbar");

  return (
    <motion.li
      onClick={toggle}
      className={styles.listItem}
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <NavBarItem
        {...item}
        title={t(item.translationKey)}
        subtitle={t(item.subtitleKey)}
      />
    </motion.li>
  );
};
