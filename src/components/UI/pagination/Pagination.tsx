'use client';

import { Pagination } from '@mantine/core';
import styles from '@/styles/Pagination.module.scss';
import { useProducts } from '@/store';



export const Paginations = ({ pages }: { pages: number }) => {
    const { changePageNumber, page } = useProducts();


    const handleChangeNumber = (page: number) => {
        changePageNumber(page);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <Pagination
            total={pages}
            value={page}
            className={styles.pagination}
            onChange={handleChangeNumber}
            withEdges
            aria-label='pagination buttons'
            getItemProps={(page) => ({
                component: 'a',
                href: `#page-${page}`,
            })}
            getControlProps={(control) => {
                if (control === 'first') {
                    return { component: 'a', href: `#page-${page}` };
                }

                if (control === 'last') {
                    return { component: 'a', href: `#page-${page}` };
                }

                if (control === 'next') {
                    return { component: 'a', href: `#page-${page}` };
                }

                if (control === 'previous') {
                    return { component: 'a', href: `#page-${page}` };
                }

                return {};
            }}
        />
    );
}