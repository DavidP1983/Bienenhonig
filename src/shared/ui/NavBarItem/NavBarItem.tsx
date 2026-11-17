import { Link } from '@/i18n/navigation';
import type { CloudinaryImage } from '@/shared/types/types';

type NavigationProps = {
  title: string;
  path: string;
  url: CloudinaryImage;
  isActive: boolean;
};

export const NavBarItem = ({ title, ...props }: NavigationProps) => {
  const { path, isActive } = props;
  return (
    <Link
      href={path}
      aria-current={isActive ? 'page' : undefined}>
      {title}
    </Link>
  );
};
