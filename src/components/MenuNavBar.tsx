import { NavigationType } from "@/shared/types/type";
import Link from "next/link";
import Image from 'next/image';


export const MenuNavBar = ({ title, path, img }: NavigationType) => {

    return (
        <>
            <Link href={path}>{title}</Link>
            <Image
                src={img}
                alt={`${title} Page`}
                priority={true}
                width={384}
                height={384} />
        </>
    );
}