export interface Review {
  _id: string;
  productId: string;
  name: string;
  city: string;
  title: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewSummery {
  _id: string;
  averageRating: number;
  reviewCount: number;
}
