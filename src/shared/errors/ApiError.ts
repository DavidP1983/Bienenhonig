import { AppError } from './AppError';
import { ApiErrorType } from './type';

export class ApiError extends AppError {
  status?: number;
  statusText?: string;
  code?: string;
  type: ApiErrorType;

  constructor(
    message: string,
    type: ApiErrorType,
    status?: number,
    code?: string,
    statusText?: string
  ) {
    super(message);

    this.type = type;
    this.status = status;
    this.code = code;
    this.statusText = statusText;
    this.name = 'ApiError';
  }
}
