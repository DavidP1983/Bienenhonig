'use client';

import { LocationFooter } from "@/components/UI/footer/LocationFooter";
import { ErrorComponent } from "@/components/UI/error/ErrorComponent";
import { Buttons } from "@/components/UI/button/Buttons";
import { useRouter } from 'next/navigation'

import styles from '@/styles/Error.module.scss'

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