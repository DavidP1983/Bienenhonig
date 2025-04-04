'use client';

import { Pagination } from '@mantine/core';
import { useProducts } from '@/store';

import styles from '@/styles/Pagination.module.scss';



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
                    return { component: 'a', href: `#page-${page}`, "aria-label": `page previous` };
                }

                if (control === 'last') {
                    return { component: 'a', href: `#page-${page}`, "aria-label": `page next` };
                }

                if (control === 'next') {
                    return { component: 'a', href: `#page-${page}`, "aria-label": `page next count` };
                }

                if (control === 'previous') {
                    return { component: 'a', href: `#page-${page}`, "aria-label": `page previous count` };
                }

                return {};
            }}
        />
    );
}