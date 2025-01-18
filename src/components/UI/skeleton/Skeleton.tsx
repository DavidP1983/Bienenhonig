import { Skeleton } from '@mantine/core';
import styles from '@/styles/Skeleton.module.scss';

export default function SkeletonUI() {
    return (
        <div className={styles.skeleton}>
            <ul className={styles.content}>
                {[...Array(4)].map((movie, index) => (
                    <li key={index} className='relative animate-pulse'>
                        <Skeleton height={50} width={50} circle ml={10} mt={10} />
                        <Skeleton height={8} mt={90} ml={10} width="90%" radius="xl" />
                        <Skeleton height={8} mt={6} ml={10} width="87%" radius="xl" />
                        <Skeleton height={8} mt={6} ml={10} width="80%" radius="xl" />
                    </li>
                ))}
            </ul>

        </div>
    )
}