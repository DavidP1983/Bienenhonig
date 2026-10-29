export interface Category {
  _id: string;
  name: {
    en: string;
    ru: string;
  };
  slug: string;
  description: {
    en: string;
    ru: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
