import { match } from 'ts-pattern';
import { ApiError } from './ApiError';
import { AppError } from './AppError';

export const errorsHandler = (error: unknown): string => {
  if (error instanceof ApiError) {
    return match(error.type)
      .with('EMPTY_RESPONSE', () => 'The server returned no data')
      .with('NETWORK_ERROR', () => 'Network error')
      .with('HTTP_ERROR', () => {
        return match(error.status)
          .with(404, () => error.message)
          .with(400, () => error.message)
          .with(409, () => error.message)
          .with(500, () => 'Server Error')
          .otherwise(() => 'Something went wrong');
      })
      .exhaustive();
  }

  if (error instanceof AppError) {
    return error.message;
  }

  return 'Something went wrong';
};
