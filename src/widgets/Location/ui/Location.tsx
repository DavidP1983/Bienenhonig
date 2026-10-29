import type { LocationType } from '@/entities/location/model/type';
import { Accordion } from '@/shared/ui/Accordion';
import { useTranslations } from 'next-intl';
import { getAccordionItems } from '../model/accordionItems';
import { LocationGallery } from './LocationGallery';
import { LocationHero } from './LocationHero';
import { LocationReason } from './LocationReason';

import styles from './Location.module.scss';

export const Location = ({
  title,
  city,
  srcURI,
  info,
  description,
  gelleryImage,
}: LocationType) => {
  const t = useTranslations('LocationAccordion');
  const accordionItems = getAccordionItems(t);

  return (
    <div className={styles.sectionlocation}>
      <div className="container">
        <LocationHero
          city={city}
          info={info}
          srcURI={srcURI}
          title={title}
        />
        <LocationReason description={description} />
        <LocationGallery
          gelleryImage={gelleryImage}
          city={city}
        />
        <section className={styles.accordion}>
          <h2 className={styles.title}>{t('title')}</h2>
          <div>
            <Accordion items={accordionItems} />
          </div>
        </section>
      </div>
    </div>
  );
};
