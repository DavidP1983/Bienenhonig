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
  info,
  description,
  galleryImage,
}: LocationType) => {
  const t = useTranslations('LocationAccordion');
  const accordionItems = getAccordionItems(t);

  return (
    <div className={styles.sectionlocation}>
      <div className="container">
        <LocationHero
          city={city}
          info={info}
          galleryImage={galleryImage}
          title={title}
        />
        <LocationReason description={description} />
        <LocationGallery galleryImage={galleryImage} />
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
