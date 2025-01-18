
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Location } from "@/components/Location";
import { dbloaction } from "../db/dbLocaction";
import { LocationType } from "@/shared/types/type";


interface Props {
    params: {
        id: string;
    }
}



const getPlacebyName = async (id: string) => {

    try {
        const [place] = dbloaction.filter((place) => place.link === id);

        if (!Object.keys(place).length) {
            throw new Error('Could not fetch data')
        }
        return place as LocationType;
    } catch (e) {
        if (e instanceof Error) throw e

    }
}

export const generateMetadata = async ({ params: { id } }: Props): Promise<Metadata> => {
    const place = await getPlacebyName(id)

    return {
        title: place?.city
    }
}

const LocationPage = async ({ params }: Props) => {
    const { id } = params;
    const place = await getPlacebyName(id);

    if (!place?.title) return notFound();

    return (
        <Location {...place} />
    )
}

export default LocationPage;
