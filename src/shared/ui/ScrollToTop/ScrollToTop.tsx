"use client";
import { arrowup } from "@/shared/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { throttle } from "throttle-debounce";

import styles from "./ScrollToTop.module.scss";

export const ScrollToTop = () => {
  const [scroll, setScrollTop] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const throttledScroll = throttle(1000, () => {
      setScrollTop(window.scrollY > 800);
    });
    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* При первом заходе подымаем странницу вверх*/
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <Link
      href="#body"
      className={`${styles.arrow} ${scroll ? styles.show : ""}`}
      onClick={handleClick}
    >
      <Image src={arrowup} alt="arrow up" width={50} height={50} />
    </Link>
  );
};
