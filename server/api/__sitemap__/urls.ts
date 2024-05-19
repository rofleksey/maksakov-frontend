import {asSitemapUrl, defineSitemapEventHandler} from '#imports'
import {SitemapUrlInput} from "#sitemap";
import {MProduct} from "~/server/utils/api_types";
import {SALE_CATEGORY_ID} from "~/server//utils/misc";
import {fetchCategoriesEager, fetchProductsEager} from "~/server/utils/api";

export default defineSitemapEventHandler(async () => {
  const result: SitemapUrlInput[] = [
    asSitemapUrl('https://maksakov.com'),
    asSitemapUrl('https://maksakov.com/contacts'),
    asSitemapUrl('https://maksakov.com/delivery'),
    asSitemapUrl('https://maksakov.com/catalog'),
  ];

  const categories = await fetchCategoriesEager();

  categories.push({
    id: SALE_CATEGORY_ID,
  } as MCategory)

  const categoriesAndProducts = await Promise.all(categories.map(async (category) => {
    const products = await fetchProductsEager(category.id);
    return {
      products,
      category
    }
  }))

  categoriesAndProducts.forEach((it) => {
    result.push(`https://maksakov.com/category/${it.category.id}`);
    it.products.forEach((product: MProduct) => {
      result.push(`https://maksakov.com/product/?id=${product.id}&categoryId=${it.category.id}`)
    })
  })

  return result
})
