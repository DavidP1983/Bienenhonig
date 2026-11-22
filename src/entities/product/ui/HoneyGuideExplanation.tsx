'use client';
import { Button } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './ProductCard.module.scss';

interface Props {
  productTitle: string;
  explanationText: string;
}

export const HoneyGuideExplanation = ({
  productTitle,
  explanationText,
}: Props) => {
  const t = useTranslations('ProductCard');

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.honeyGuid}>
      <Button
        type="default"
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.honeyGuideButton}
        aria-expanded={isOpen}
        aria-controls="honey-guide-explanation">
        {isOpen ? t('hideExplanation') : t('showExplanation')}
      </Button>
      <div
        id="honey-guide-explanation"
        hidden={!isOpen}
        className={`${styles.honeyGuideExplanation} ${
          isOpen ? styles.open : ''
        }`}>
        <strong>{productTitle}</strong>
        <p>{explanationText}</p>
      </div>
    </div>
  );
};
