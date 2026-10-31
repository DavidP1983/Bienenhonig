import { Link } from '@/i18n/navigation';
import type { CloudinaryImage } from '@/shared/types/types';
import { ProductImage } from '../ProductImage/ProductImage';

type NavigationProps = {
  title: string;
  subtitle: string;
  path: string;
  url: CloudinaryImage;
};

export const NavBarItem = ({ title, ...props }: NavigationProps) => {
  const { path, url } = props;
  return (
    <>
      <Link href={path}>
        {title}
        <ProductImage
          image={url}
          alt={`${title} Page`}
          width={384}
          height={384}
          priority
        />
      </Link>
    </>
  );
};
