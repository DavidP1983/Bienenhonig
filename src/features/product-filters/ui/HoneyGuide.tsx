import {
  HoneyFlavorPreference,
  HoneyGuideAttributes,
  HoneyRecommendedUse,
} from '@/entities/product/model/types';
import { Button, Checkbox, List, Radio } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './HoneyGuide.module.scss';

const recommendedUseOptions: HoneyRecommendedUse[] = [
  'everyday',
  'tea',
  'baking',
  'breakfast',
  'gift',
];

const flavorOptions: Exclude<HoneyFlavorPreference, null>[] = [
  'mild',
  'rich',
  'floral',
];

interface HoneyGuideProps {
  onFind: (attributes: HoneyGuideAttributes) => void;
}

const initialAttributes: HoneyGuideAttributes = {
  flavorPreference: null,
  recommendedUses: [],
};

export const HoneyGuide = ({ onFind }: HoneyGuideProps) => {
  const t = useTranslations('HoneyGuide');

  const [attributes, setAttributes] =
    useState<HoneyGuideAttributes>(initialAttributes);

  const updateRecommendedUses = (values: HoneyRecommendedUse[]) => {
    setAttributes((prev) => ({
      ...prev,
      recommendedUses: values,
    }));
  };

  const updateFlavorPreference = (value: HoneyFlavorPreference) => {
    setAttributes((prev) => ({
      ...prev,
      flavorPreference: value,
    }));
  };

  const handleFind = () => {
    onFind(attributes);
  };

  return (
    <div
      className={styles.guide}
      id="honey-guide-modal">
      <div className={styles.guide__intro}>
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
      </div>

      <section className={styles.guide__section}>
        <h3>{t('useTitle')}</h3>

        <Checkbox.Group
          value={attributes.recommendedUses}
          onChange={updateRecommendedUses}>
          <List
            dataSource={recommendedUseOptions}
            renderItem={(value) => (
              <List.Item>
                <Checkbox value={value}>
                  {' '}
                  {t(`recommendedUses.${value}`)}
                </Checkbox>
              </List.Item>
            )}
          />
        </Checkbox.Group>
      </section>

      <section className={styles.guide__section}>
        <h3>{t('tasteTitle')}</h3>

        <Radio.Group
          value={attributes.flavorPreference}
          onChange={(event) => updateFlavorPreference(event.target.value)}>
          <List
            dataSource={flavorOptions}
            renderItem={(value) => (
              <List.Item>
                <Radio value={value}>{t(`flavors.${value}`)}</Radio>
              </List.Item>
            )}
          />
        </Radio.Group>

        <Radio
          checked={attributes.flavorPreference === null}
          onChange={() => updateFlavorPreference(null)}>
          {t('noPreference')}
        </Radio>
      </section>

      <Button
        type="primary"
        block
        disabled={attributes.recommendedUses.length === 0}
        onClick={handleFind}>
        {t('findButton')}
      </Button>
    </div>
  );
};
