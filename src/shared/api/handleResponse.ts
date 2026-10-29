import { ApiError } from '../errors/ApiError';

export const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  const responseData = contentType?.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    const errorMessage = responseData?.message ?? 'Unable to load product';
    console.log(
      `Message from handleResponse ->  HTTP request status - ${response.status} - ${response.statusText}`
    );

    throw new ApiError(
      errorMessage,
      'HTTP_ERROR',
      response.status,
      responseData?.code,
      response.statusText
    );
  }
  return responseData;
};
