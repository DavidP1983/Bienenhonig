import { HoneyGuideAttributes, Product } from '../model/types';

export interface HoneyGuideMatch {
  flavorMatch: boolean;
  matchingUses: HoneyGuideAttributes['recommendedUses'];
}

export const getHoneyGuideMatch = (
  product: Product,
  attributes: HoneyGuideAttributes
): HoneyGuideMatch => {
  const guide = product.honeyGuide;

  if (!guide) {
    return {
      flavorMatch: false,
      matchingUses: [],
    };
  }

  return {
    flavorMatch:
      attributes.flavorPreference !== null &&
      guide.flavorPreference === attributes.flavorPreference,

    matchingUses: attributes.recommendedUses.filter((use) =>
      guide.recommendedUses.includes(use)
    ),
  };
};
