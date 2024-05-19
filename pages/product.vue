<script lang="ts" setup>
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import Breadcrumb from "@/components/misc/BreadcrumbNav.vue";
import Pagination from "@/components/misc/PaginationButtons.vue";
import Gallery from "@/components/misc/ImageGallery.vue";
import AddToCartButton from "@/components/cart/AddToCartButton.vue";
import Markdown from "@/components/misc/MarkDown.vue";
import Footer from "@/components/footer/SiteFooter.vue";
import BreadcrumbBack from "@/components/misc/BreadcrumbBack.vue";
import {DEFAULT_DESCRIPTION, DEFAULT_TITLE} from "~/utils/misc";

const route = useRoute();
const productId = computed(() => Number(route.query.productId));
const categoryId = computed(() => Number(route.query.categoryId));

const {data: category} = await useFetchCategory(categoryId.value)
const {data: products} = await useFetchProducts(categoryId.value)

const product = useState<MProduct | null>('productPageProduct', () => products.value?.find((p) => p.id === productId.value) || null);
const productIndex = useState<number>('productPageIndex', () => products.value?.findIndex((p) => p.id === productId.value) ?? -1);


watch(productId, () => {
  const newProduct = products.value?.find((p) => p.id === productId.value) || null
  if (!newProduct) {
    return
  }

  product.value = newProduct
}, {
  immediate: true
})

watch(productId, () => {
  const newIndex = products.value?.findIndex((p) => p.id === productId.value) ?? -1
  if (newIndex < 0) {
    return
  }

  productIndex.value = newIndex
}, {
  immediate: true
})


const prevProductLink = computed(() => {
  if (productIndex.value === -1 || productIndex.value === 0) {
    return null;
  }

  const id = products.value?.[productIndex.value - 1]?.id;
  return `/product?productId=${id}&categoryId=${categoryId.value}`;
});

const nextProductLink = computed(() => {
  if (
      productIndex.value === -1 ||
      productIndex.value === (products.value?.length ?? 0) - 1
  ) {
    return null;
  }
  const id = products.value?.[productIndex.value + 1]?.id;
  return `/product?productId=${id}&categoryId=${categoryId.value}`;
});

const galleryImages = computed(() => {
  if (!product.value) {
    return [];
  }
  if (product.value.galleryImages.length > 0) {
    return product.value.galleryImages;
  }
  return product.value.previewImages;
});

const breadcrumbSegments = computed(() => [
  {
    text: "Главная",
    path: "/",
  },
  {
    text: category.value?.name ?? "",
    path: `/category/${categoryId.value}`,
  },
  {
    text: product.value?.name ?? "",
    path: "",
  },
]);

const title = product.value ? `Максаков - ${useCapitalize(product.value.name)}` : DEFAULT_TITLE
const description = product.value ? `Максаков - ${product.value.description!.substring(0, Math.min(150, product.value.description!.length)) + '...'}` : DEFAULT_DESCRIPTION
const seoImage = galleryImages.value.length > 0 ? galleryImages.value[0].large : '/apple-touch-icon.png'

useSeoMeta({
  author: 'МАКСАКОВ',
  ogLocale: 'ru_RU',
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  ogImage: seoImage,
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: seoImage,
  twitterCard: 'summary_large_image'
})

onMounted(() => {
  window.scrollTo({top: 0, behavior: "smooth"});
});
</script>

<template>
  <div class="view-flex">
    <div class="ProductView__Column">
      <nav class="ProductView__BackNav">
        <BreadcrumbBack
            :link="`/category/${categoryId}`"
            :text="category?.name ?? ''"
            class="ProductView__BreadcrumbBack"
        />
        <Pagination :next-link="nextProductLink" :prev-link="prevProductLink"/>
      </nav>
      <nav class="ProductView__Nav">
        <Breadcrumb
            :segments="breadcrumbSegments"
            class="ProductView__Breadcrumb"
        />
        <Pagination :next-link="nextProductLink" :prev-link="prevProductLink"/>
      </nav>
      <div class="ProductView__Content">
        <Gallery
            :images="galleryImages"
            :zoom="true"
            aspect-ratio="3/2"
            class="ProductView__Gallery"
        />
        <div class="ProductView__Info">
          <div class="ProductView__Title">
            {{ product?.name ?? "" }}
          </div>
          <div class="ProductView__Price">
            {{ formatPrice(product?.price ?? 0) }}
          </div>
          <AddToCartButton
              v-if="product"
              :categoryId="categoryId"
              :product="product"
          />
        </div>
      </div>
      <Markdown
          :text="product?.description ?? ''"
          class="ProductView__Description"
      />
    </div>

    <Footer/>
  </div>
</template>

<style>
.ProductView__Column {
  max-width: 956px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.ProductView__BackNav {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.ProductView__Nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.ProductView__BreadcrumbBack {
  margin-bottom: 10px;
}

.ProductView__Nav,
.ProductView__BackNav {
  margin-top: 35px;
  margin-bottom: 60px;
  flex-wrap: wrap;
  width: 100%;
}

.ProductView__Content {
  display: flex;
  flex-direction: row;
  justify-content: start;
  flex-wrap: wrap;
}

.ProductView__Gallery {
  width: 500px;
}

.ProductView__Gallery .carousel_slide {
  width: 500px;
  max-height: 333px;
}

.ProductView__Gallery .Gallery__item-container {
  width: 100%;
  max-height: 333px;
}

.ProductView__Info {
  font: var(--font-din-next);
  color: #575757;
  margin-left: 50px;
  max-width: 355px;
}

.ProductView__Title {
  font-size: 21px;
  line-height: 26px;
}

.ProductView__Price {
  padding-top: 23px;
  margin-bottom: 32px;
}

.ProductView__Description {
  max-width: 500px;
  padding: 20px 0;
}

@media (max-width: 1000px) {
  .ProductView__Nav {
    display: none;
  }

  .ProductView__BackNav {
    display: flex;
  }

  .ProductView__Column {
    justify-content: center;
    align-items: center;
  }

  .ProductView__Content {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .ProductView__Info {
    margin-top: 30px;
    margin-bottom: 10px;
    margin-left: 0;
    width: 100%;
  }

  .ProductView__Gallery {
    max-width: 100%;
  }

  .ProductView__Description {
    margin: 10px;
  }

  .ProductView__Gallery .carousel_slide {
    max-width: 100%;
    max-height: 333px;
  }

  .ProductView__Gallery .Gallery__item-container {
    width: 100%;
    max-height: 333px;
  }
}
</style>
