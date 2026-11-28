import placeholderImage from '@/shared/assets/img/placeholder/placeholder-image.jpg';
import { getImageUrl } from '@/shared/lib/getImageUrl';
import { CloudinaryImage } from '@/shared/types/types';
import Image from 'next/image';

type ProductImageProps = Omit<React.ComponentProps<typeof Image>, 'src'> & {
  image?: CloudinaryImage;
};

export const ProductImage = ({
  image,
  width,
  alt,
  className,
  ...props
}: ProductImageProps) => {
  if (!image) {
    return (
      <Image
        className={className}
        src={placeholderImage}
        alt="Image not available"
        width={width}
        height={props.height}
        {...props}
      />
    );
  }

  return (
    <Image
      className={className}
      src={getImageUrl(image, Number(width))}
      alt={alt ?? image.alt ?? ''}
      width={width}
      {...props}
    />
  );
};
