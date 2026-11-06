import serialize from 'serialize-javascript';

export function serializeJsonLd(data: unknown): string {
  return serialize(data, { isJSON: true });
}
