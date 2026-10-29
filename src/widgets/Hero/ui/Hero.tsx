"use client";
import { useGSAP } from "@gsap/react";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { textAnimation } from "../lib/textAnimation";

import styles from "./Hero.module.scss";

export const Hero = () => {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const words = t.raw("words") as string[];
  const myRef = useRef<HTMLUListElement>(null);

  const subtitle = locale === "en" && `${t("subtitle")}`;

  useGSAP(() => {
    if (myRef?.current) {
      const elem = myRef?.current.querySelectorAll(`.${styles.words} li`);
      textAnimation(elem);
    }
  });

  return (
    <div className={styles.maintitle}>
      <h1 className={styles.title} id="home-page">
        {t("title")}{" "}
      </h1>
      <h1 className={styles.subtitle} id="home-page">
        {subtitle}
        <ul className={styles.words} ref={myRef}>
          {words.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </h1>
    </div>
  );
};
