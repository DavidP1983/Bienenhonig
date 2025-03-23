'use client';

import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import ClassNames from 'embla-carousel-class-names'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image';

import './style/carousel.css';
import styles from '@/styles/Carousel.module.scss';


import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from '@/components/UI/carousel/CarouselArrow';
import { DotButton, useDotButton } from './CarouselDotButton'

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const Carousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames(), Autoplay()])

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <section className={styles.carousel}>
            <div className='container'>
                <h2 className={styles.title}>Gallery</h2>
                <div className={styles.gallery}>
                    <div className="embla">
                        <div className="embla__viewport" ref={emblaRef}>
                            <div className="embla__container">
                                {slides.map((index) => (
                                    <div className="embla__slide" key={index}>
                                        <Image
                                            className="embla__slide__img"
                                            src={`https://picsum.photos/600/350?v=${index}`}
                                            alt="Your alt text"
                                            width={600}
                                            height={350}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="embla__controls">
                            <div className="embla__buttons">
                                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
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
    )
}

export default Carousel;
