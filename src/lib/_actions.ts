import { FormData } from '@/shared/types/type';

type TMethod = "GET" | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

interface Props {
    redirectTo: (id: string) => Promise<void>;
    endpoints: string;
    method: TMethod;
    id: string;
    data: FormData;
}

interface Headers {
    [content: string]: string;
}

interface IConfig {
    method: TMethod;
    headers: Headers;
    body?: string;
}

const _baseURL = process.env.NEXT_PUBLIC_API_BASE;
// Create Review comment
async function createReview({ redirectTo, endpoints, method, id, data }: Props) {

    const config: IConfig = {
        method,
        headers: {}
    }

    if (data) {
        config.headers['Content-Type'] = 'application/json';
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${_baseURL}/api/products/${endpoints}`, config);

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        const result = await response.json();
        return result;
    } catch (e) {
        if (e instanceof Error) console.error('Error creating post:', e.message);
        throw e;
    } finally {
        redirectTo(id)
    }
}
export { createReview }

