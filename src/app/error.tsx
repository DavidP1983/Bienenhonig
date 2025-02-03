'use client';

import { useRouter } from 'next/navigation'

import dynamic from "next/dynamic";

import styles from '@/styles/Error.module.scss';

const LocationFooter = dynamic(() => import("@/components/UI/footer/LocationFooter").then((mod) => mod.LocationFooter),
    { ssr: false });
const ErrorComponent = dynamic(() => import("@/components/UI/error/ErrorComponent").then((mod) => mod.ErrorComponent),
    { ssr: false });
const Buttons = dynamic(() => import("@/components/UI/button/Buttons").then((mod) => mod.Buttons),
    { ssr: false });

export default function ErrorWrapper() {
    const router = useRouter()

    return (
        <>
            <div className={styles.errormodule}>
                <ErrorComponent />
                <Buttons
                    props={{
                        type: "primary",
                        style: { display: 'block', margin: '10px auto' },
                        onClick: () => {
                            router.refresh();
                        }
                    }}>
                    Try again
                </Buttons >
            </div>
            <LocationFooter />
        </>
    )
}