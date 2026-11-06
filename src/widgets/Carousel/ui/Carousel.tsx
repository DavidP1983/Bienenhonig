'use client';
import Autoplay from 'embla-carousel-autoplay';
import ClassNames from 'embla-carousel-class-names';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';
import { DotButton, NextButton, PrevButton } from '.';
import { useDotButton, usePrevNextButtons } from '../model';
import { OPTIONS, SLIDES } from '../model/carousel.constants';

import { ProductImage } from '@/shared/ui/ProductImage/ProductImage';
import styles from './Carousel.module.scss';
import './carousel.css';

export const Carousel = () => {
  const t = useTranslations('Carousel');
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    ClassNames(),
    Autoplay(),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={styles.carousel}>
      <div className="container">
        <h2 className={styles.title}>{t('title')}</h2>
        <div className={styles.gallery}>
          <div className="embla">
            <div
              className="embla__viewport"
              ref={emblaRef}>
              <div className="embla__container">
                {SLIDES.map((item) => (
                  <div
                    className="embla__slide"
                    key={item.publicId}>
                    <ProductImage
                      style="embla__slide__img"
                      image={item}
                      width={800}
                      height={800}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="embla__controls">
              <div className="embla__buttons">
                <PrevButton
                  onClick={onPrevButtonClick}
                  disabled={prevBtnDisabled}
                />
                <NextButton
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                />
              </div>

              <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={'embla__dot'.concat(
                      index === selectedIndex ? ' embla__dot--selected' : ''
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
