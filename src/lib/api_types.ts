export interface StrapiBaseAttr {
  createdAt: string;
  updatedAt: string;
}

export interface StrapiItem<T extends StrapiBaseAttr> {
  id: number;
  attributes: T;
}

export interface StrapiSingleton<T extends StrapiBaseAttr> {
  data: StrapiItem<T>;
}

export interface StrapiArray<T extends StrapiBaseAttr> {
  data: StrapiItem<T>[];
}

export interface StrapiMaybeArray<T extends StrapiBaseAttr> {
  data: StrapiItem<T>[] | null;
}

export interface StrapiMiscAttr extends StrapiBaseAttr {
  home_description: string;
  delivery_description: string;
  price_delivery: number;
  contacts_images: StrapiArray<StrapiImageAttr>;
  contacts_description: string;
}

export interface StrapiImageAttr extends StrapiBaseAttr {
  ext: string;
  url: string;
  name: string;
  width: number;
  height: number;
  formats: StrapiImageFormats;
}

export interface StrapiImageFormats {
  large?: StrapiImageFormat;
  medium?: StrapiImageFormat;
  small?: StrapiImageFormat;
  thumbnail: StrapiImageFormat;
}

export interface StrapiImageFormat {
  url: string;
}

export interface StrapiProductAttr extends StrapiBaseAttr {
  name: string;
  description: string;
  ribbon: string | null;
  price: number;
  price_crossed: number | null;
  images_preview: StrapiArray<StrapiImageAttr>;
  images_gallery: StrapiMaybeArray<StrapiImageAttr>;
}

export interface StrapiCategoryAttr extends StrapiBaseAttr {
  name: string;
  images: StrapiArray<StrapiImageAttr>;
  image_main: StrapiSingleton<StrapiImageAttr>;
}

export interface StrapiSaleAttr extends StrapiBaseAttr {
  products: StrapiArray<StrapiProductAttr>;
}

export interface MBaseItem {
  id: number;
}

export interface MMisc {
  homeDescription: string;
  deliveryDescription: string;
  deliveryPrice: number;
  contactsImages: MImage[];
  contactsDescription: string;
}

export interface MImage extends MBaseItem {
  original: string;
  large?: string;
  medium?: string;
  small?: string;
  thumbnail: string;
}

export interface MCategory extends MBaseItem {
  name: string;
  images: MImage[];
  imageMain: MImage;
}

export interface MProduct extends MBaseItem {
  name: string;
  description: string;
  ribbon: string | null;
  price: number;
  priceCrossed: number | null;
  previewImages: MImage[];
  galleryImages: MImage[];
}

export enum DeliveryType {
  PICKUP = "pickup",
  COURIER = "courier",
  MAIL = "mail",
}

export interface MOrderItem {
  id: number;
  count: number;
}

export interface MOrder {
  deliveryType: DeliveryType;
  notes: string;
  name: string;
  phone: string;
  email: string;
  items: MOrderItem[];
}
