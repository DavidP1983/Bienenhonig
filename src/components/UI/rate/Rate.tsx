import { Rate } from 'antd';
import { Reviews } from '@/shared/types/type';
import { calcRating } from '@/utils/calcRating';

interface ReviewsProps {
    rating: Reviews[];
}

export const RateProducts = ({ rating }: ReviewsProps) => {

    if (rating.length === 0) {
        return (
            <Rate allowHalf count={5} value={0} disabled style={
                {
                    display: 'inline-flex !important',
                    flexWrap: "wrap",
                    maxWidth: "150px",
                    maxHeight: "20px",
                    overflow: "hidden"
                }} />
        )
    }


    const { totalStars } = calcRating(rating);

    return (
        <Rate allowHalf count={5} value={totalStars} disabled style={
            {
                display: 'inline-flex !important',
                flexWrap: "wrap",
                maxWidth: "150px",
                maxHeight: "20px",
                overflow: "hidden"
            }} />
    )
}