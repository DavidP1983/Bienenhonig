import { Link } from "@/i18n/navigation";
import Image from "next/image";

type NavigationProps = {
  title: string;
  subtitle: string;
  path: string;
  url: string;
};

export const NavBarItem = ({ title, path, url }: NavigationProps) => {
  return (
    <>
      <Link href={path}>
        {title}
        <Image
          src={url}
          alt={`${title} Page`}
          priority={true}
          width={384}
          height={384}
        />
      </Link>
    </>
  );
};
