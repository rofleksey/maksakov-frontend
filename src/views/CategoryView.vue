<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { MCategory, MProduct } from "@/lib/api_types";
import { fetchCategory, fetchProducts } from "@/lib/api";
import { useRoute } from "vue-router";
import Title from "@/components/misc/SiteTitle.vue";
import ProductCard from "@/components/misc/ProductCard.vue";
import Gallery from "@/components/misc/ImageGallery.vue";
import { useLastCategoryStore } from "@/stores/store";
import Footer from "@/components/footer/SiteFooter.vue";
import Skeleton from "@/components/misc/Skeleton.vue";

const route = useRoute();
const categoryId = computed(() => Number(route.query.id));

const lastCategoryStore = useLastCategoryStore();
const category = computed<MCategory | null>(() => lastCategoryStore.category);
const products = computed<MProduct[]>(() => lastCategoryStore.products);

onMounted(() => {
  if (
    !category.value ||
    products.value.length === 0 ||
    category.value?.id != categoryId.value
  ) {
    lastCategoryStore.reset();

    fetchCategory(categoryId.value).then((category) => {
      lastCategoryStore.setCategory(category);
    });
    fetchProducts(categoryId.value).then((data) => {
      lastCategoryStore.setProducts(data);
    });
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<template>
  <div class="view-flex">
    <div class="CategoryView__Column">
      <Gallery
        v-if="category"
        class="CategoryView__Gallery"
        :autoplay="category?.images?.length > 1 ? 5000 : 0"
        :transition="1000"
        :images="category?.images ?? []"
      />
      <Title light class="CategoryView__Title">
        {{ category?.name ?? "" }}
      </Title>
      <div class="CategoryView__CategoryList" v-if="products.length > 0">
        <ProductCard
          v-for="product in products"
          :category-id="categoryId"
          :key="product.id"
          :product="product"
        />
      </div>
      <div class="CategoryView__CategoryList" v-else>
        <Skeleton v-for="num in 50" :key="num" width="306px" height="282px" />
      </div>
    </div>

    <Footer />
  </div>
</template>

<style>
.CategoryView__Column {
  max-width: 956px;
  width: 100%;
}

.CategoryView__Gallery .carousel_slide {
  max-width: 956px;
  max-height: 467px;
}

.CategoryView__Gallery .Gallery__item-container {
  width: 100%;
  max-height: 467px;
}

.CategoryView__Title {
  text-transform: uppercase;
  margin: 15px 0;
}

.CategoryView__CategoryList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(306px, 1fr));
  align-items: start;
  justify-items: center;
  max-width: 100%;
  grid-gap: 15px;
}
</style>
