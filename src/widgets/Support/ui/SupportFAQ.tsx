import { Accordion } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { getSupportFAQ } from "../model/supportFAQ";

import styles from "./SupportFAQ.module.scss";

type SupportFAQProps = {
  activeCategory: string;
};

export const SupportFAQ = ({ activeCategory }: SupportFAQProps) => {
  const t = useTranslations("SupportFAQ");
  const supportFAQ = getSupportFAQ(t);
  return (
    <div className={styles.fqa}>
      <h3 className={styles.fqa__title}>FAQ</h3>
      <Accordion items={supportFAQ[activeCategory]} />
    </div>
  );
};
