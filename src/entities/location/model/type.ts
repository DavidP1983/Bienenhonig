import { CloudinaryImage } from '@/shared/types/types';

export interface LocationType {
  id: number;
  link: string;
  title: string;
  description: string;
  info: string;
  city: string;
  galleryImage: CloudinaryImage[];
}
