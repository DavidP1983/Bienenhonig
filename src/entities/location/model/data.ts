import { locationURL } from '@/shared/assets/img/location';
import { LocationType } from './type';

export const data: LocationType[] = [
  {
    id: 1,
    title: 'Rape',
    link: 'Erkrath-Hochdahl',
    description:
      'This region is known for its clean air, rich landscapes, and diverse wildflowers. Warm summers and long sunny days create ideal conditions for bees to gather nectar from a wide variety of plants. The result is honey with a distinctive character, delicate aroma, and naturally rich flavor.',
    city: 'Erkrath-Hochdahl',
    srcURI: locationURL.rape,
    gelleryImage: {
      img1: locationURL.erkrath1,
      img2: locationURL.erkrath2,
      img3: locationURL.erkrath3,
    },
    info: 'Our honey is harvested in the picturesque foothills of the Erkrath-Hochdahl. Here, nature offers the purest and most fragrant flowers, and the air is filled with the freshness of the mountains..',
  },
  {
    id: 2,
    title: 'Clover',
    link: 'Dusseldorf',
    description:
      'For generations, beekeeping has been an important part of life in this region. Local knowledge, traditional methods, and respect for nature are carefully passed from one generation to the next. This connection between people, bees, and the land gives the honey its authentic character and unique sense of place.',
    city: 'Düsseldorf',
    srcURI: locationURL.clover,
    gelleryImage: {
      img1: locationURL.dusseldorf1,
      img2: locationURL.dusseldorf2,
      img3: locationURL.dusseldorf3,
    },
    info: 'Our honey is harvested in the picturesque foothills of the Düsseldorf. Here, nature offers the purest and most fragrant flowers, and the air is filled with the freshness of the mountains..',
  },
  {
    id: 3,
    title: 'Linden',
    link: 'Hubbelrath',
    description:
      'The natural environment plays an important role in the quality of our honey. Far from busy cities and intensive agriculture, the bees can collect nectar from naturally growing flowers and plants. Every jar reflects the landscape where it was produced — pure, natural, and full of the character of the region.',
    city: 'Hubbelrath',
    srcURI: locationURL.linden,
    gelleryImage: {
      img1: locationURL.hubbelrath1,
      img2: locationURL.hubbelrath2,
      img3: locationURL.hubbelrath3,
    },
    info: 'Our honey is harvested in the picturesque foothills of the Düsseldorf. Here, nature offers the purest and most fragrant flowers, and the air is filled with the freshness of the mountains..',
  },
];
