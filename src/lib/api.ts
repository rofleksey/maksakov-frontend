import axios from 'axios';
import {SALE_CATEGORY_ID} from "@/lib/misc";
import SaleImg from "@/assets/sale.jpg"

// @ts-ignore
const token = import.meta.env.VITE_API_TOKEN;

// @ts-ignore
const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_API_URL = `${BASE_URL}/api`;

interface StrapiBaseAttr {
  createdAt: string;
  updatedAt: string;
}

interface StrapiItem<T extends StrapiBaseAttr> {
  id: number;
  attributes: T;
}

interface StrapiSingleton<T extends StrapiBaseAttr> {
  data: StrapiItem<T>
}

interface StrapiArray<T extends StrapiBaseAttr> {
  data: StrapiItem<T>[]
}

interface StrapiMaybeArray<T extends StrapiBaseAttr> {
  data: StrapiItem<T>[] | null
}

interface StrapiMiscAttr extends StrapiBaseAttr {
  home_description: string;
  delivery_description: string;
  price_delivery: number;
}

interface StrapiImageAttr extends StrapiBaseAttr {
  ext: string;
  url: string;
  name: string;
  width: number;
  height: number;
  formats: StrapiImageFormats;
}

interface StrapiImageFormats {
  large?: StrapiImageFormat;
  medium?: StrapiImageFormat;
  small?: StrapiImageFormat;
  thumbnail: StrapiImageFormat;
}

interface StrapiImageFormat {
  url: string;
}

interface StrapiProductAttr extends StrapiBaseAttr {
  name: string;
  description: string;
  ribbon: string | null;
  price: number;
  price_crossed: number | null;
  images_preview: StrapiArray<StrapiImageAttr>
  images_gallery: StrapiMaybeArray<StrapiImageAttr>
}

interface StrapiCategoryAttr extends StrapiBaseAttr {
  name: string;
  images: StrapiArray<StrapiImageAttr>;
  image_main: StrapiSingleton<StrapiImageAttr>;
}

interface StrapiSaleAttr extends StrapiBaseAttr {
  products: StrapiArray<StrapiProductAttr>
}

export interface MBaseItem {
  id: number;
}

export interface MMisc {
  homeDescription: string;
  deliveryDescription: string;
  deliveryPrice: number;
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
  MAIL = "mail"
}

export interface MOrderItem {
  id: number;
  count: number;
}

export interface MOrder {
  deliveryType: DeliveryType;
  notes: string;
  items: MOrderItem[];
}

function mapStrapiImage(image: StrapiItem<StrapiImageAttr>): MImage {
  return {
    id: image.id,
    original: `${BASE_URL}${image.attributes.url}`,
    large: image.attributes.formats.large ? `${BASE_URL}${image.attributes.formats.large.url}` : undefined,
    medium: image.attributes.formats.medium ? `${BASE_URL}${image.attributes.formats.medium.url}` : undefined,
    small: image.attributes.formats.small ? `${BASE_URL}${image.attributes.formats.small.url}` : undefined,
    thumbnail: `${BASE_URL}${image.attributes.formats.thumbnail.url}`,
  }
}

export async function fetchMisc(): Promise<MMisc> {
  const {data}: { data: StrapiSingleton<StrapiMiscAttr> } = await axios.get(`${BASE_API_URL}/misc`, {
    params: {
      "publicationState": "live",
      "populate": "*",
    },
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  return {
    homeDescription: data.data.attributes.home_description,
    deliveryDescription: data.data.attributes.delivery_description,
    deliveryPrice: data.data.attributes.price_delivery,
  }
}

export async function fetchCategories(): Promise<MCategory[]> {
  const {data}: { data: StrapiArray<StrapiCategoryAttr> } = await axios.get(`${BASE_API_URL}/product-categories`, {
    params: {
      "publicationState": "live",
      "populate": "images,image_main",
    },
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  console.log(data);

  return data.data.map((category) => ({
    id: category.id,
    name: category.attributes.name,
    images: category.attributes.images.data.map(mapStrapiImage),
    imageMain: mapStrapiImage(category.attributes.image_main.data),
  }));
}

export async function fetchProducts(categoryId: number): Promise<MProduct[]> {
  if (categoryId === SALE_CATEGORY_ID) {
    return fetchSale();
  }

  const {data}: { data: StrapiArray<StrapiProductAttr> } = await axios.get(`${BASE_API_URL}/products`, {
    params: {
      "filters[$and][0][category][id][$eq]": categoryId,
      "publicationState": "live",
      "populate": "*",
    },
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  console.log(data);

  return data.data.map((product) => ({
    id: product.id,
    name: product.attributes.name,
    description: product.attributes.description,
    ribbon: product.attributes.ribbon,
    price: product.attributes.price,
    priceCrossed: product.attributes.price_crossed,
    galleryImages: product.attributes.images_gallery.data?.map(mapStrapiImage) ?? [],
    previewImages: product.attributes.images_preview.data.map(mapStrapiImage),
  }));
}

export async function fetchCategory(id: number): Promise<MCategory> {
  if (id === SALE_CATEGORY_ID) {
    return {
      id: SALE_CATEGORY_ID,
      name: "распродажа",
      images: [{
        id: SALE_CATEGORY_ID,
        original: SaleImg,
        thumbnail: SaleImg
      }],
      imageMain: {
        id: SALE_CATEGORY_ID,
        original: SaleImg,
        thumbnail: SaleImg
      }
    }
  }

  const {data}: { data: StrapiSingleton<StrapiCategoryAttr> } = await axios.get(`${BASE_API_URL}/product-categories/${id}`, {
    params: {
      "publicationState": "live",
      "populate": "images,image_main",
    },
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  return {
    id: data.data.id,
    name: data.data.attributes.name,
    images: data.data.attributes.images.data.map(mapStrapiImage),
    imageMain: mapStrapiImage(data.data.attributes.image_main.data),
  }
}

export async function sendOrder(order: MOrder): Promise<void> {
  return axios.post(`${BASE_API_URL}/order`, order, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
}

async function fetchSale(): Promise<MProduct[]> {
  const {data}: { data: StrapiSingleton<StrapiSaleAttr> } = await axios.get(`${BASE_API_URL}/sale`, {
    params: {
      "publicationState": "live",
      "populate": "deep,3",
    },
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  return data.data.attributes.products.data.map((product) => ({
    id: product.id,
    name: product.attributes.name,
    description: product.attributes.description,
    ribbon: product.attributes.ribbon,
    price: product.attributes.price,
    priceCrossed: product.attributes.price_crossed,
    galleryImages: product.attributes.images_gallery.data?.map(mapStrapiImage) ?? [],
    previewImages: product.attributes.images_preview.data.map(mapStrapiImage),
  }));
}
