import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getApiProducts } from '@/services/fetchData';
import { Products, ICartOrder } from '@/shared/types/type';

type Status = 'idle' | "loading" | 'error';



interface IData {
    data: Products[];
    status: Status;
    errorMessage: Error;
    limit: number;
    page: number;
    changePageNumber: (page: number) => void;
    getProducts: () => void;
}

export const useProducts = create<IData>()(persist(devtools((set) => ({
    data: [],
    status: 'idle',
    errorMessage: '',
    limit: 6,
    page: 1,
    getProducts: async () => {
        set({ status: 'loading' });
        try {
            const response = await getApiProducts();
            set({ data: response, status: 'idle' });

        } catch (e) {
            if (e instanceof Error) {
                set({ status: 'error', errorMessage: e })
                throw e;
            }
        }
    },
    changePageNumber: (value) => set({
        page: value
    }),
})), { name: 'useProducts', version: 1 }));

//Filters store
export interface CombineFilter {
    select: string;
    search: string;
    checkbox: string;
}

interface IFilter {
    filter: CombineFilter;
    handleSelect: (key: string, value: string) => void;
}

export const useFilter = create<IFilter>()(devtools((set) => ({
    filter: { select: '', search: '', checkbox: '' },
    handleSelect: (key, value) => set((state) => ({
        filter: { ...state.filter, [key]: value }
    }))
}), { name: 'useFilter', version: 1 }));



//Single item store reviews

interface IReviews {
    dataSingleItem: Products;
    getReviews: (data: Products) => void;
}


export const useReviews = create<IReviews>()(devtools((set) => ({
    dataSingleItem: {},
    getReviews: (data) => set({ dataSingleItem: data })
}), { name: 'useReviews', version: 1 }));


//Single item store cart
interface ICart {
    cartOrder: ICartOrder[];
    status: boolean;
    getCartOrder: (data: ICartOrder) => Promise<unknown>;
    removeOrder: (id: string) => void
}

let timer: NodeJS.Timeout | null = null;

export const useCartOrder = create<ICart>()(devtools((set, get) => ({
    cartOrder: [],
    status: false,
    getCartOrder: (data) => {

        set({ status: true });

        if (timer) {
            clearTimeout(timer)
        }
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line prefer-const
            timer = setTimeout(() => {
                try {

                    const isEmptyFields = Object.values(data).every((item) => item !== '');
                    if (!isEmptyFields) throw new Error('Oops, Something went wrong, try again')

                    set({ cartOrder: [...get().cartOrder, data], status: false })
                    resolve('Order added successfully');

                } catch (e) {
                    if (e instanceof Error) {
                        set({ status: false });
                        reject(e)
                    }
                } finally {
                    timer = null;
                }
            }, 3000);
        });
    },

    removeOrder: (id: string) => {
        set({ cartOrder: get().cartOrder.filter((item) => item.id !== id) })
    }
}), { name: 'useCartOrder', version: 1 }));




// MobileFilter modal window

interface IMobileFilter {
    status: boolean;
    changeStatus: () => void;
}

export const useMobileFilter = create<IMobileFilter>()(devtools((set) => ({
    status: false,
    changeStatus: () => {
        set(state => ({
            status: !state.status
        }))
    }


}), { name: 'useMobileFilter', version: 1 }));