'use client';
import {
  errorsHandler,
  getApiErrorCode,
  isErrorTranslationKey,
} from '@/shared/errors';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useTranslations } from 'next-intl';
import { backInStockService } from './backInStock.service';
import type { TBackInStock } from './types';

export const useBackInStock = () => {
  const t = useTranslations('BackInStock');
  const tErrors = useTranslations('ErrorDetails');

  return useMutation({
    mutationFn: (payload: TBackInStock) =>
      backInStockService.placeSubmission(payload),
    onSuccess: () => {
      message.success(t('success'));
    },

    onError: (error) => {
      const code = getApiErrorCode(error);
      const errorMessage =
        code && isErrorTranslationKey(code)
          ? tErrors(code)
          : errorsHandler(error);

      message.error(errorMessage ?? t('error'));
    },
  });
};
