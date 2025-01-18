

interface Gellery {
    [key: string]: string;
}

export interface LocationType {
    id: number;
    link: string;
    title: string;
    description: string;
    info: string;
    city: string;
    srcURI: string;
    gelleryImage: Gellery;
}

export interface NavigationType {
    id: number;
    title: string;
    path: string;
    img: string;
    subtitle: string;
}

//Products
export interface Reviews {
    id: string;
    name: string;
    date: Date;
    city: string;
    title: string;
    rating: string;
    comment: string;
}

export type FormData = Omit<Reviews, "id" | 'date'>

interface Description {
    who: string;
    colour: string;
    where: string;
}

export interface Products {
    _id: string;
    image: string;
    category?: string;
    description: Description;
    price: string[];
    reviews: Reviews[];
    stock: boolean;
    qnt: number[];
    size: number[];
    sort: string;
    title: string;
    link: string;
}

export interface ICartOrder {
    id: string;
    image: string;
    title: string;
    size: number;
    price: string;
    qnt: number;
}


