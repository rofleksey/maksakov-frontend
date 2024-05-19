const token = 'cf6badea62d205164f0635920df6d5d2c20ed321f1f5791be19dbf2efe12af745dd1ac62e803ff35eb0fe6bc27cc056ecf4638bf07ae5855b2ae9bb202d619b2d44ee4d84b3f21bee6ad83347b452ad9cd0134c068623f8ca08c65b268360344bc8770796eb015d7ad8699e439ec65a772a458ae7e93da9231041901d8de462e';

const BASE_URL = 'https://maksakov.com/cms'
const BASE_API_URL = `${BASE_URL}/api`;

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

export async function fetchProductsEager(categoryId: number): Promise<MProduct[]> {
  if (categoryId === SALE_CATEGORY_ID) {
    return fetchSaleEager();
  }

  const data = await $fetch<StrapiSingleton<StrapiCategoryAttr>>(`${BASE_API_URL}/product-categories/${categoryId}`, {
    query: {
      publicationState: "live",
      populate: "deep,3",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data.attributes.products.data.map((product) => ({
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
}

export async function fetchCategoriesEager(): Promise<MCategory[]> {
  const data = await $fetch<StrapiArray<StrapiCategoryAttr>>(
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

  const actualCategories = data.data.map((category) => ({
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
          original: '',
          thumbnail: '',
        },
      ],
      imageMain: {
        id: SALE_CATEGORY_ID,
        original: '',
        thumbnail: '',
      },
    },
  ];
}

async function fetchSaleEager(): Promise<MProduct[]> {
  const data = await $fetch<StrapiSingleton<StrapiSaleAttr>>(
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

  return data.data.attributes.products.data.map((product) => ({
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
}
