import SaleImg from "@/assets/sale.jpg";
import {FetchError} from "ofetch";
import type {MMisc, MProduct} from "~/utils/api_types";
import type {ComputedRef} from "vue";

const token = 'cf6badea62d205164f0635920df6d5d2c20ed321f1f5791be19dbf2efe12af745dd1ac62e803ff35eb0fe6bc27cc056ecf4638bf07ae5855b2ae9bb202d619b2d44ee4d84b3f21bee6ad83347b452ad9cd0134c068623f8ca08c65b268360344bc8770796eb015d7ad8699e439ec65a772a458ae7e93da9231041901d8de462e';

const BASE_URL = 'https://maksakov.com/cms'
const BASE_API_URL = `${BASE_URL}/api`;

interface ApiFetchResult<T> {
  data: ComputedRef<T | null>,
  error: Ref<FetchError<any> | null>
}

function mapStrapiImage(image: StrapiItem<StrapiImageAttr>): MImage {
  return {
    id: image.id,
    original: `${BASE_URL}${image.attributes.url}`,
    large: image.attributes.formats.large
      ? `${BASE_URL}${image.attributes.formats.large.url}`
      : undefined,
    medium: image.attributes.formats.medium
      ? `${BASE_URL}${image.attributes.formats.medium.url}`
      : undefined,
    small: image.attributes.formats.small
      ? `${BASE_URL}${image.attributes.formats.small.url}`
      : undefined,
    thumbnail: `${BASE_URL}${image.attributes.formats.thumbnail.url}`,
  };
}

