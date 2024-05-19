import {asSitemapUrl, defineSitemapEventHandler} from '#imports'
import {SitemapUrlInput} from "#sitemap";
import {MProduct} from "~/server/utils/api_types";
import {SALE_CATEGORY_ID} from "~/server//utils/misc";
import {fetchCategoriesEager, fetchProductsEager} from "~/server/utils/api";

export default defineSitemapEventHandler(async () => {
  const result: SitemapUrlInput[] = [
    asSitemapUrl('https://maskakov.com'),
    asSitemapUrl('https://maskakov.com/contacts'),
    asSitemapUrl('https://maskakov.com/delivery'),
    asSitemapUrl('https://maskakov.com/catalog'),
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
    result.push(`https://maskakov.com/category/${it.category.id}`);
    it.products.forEach((product: MProduct) => {
      result.push(`https://maskakov.com/product/?id=${product.id}&categoryId=${it.category.id}`)
    })
  })

  return result
})
