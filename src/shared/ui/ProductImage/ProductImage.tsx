import placeholderImage from '@/shared/assets/img/placeholder/placeholder-image.jpg';
import { getImageUrl } from '@/shared/lib/getImageUrl';
import { CloudinaryImage } from '@/shared/types/types';
import Image from 'next/image';

type ProductImageProps = {
  image?: CloudinaryImage;
  alt?: string;
  width: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  style?: string;
};

export const ProductImage = ({
  image,
  width,
  alt,
  style,
  ...props
}: ProductImageProps) => {
  if (!image) {
    return (
      <Image
        className={style}
        src={placeholderImage}
        alt="Image not available"
        width={width}
        height={props.height}
        priority={props.priority}
      />
    );
  }

  return (
    <Image
      className={style}
      src={getImageUrl(image, width)}
      alt={alt ?? image.alt ?? ''}
      width={width}
      {...props}
    />
  );
};
