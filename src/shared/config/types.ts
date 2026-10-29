export interface NavigationType {
  id: number;
  translationKey: "home" | "products" | "support";
  path: string;
  url: string;
  subtitleKey: "homeSubtitle" | "productsSubtitle" | "supportSubtitle";
}
