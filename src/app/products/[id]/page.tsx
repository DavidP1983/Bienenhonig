'use server';
import { Metadata } from "next";
import { SingleItem } from "@/components/singleItem/SinglItem";
import { getApiProducts, getApiProductsById } from "@/services/fetchData";
import { Products } from "@/shared/types/type";

interface Props {
    params: {
        id: string;
    }
}


export const generateStaticParams = async () => {
    const data: Products[] = await getApiProducts();
    return data.map(item => ({
        slug: item._id.toString()
    }))
}

export const generateMetadata = async ({ params: { id } }: Props): Promise<Metadata> => {
    const data = await getApiProductsById(id);
    return {
        title: data.title
    }
}


const SingleItemPage = async ({ params }: Props) => {
    const { id } = params;
    const data = await getApiProductsById(id);

    return (
        <SingleItem data={data} />
    );

}

export default SingleItemPage;