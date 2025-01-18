import Image from 'next/image';
import sadBee from '@/assets/img/error/sadBee.png';
import { Buttons } from '../button/Buttons';

import styles from "@/styles/Error.module.scss";
import { useProducts } from '@/store';


export const ErrorComponent = ({ error }: { error?: Error }) => {

    const getProducts = useProducts(state => state.getProducts);

    const handleReset = () => {
        getProducts();
    }

    return (
        <div className={styles.errorcontent}>
            <div className={styles.errortitle}>Oops, there is an Error!</div>
            <Image
                src={sadBee}
                alt="error"
                width={200}
                height={200}
                priority />
            <div className={styles.errormessage}>
                {error?.message ?? 'Something went wrong'} <br />Sorry for inconvenience <br />
            </div>
            {error?.message
                ?
                <Buttons
                    props={{
                        type: "primary",
                        style: { display: 'block', margin: '10px auto' },
                        onClick: handleReset
                    }}>
                    Try again
                </Buttons>
                :
                null
            }
        </div>
    );
}