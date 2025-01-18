'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifierImg } from '../UI/magnifier/Magnifier';
import { SingleItemArticle } from './SingleItemArticle';
import { SingleItemReviews } from './SingleItemReviews';
import { Breadcrumbs } from '../UI/breadcrumb/Breadcrumbs';
import { facebook, instagram, whatsup } from '@/assets/icons/index';
import { Products } from '@/shared/types/type';
import { useReviews } from '@/store';

import { useEffect, useRef, useState } from 'react';

import '../singleItem/styles/singleItem.scss';

interface IData {
    data: Products
}

export const SingleItem = ({ data }: IData) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showReadMoreButton, setShowReadMoreButton] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);
    const getReviews = useReviews(state => state.getReviews)

    useEffect(() => {
        getReviews(data)
        if (contentRef.current) {
            const { scrollHeight, clientHeight } = contentRef.current;
            setShowReadMoreButton(scrollHeight !== clientHeight)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToogle = () => {
        const element = contentRef.current;
        if (element) {
            const { scrollHeight } = element;
            if (!isOpen) {
                element.style.height = `${scrollHeight}px`;
                element.classList.toggle('open');
            } else {
                element.style.height = `${50}px`;
                element.classList.toggle('open');
            }
        }
        setIsOpen(!isOpen);
    }

    return (
        <section className='singleItem' >
            <Breadcrumbs />
            <div className='singleItem__container'>
                <div className='singleItem__about'>
                    <div className='singleItem__image'>

                        <MagnifierImg imageSrc={data.image} />
                        {data.link ?
                            <Link href={{
                                pathname: `/location/${data.link}`,
                                search: `?products=${data._id}`,


                            }}
                                title={`location address ${data.link}`}>The place where we collect our honey</Link>
                            :
                            <div><span style={{ marginRight: "10px" }}><i className='fa fa-search-plus'></i></span>Roll over image to zoom in</div>
                        }

                    </div>
                    <div className='singleItem__description'>
                        <h2 className='singleItem__title'>Description</h2>
                        <p className='singleItem__owner'>{data.description.who}</p>
                        <p className='singleItem__descr'><strong>Colour: </strong>{data.description.colour}<br />
                            <strong>Where does the honey come from? </strong>{data.description.where}</p>

                        <p className="singleItem__crystallisation" ref={contentRef}><strong>Crystallisation: </strong>Please know that raw honey does crystallise and is a natural process of raw honey (therefore we cannot except returns on honey that may have crystallised). We indicate on the website the state of each honey - either runny or crystallised but be aware this is to the best of our knowledge and the state can change quickly.   If you want your honey runny and it has crystallised it is very easy to return it to runny go to this link Runny Honey  or see this section under our Why Is My Honey Crystallised?</p>

                        {showReadMoreButton && (
                            <button className="singleItem__readmore" onClick={handleToogle}>{isOpen ? "read less..." : "read more..."}</button>
                        )}
                        <em>*Product photo is representative of this product. Honey colour and texture may vary depending on the season and level of crystalisation. Please check the product title and description for accurate contents. Accurate Best before and Batch date will be printed on each jar as indicated in photo. Those shown are for visual purposes only.*</em>
                    </div>
                    <SingleItemReviews reviews={data.reviews} />
                </div>

                <SingleItemArticle {...data} />

                <div className='singleItem__contacts'>
                    <div className='singleItem__contacts_fixe'>
                        <h2 className='singleItem__contacts-title'>Any Questions ? <br />Contact us</h2>

                        <ul className='singleItem__media'>
                            <li className='singleItem__media-phone'>
                                <a className='phone' href="tel:44999228974" inputMode='tel'>+4 (499) 922-89-74</a>
                            </li>
                            <li className='singleItem__media-social'>
                                <a href="#" className="social">
                                    <Image
                                        src={facebook} alt="facebook" />
                                </a>
                                <a href="#" className="social">
                                    <Image
                                        src={instagram} alt="instagram" />
                                </a>
                                <a href="#" className="social" id='whatsup'>
                                    <Image
                                        className='whatsup'
                                        src={whatsup} alt="whatsup" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

    );
}