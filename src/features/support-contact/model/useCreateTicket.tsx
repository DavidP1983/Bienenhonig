"use client";
import {
  errorsHandler,
  getApiErrorCode,
  isErrorTranslationKey,
} from "@/shared/errors";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ticketService } from "./ticket.service";
import type { SupportFormValues } from "./types";

export const useCreateTicket = () => {
  const t = useTranslations("CreateTicket");
  const tErrors = useTranslations("ErrorDetails");

  const [api, contextHolder] = notification.useNotification({
    stack: false,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const onClose = () => {
    setModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: ({ payload }: { payload: SupportFormValues }) => {
      return ticketService.createTicker(payload);
    },

    onSuccess: (response) => {
      if (
        response.customerEmailStatus === "failed" ||
        response.supportEmailStatus === "failed"
      ) {
        api.warning({
          message: t("emailFailedTitle"),
          description: t("emailFailedDescription"),
          placement: "top",
          duration: 5,
        });
        return;
      }

      setModalOpen(true);
    },

    onError: (error) => {
      const code = getApiErrorCode(error);

      const message =
        code && isErrorTranslationKey(code)
          ? tErrors(code)
          : errorsHandler(error);

      api.error({
        message: t("createFailedTitle"),
        description: message || t("tryAgain"),
        placement: "top",
        duration: 5,
      });
    },
  });

  return {
    ...mutation,
    contextHolder,
    modalOpen,
    onClose,
  };
};
