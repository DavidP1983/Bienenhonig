"use client";
import { Cart } from "@/features/checkout/ui/Cart";
import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";
import { useDimensions } from "../hooks/useDimensions";
import { sidebarVariants } from "../model/animation";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

import styles from "./NavBarMobile.module.scss";

export function NavBarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div>
      <div className={`${styles.container} ${isOpen ? styles.open : ""}`}>
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
          className={styles.nav}
          onAnimationStart={() => {
            if (isOpen) {
              containerRef.current?.style.setProperty("pointer-events", "auto");
            }
          }}
          onAnimationComplete={() => {
            if (!isOpen) {
              containerRef.current?.style.setProperty("pointer-events", "none");
            }
          }}
        >
          <motion.div
            className={styles.background}
            variants={sidebarVariants}
          />
          <Navigation toggle={() => setIsOpen(!isOpen)} />
          <MenuToggle toggle={() => setIsOpen(!isOpen)} />
        </motion.nav>
        <Cart />
      </div>
    </div>
  );
}
