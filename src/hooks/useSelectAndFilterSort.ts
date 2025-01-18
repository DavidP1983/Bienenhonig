import { Products } from "@/shared/types/type";
import { useMemo } from "react";
import { CombineFilter } from "@/store";

const sortByTitle = (data: Products[]) => {
    return [...data].sort((a, b) => a.sort.localeCompare(b.sort));
}

const sortByPrice = (data: Products[], key: string) => {
    const sortedPrice = [...data].sort((a, b) => {
        if (key === 'L-H') {
            return Number(a.price[0]) - Number(b.price[0]);
        } else {
            return Number(b.price[0]) - Number(a.price[0]);
        }
    });

    return sortedPrice;
}

export const useSelectSort = (data: Products[], select: string) => {
    const sortedSelect = useMemo(() => {
        const price = select.split(',');
        if (select === 'sort') {
            return sortByTitle(data)
        } else if (price[0] === 'price') {
            return sortByPrice(data, price[1])
        } else {
            return data;
        }
    }, [data, select]);

    return sortedSelect;
}

export const useCheckBoxSort = (data: Products[], selectFilter: CombineFilter) => {
    const sortedData = useSelectSort(data, selectFilter.select);
    const sortCheckBox = useMemo(() => {
        if (selectFilter.checkbox) {
            return sortedData.filter((item) => item.category === selectFilter.checkbox.toLocaleLowerCase());
        } else {
            return sortedData
        }
    }, [sortedData, selectFilter.checkbox]);

    return sortCheckBox
}


export const useSelectAndFilterSort = (data: Products[], limit: number, selectFilter: CombineFilter) => {
    const sortedData = useCheckBoxSort(data, selectFilter);

    const filteredData = useMemo(() => {
        return sortedData.filter((item) => item.sort.toLocaleLowerCase().includes(selectFilter.search))
    }, [selectFilter.search, sortedData]);

    const itemsPerPage = limit;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedArray = [];

    for (let i = 0; i < totalPages; i++) {
        const start = i * itemsPerPage;
        const end = start + itemsPerPage;
        paginatedArray.push(filteredData.slice(start, end))

    }

    return {
        paginatedArray,
        totalPages,
    }
}

