import { LocationImages } from '@/shared/assets/img/location';
import { LocationType } from './type';

export const data: LocationType[] = [
  {
    id: 1,
    title: 'Rape',
    link: 'Erkrath-Hochdahl',
    description:
      'This region is known for its clean air, rich landscapes, and diverse wildflowers. Warm summers and long sunny days create ideal conditions for bees to gather nectar from a wide variety of plants. The result is honey with a distinctive character, delicate aroma, and naturally rich flavor.',
    city: 'Erkrath-Hochdahl',
    galleryImage: LocationImages.rape,

    info: 'Our honey is harvested in the picturesque foothills of the Erkrath-Hochdahl. Here, nature offers the purest and most fragrant flowers, and the air is filled with the freshness of the mountains..',
  },
  {
    id: 2,
    title: 'Clover',
    link: 'Dusseldorf',
    description:
      'For generations, beekeeping has been an important part of life in this region. Local knowledge, traditional methods, and respect for nature are carefully passed from one generation to the next. This connection between people, bees, and the land gives the honey its authentic character and unique sense of place.',
    city: 'Düsseldorf',
    galleryImage: LocationImages.clover,

    info: 'Our honey is harvested in the picturesque foothills of the Düsseldorf. Here, nature offers the purest and most fragrant flowers, and the air is filled with the freshness of the mountains..',
  },
];
