export type CloudinaryImage = {
  provider: 'cloudinary';
  publicId: string;
  format: string;
  alt?: string;
  width?: number;
  height?: number;
};

/* provider играет роль в том чтобы в будущем при изменении CDN была возможность у ф-ии изменить src и сформировать корректный путь */
