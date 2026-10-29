'use client';
import {
  errorsHandler,
  getApiErrorCode,
  isErrorTranslationKey,
} from '@/shared/errors';
import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { orderService } from './order.service';
import type { CreateOrderPayload } from './types';

export const useCreateOrder = () => {
  const t = useTranslations('CheckoutForm');
  const tErrors = useTranslations('ErrorDetails');

  const [api, contextHolder] = notification.useNotification({
    stack: false,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: ({
      payload,
      idempotencyKey,
    }: {
      payload: CreateOrderPayload;
      idempotencyKey: string;
    }) => {
      return orderService.placeOrder(payload, idempotencyKey);
    },

    onSuccess: () => {
      setModalOpen(true);
    },

    onError: (error) => {
      const code = getApiErrorCode(error);

      const message =
        code && isErrorTranslationKey(code)
          ? tErrors(code)
          : errorsHandler(error);

      api.error({
        message: t('createOrder.createFailedTitle'),
        description: message || t('createOrder.tryAgain'),
        placement: 'top',
        duration: 5,
      });
    },
  });

  return {
    ...mutation,
    contextHolder,
    modalOpen,
  };
};
