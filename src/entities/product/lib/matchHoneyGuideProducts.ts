import type { HoneyGuideAttributes, Product } from '../model/types';

export const matchHoneyGuideProducts = (
  products: Product[],
  attributes: HoneyGuideAttributes
): Product[] => {
  return products
    .filter((product) => {
      const guide = product.honeyGuide;

      return (
        product.isActive &&
        product.variants.some((variant) => variant.quantity > 0) &&
        guide !== undefined &&
        attributes.recommendedUses.some((use) =>
          guide.recommendedUses.includes(use)
        )
      );
    })
    .map((product) => {
      const guide = product.honeyGuide!;

      const matchingUses = attributes.recommendedUses.filter((use) =>
        guide.recommendedUses.includes(use)
      ).length;

      const flavorMatch =
        attributes.flavorPreference !== null &&
        guide.flavorPreference === attributes.flavorPreference;

      return {
        product,
        score: matchingUses * 2 + Number(flavorMatch),
      };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product);
};

/* 1. filter() - фильтрация продуктов которые прошли условия исходя из полученных и выбранных в фильтре данных*/
/* 2. расчёт рейтинга (score)*/
/* 3. сортировка по рейтингу*/
/* 4. получение результата*/
