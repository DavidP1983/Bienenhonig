import { Reviews } from "@/shared/types/type";

export const calcRating = (rating: Reviews[]) => {
    let count = 0;
    rating.forEach((item) => {
        count += Number(item.rating) / rating.length;
    })
    const totalStars = Number(count.toFixed(1))
    return { totalStars };
}
