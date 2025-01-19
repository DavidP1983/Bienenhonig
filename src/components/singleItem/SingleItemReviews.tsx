import { RateProducts } from '../UI/rate/Rate';
import { ModalReview } from '../UI/modal/ModalReview';
import { Reviews } from '@/shared/types/type';
import { Rate } from 'antd';
import { calcRating } from '@/utils/calcRating';
import { useEffect, useRef } from 'react';


import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(tz);

import '../singleItem/styles/singleItem.scss';

interface IReviews {
    reviews: Reviews[];
}

export const SingleItemReviews = ({ reviews }: IReviews) => {

    const reviewsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const timer = setTimeout(() => {
            const item = reviewsRef;
            if (!item.current) {
                return;
            }
            if (window.location.hash === '#reviews' && reviewsRef.current) {
                window.scrollTo({
                    top: item.current.offsetTop
                })
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        }

    }, []);


    const renderReviews = (arr: Reviews[]) => {
        if (arr.length === 0) {
            return (
                <h2>Be the first to leave a comment</h2>
            );
        }

        const commentItem = arr.map((item) => {
            const { id, date, city, title, comment } = item;
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const convertData = dayjs.utc(date).tz(timeZone).format('YYYY-MM-DD');

            return (
                <li className='comment' key={id}>
                    <div className='name'>{item.name} <time className="data" dateTime={convertData}>{convertData}</time></div>
                    <div className='city'>{city}</div>
                    <div>
                        <Rate allowHalf count={5} value={Number(item.rating)} disabled style={
                            {
                                display: 'inline-flex !important',
                                flexWrap: "wrap",
                                maxWidth: "150px",
                                maxHeight: "20px",
                                overflow: "hidden"
                            }} />
                        <div className='title'>{title}</div>
                    </div>
                    <div className='desc'>{comment}</div>
                    <div className='item'>Raw Certified Organic Wild</div>
                </li>
            )

        })
        return (
            <ul>
                {commentItem}
            </ul>
        )
    }

    const comments = renderReviews(reviews);
    const { totalStars } = calcRating(reviews);

    return (
        <div className='singleItem__reviews' ref={reviewsRef}>
            <h2 className='singleItem__reviews_title'>Reviews</h2>
            <div className='singleItem__total'>
                <div className='singleItem__rate'>
                    <div className='singleItem__rateNum'>{reviews.length ? totalStars : 'not rated yet'}</div>
                    <RateProducts rating={reviews} />
                </div>
                <div className='singleItem__qnt'>Total Reviews ({reviews.length})</div>
            </div>
            <hr />
            <div className='singleItem__comments'>
                {comments}
                <ModalReview />
            </div>
        </div>
    );
}