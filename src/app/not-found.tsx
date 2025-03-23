'use server';

import Link from 'next/link';
import Image from 'next/image';
import sadBee from '@/assets/img/error/sadBee.png';

export default async function NotFound() {
    return (
        <div className="notfound">
            <Image
                src={sadBee}
                alt="error"
                width={200}
                height={200}
                priority={false} />
            <h2>Page not found: 404</h2>
            <p>Could not find requested resource</p>
            <p>
                <Link href="/" className='btnNotFound'>Back Home</Link>
            </p>
        </div>
    )
}