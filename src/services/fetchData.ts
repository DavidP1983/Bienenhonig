import { Products } from "@/shared/types/type";

const _apiBase = process.env.NEXT_PUBLIC_API_BASE;

export const getApiProducts = async (): Promise<Products[]> => {

    try {
        const response = await fetch(`${_apiBase}/api/products`, {
            next: {
                revalidate: 60
            }
        });
        if (!response.ok) {
            throw new Error(`Could not fetch data, status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (e) {
        throw e;
    }

};


export const getApiProductsById = async (id: string): Promise<Products> => {
    try {
        const response = await fetch(`${_apiBase}/api/products/${id}`, {
            next: {
                revalidate: 60
            }
        });
        if (!response.ok) {
            throw new Error(`Could not fetch, status: ${response.status}`);
        }

        const data = await response.json() as Products;
        return data;

    } catch (e) {
        throw e;
    }

};

