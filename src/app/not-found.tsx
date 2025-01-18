'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import Image from 'next/image';
import sadBee from '@/assets/img/error/sadBee.png';

export default function NotFound() {
    const router = useRouter();

    useEffect(() => {
        const redirect = setTimeout(() => {
            router.push("/");
        }, 2000);
        return () => {
            clearTimeout(redirect);
        };
    }, [router]);
    return (
        <div className="notfound">
            <Image
                src={sadBee}
                alt="error"
                width={200}
                height={200}
                priority />
            <h2>Page not found Not Found: 404</h2>
            <p>Could not find requested resource</p>
        </div>
    )
}