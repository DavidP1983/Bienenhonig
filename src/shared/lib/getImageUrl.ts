import type { CloudinaryImage } from '../types/types';

const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL;

export const getImageUrl = (image: CloudinaryImage, width?: number) => {
  const transformations = ['f_auto', 'q_auto'];

  if (width) {
    transformations.push(`w_${width}`);
  }

  return `${CLOUDINARY_BASE_URL}/${transformations.join(',')}/${image.publicId}.${image.format}`;
};
