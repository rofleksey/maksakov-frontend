<script setup lang="ts">
import {computed, onMounted} from "vue";
import type {MCategory, MProduct} from "@/lib/api"
import {fetchCategory, fetchProducts} from "@/lib/api"
import {useRoute} from "vue-router";
import 'vue3-carousel/dist/carousel.css'
import {useLastCategoryStore} from "@/stores/store";
import Breadcrumb from "@/components/misc/Breadcrumb.vue";
import Pagination from "@/components/misc/Pagination.vue";
import Gallery from "@/components/misc/Gallery.vue";
import {formatPrice} from "@/lib/misc";
import AddToCartButton from "@/components/cart/AddToCartButton.vue";
import Markdown from "@/components/misc/Markdown.vue";
import Footer from "@/components/footer/Footer.vue";

const route = useRoute();
const productId = computed(() => Number(route.query.productId));
const categoryId = computed(() => Number(route.query.categoryId));

const lastCategoryStore = useLastCategoryStore();
const category = computed<MCategory | null>(() => lastCategoryStore.category);
const products = computed<MProduct[]>(() => lastCategoryStore.products);
const product = computed(() => products.value.find((p) => p.id === productId.value));
const productIndex = computed(() => products.value.findIndex((p) => p.id === productId.value));

const prevProductLink = computed(() => {
  if (productIndex.value === -1 || productIndex.value === 0) {
    return null;
  }
  const id = products.value[productIndex.value - 1].id;
  return `/product?productId=${id}&categoryId=${categoryId.value}`;
});

const nextProductLink = computed(() => {
  if (productIndex.value === -1 || productIndex.value === products.value.length - 1) {
    return null;
  }
  const id = products.value[productIndex.value + 1].id;
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
})

const breadcrumbSegments = computed(() => ([{
  text: 'Главная',
  path: '/'
}, {
  text: category.value?.name ?? '',
  path: `/category?id=${categoryId.value}`
}, {
  text: product.value?.name ?? '',
  path: '',
}]))

onMounted(() => {
  if (!category.value || products.value.length === 0 || category.value?.id != categoryId.value) {
    lastCategoryStore.reset();

    fetchCategory(categoryId.value).then((category) => {
      lastCategoryStore.setCategory(category);
    });
    fetchProducts(categoryId.value).then((data) => {
      lastCategoryStore.setProducts(data);
      console.log(data[0].galleryImages);
    })
  }
  window.scrollTo({top: 0, behavior: 'smooth'});
})
</script>

<template>
  <div class="view-flex">
    <div class="ProductView__Column">
      <nav class="ProductView__Nav">
        <Breadcrumb
          class="ProductView__Breadcrumb"
          :segments="breadcrumbSegments"/>
        <Pagination
          :prev-link="prevProductLink"
          :next-link="nextProductLink"/>
      </nav>
      <div class="ProductView__Content">
        <Gallery
          class="ProductView__Gallery"
          :zoom="true"
          :images="galleryImages"/>
        <div class="ProductView__Info">
          <div class="ProductView__Title">
            {{ product?.name ?? '' }}
          </div>
          <div class="ProductView__Price">
            {{ formatPrice(product?.price ?? 0) }}
          </div>
          <AddToCartButton
            v-if="product"
            :product="product"
            :categoryId="categoryId"/>
        </div>
      </div>
      <Markdown
        class="ProductView__Description"
        :text="product?.description ?? ''"/>
    </div>

    <Footer/>
  </div>
</template>

<style>
.ProductView__Column {
  width: 956px;
}

.ProductView__Breadcrumb {
  flex-grow: 1;
}

.ProductView__Nav {
  display: flex;
  flex-direction: row;
  margin-top: 35px;
  margin-bottom: 60px;
}

.ProductView__Content {
  display: flex;
  flex-direction: row;
  justify-content: start;
}

.ProductView__Gallery {
  width: 500px;
}

.ProductView__Gallery .carousel_slide {
  width: 500px;
  height: 333px;
}

.ProductView__Gallery .Gallery__item-container {
  width: 100%;
  height: 333px;
}

.ProductView__Info {
  font: var(--font-din-next);
  color: #575757;
  margin-left: 50px;
  width: 355px;
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
  width: 500px;
  padding: 20px 0;
}
</style>
