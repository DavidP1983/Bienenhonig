import { ApiError } from "./ApiError";

export const getApiErrorCode = (error: unknown): string | undefined => {
  return error instanceof ApiError ? error.code : undefined;
};
