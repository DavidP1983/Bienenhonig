"use client";
import { Cart } from "@/features/checkout/ui/Cart";
import { navigation } from "@/shared/config/navigation";
import { NavBarItem } from "@/shared/ui/NavBarItem";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import styles from "./Header.module.scss";

export const Navbar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      {navigation.map((item) => (
        <div
          className={pathname === item.path ? styles.active : styles.links}
          key={item.id}
        >
          <NavBarItem
            {...item}
            title={t(item.translationKey)}
            subtitle={t(item.subtitleKey)}
          />
        </div>
      ))}
      <Cart />
    </nav>
  );
};
