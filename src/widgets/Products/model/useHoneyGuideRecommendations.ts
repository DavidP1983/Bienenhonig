import { matchHoneyGuideProducts } from '@/entities/product/lib';
import type {
  HoneyGuideAttributes,
  Product,
} from '@/entities/product/model/types';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

interface Props {
  data: Product[] | undefined;
  setActiveOverlay: Dispatch<SetStateAction<'filter' | 'guid' | null>>;
}

export const useHoneyGuideRecommendation = ({
  data: products,
  setActiveOverlay,
}: Props) => {
  const [honeyGuideOpen, setHoneyGuideOpen] = useState(false);
  const [honeyGuideAttributes, setHoneyGuideAttributes] =
    useState<HoneyGuideAttributes | null>(null);

  const handleOpenHoneyGuid = () => {
    setActiveOverlay('guid');
    setHoneyGuideOpen(true);
  };

  const handleHoneyGuideFind = (attributes: HoneyGuideAttributes) => {
    setHoneyGuideAttributes(attributes);
    setHoneyGuideOpen(false);
  };

  const recommendedProducts = useMemo(() => {
    if (!products || !honeyGuideAttributes) return [];

    return matchHoneyGuideProducts(products, honeyGuideAttributes);
  }, [products, honeyGuideAttributes]);

  const isHoneyGuideActive = honeyGuideAttributes !== null;

  const handleBackToProducts = () => {
    setActiveOverlay(null);
    setHoneyGuideAttributes(null);
  };

  return {
    honeyGuideOpen,
    setHoneyGuideOpen,
    honeyGuideAttributes,
    handleOpenHoneyGuid,
    recommendedProducts,
    isHoneyGuideActive,
    handleHoneyGuideFind,
    handleBackToProducts,
  };
};