export async function useFetchMisc(): Promise<ApiFetchResult<MMisc>> {
  const {data, error} = await useFetch<StrapiSingleton<StrapiMiscAttr>>(`${BASE_API_URL}/misc`, {
    query: {
      publicationState: "live",
      populate: "*",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const dataComputed = computed(() => {
    const curData = data.value
    if (!curData) {
      return null
    }

    return {
      homeDescription: curData.data.attributes.home_description,
      deliveryDescription: curData.data.attributes.delivery_description,
      deliveryPrice: curData.data.attributes.price_delivery,
      contactsImages:
        curData.data.attributes.contacts_images.data.map(mapStrapiImage),
      contactsDescription: curData.data.attributes.contacts_description,
    }
  })

  return {
    data: dataComputed,
    error,
  }
}

export async function useFetchCategories(): Promise<ApiFetchResult<MCategory[]>> {
  const {data, error} = useFetch<StrapiArray<StrapiCategoryAttr>>(
    `${BASE_API_URL}/product-categories`,
    {
      query: {
        publicationState: "live",
        populate: "images,image_main",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const dataComputed = computed(() => {
    const curData = data.value
    if (!curData) {
      return null
    }

    const actualCategories = curData.data.map((category) => ({
      id: category.id,
      name: category.attributes.name,
      images: category.attributes.images.data.map(mapStrapiImage),
      imageMain: mapStrapiImage(category.attributes.image_main.data),
    }));

    return [
      ...actualCategories,
      {
        id: SALE_CATEGORY_ID,
        name: "распродажа",
        images: [
          {
            id: SALE_CATEGORY_ID,
            original: SaleImg,
            thumbnail: SaleImg,
          },
        ],
        imageMain: {
          id: SALE_CATEGORY_ID,
          original: SaleImg,
          thumbnail: SaleImg,
        },
      },
    ];
  })

  return {
    data: dataComputed,
    error,
  }
}

export async function useFetchProducts(categoryId: number): Promise<ApiFetchResult<MProduct[]>> {
  if (categoryId === SALE_CATEGORY_ID) {
    return useFetchSale();
  }

  const {data, error} =
    await useFetch<StrapiSingleton<StrapiCategoryAttr>>(`${BASE_API_URL}/product-categories/${categoryId}`, {
      query: {
        publicationState: "live",
        populate: "deep,3",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const dataComputed = computed(() => {
    const curData = data.value
    if (!curData) {
      return null
    }

    return curData.data.attributes.products.data.map((product) => ({
      id: product.id,
      name: product.attributes.name,
      description: product.attributes.description,
      ribbon: product.attributes.ribbon,
      price: product.attributes.price,
      priceCrossed: product.attributes.price_crossed,
      galleryImages:
        product.attributes.images_gallery.data?.map(mapStrapiImage) ?? [],
      previewImages: product.attributes.images_preview.data.map(mapStrapiImage),
    }));
  })

  return {
    data: dataComputed,
    error,
  }
}

export async function useFetchCategory(id: number): Promise<ApiFetchResult<MCategory>> {
  if (id === SALE_CATEGORY_ID) {
    return {
      data: computed(() => ({
        id: SALE_CATEGORY_ID,
        name: "распродажа",
        images: [
          {
            id: SALE_CATEGORY_ID,
            original: SaleImg,
            thumbnail: SaleImg,
          },
        ],
        imageMain: {
          id: SALE_CATEGORY_ID,
          original: SaleImg,
          thumbnail: SaleImg,
        },
      })),
      error: ref(null)
    }
  }

  const {data, error} =
    await useFetch<StrapiSingleton<StrapiCategoryAttr>>(`${BASE_API_URL}/product-categories/${id}`, {
      query: {
        publicationState: "live",
        populate: "images,image_main",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const dataComputed = computed(() => {
    const curData = data.value
    if (!curData) {
      return null
    }

    return {
      id: curData.data.id,
      name: curData.data.attributes.name,
      images: curData.data.attributes.images.data.map(mapStrapiImage),
      imageMain: mapStrapiImage(curData.data.attributes.image_main.data),
    };
  })

  return {
    data: dataComputed,
    error,
  }
}

export async function fetchProductEager(id: number): Promise<MProduct> {
  const data = await $fetch<StrapiSingleton<StrapiProductAttr>>(`${BASE_API_URL}/products/${id}`, {
    query: {
      publicationState: "live",
      populate: "*",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    id: data.data.id,
    name: data.data.attributes.name,
    description: data.data.attributes.description,
    ribbon: data.data.attributes.ribbon,
    price: data.data.attributes.price,
    priceCrossed: data.data.attributes.price_crossed,
    galleryImages:
      data.data.attributes.images_gallery.data?.map(mapStrapiImage) ?? [],
    previewImages: data.data.attributes.images_preview.data.map(mapStrapiImage),
  };
}

export async function useFetchProduct(id: number): Promise<ApiFetchResult<MProduct>> {
  const {data, error} =
    await useFetch<StrapiSingleton<StrapiProductAttr>>(`${BASE_API_URL}/products/${id}`, {
      query: {
        publicationState: "live",
        populate: "*",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const dataComputed = computed(() => {
    const curData = data.value
    if (!curData) {
      return null
    }

    return {
      id: curData.data.id,
      name: curData.data.attributes.name,
      description: curData.data.attributes.description,
      ribbon: curData.data.attributes.ribbon,
      price: curData.data.attributes.price,
      priceCrossed: curData.data.attributes.price_crossed,
      galleryImages:
        curData.data.attributes.images_gallery.data?.map(mapStrapiImage) ?? [],
      previewImages: curData.data.attributes.images_preview.data.map(mapStrapiImage),
    };
  })

  return {
    data: dataComputed,
    error,
  }
}

export async function sendOrder(order: MOrder): Promise<void> {
  return $fetch(`${BASE_API_URL}/order`, {
    method: 'POST',
    body: order,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function useFetchSale(): Promise<ApiFetchResult<MProduct[]>> {
  const {data, error} = await useFetch<StrapiSingleton<StrapiSaleAttr>>(
    `${BASE_API_URL}/sale`,
    {
      query: {
        publicationState: "live",
        populate: "deep,3",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const dataComputed = computed(() => {
    const curData = data.value
    if (!curData) {
      return null
    }

    return curData.data.attributes.products.data.map((product) => ({
      id: product.id,
      name: product.attributes.name,
      description: product.attributes.description,
      ribbon: product.attributes.ribbon,
      price: product.attributes.price,
      priceCrossed: product.attributes.price_crossed,
      galleryImages:
        product.attributes.images_gallery.data?.map(mapStrapiImage) ?? [],
      previewImages: product.attributes.images_preview.data.map(mapStrapiImage),
    }));
  })

  return {
    data: dataComputed,
    error,
  }
}
