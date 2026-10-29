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
