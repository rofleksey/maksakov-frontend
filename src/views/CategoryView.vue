<script setup lang="ts">
import {computed, onMounted} from "vue";
import type {MCategory, MProduct} from "@/lib/api"
import {fetchCategory, fetchProducts} from "@/lib/api"
import {useRoute} from "vue-router";
import 'vue3-carousel/dist/carousel.css'
import Title from "@/components/misc/Title.vue";
import ProductCard from "@/components/misc/ProductCard.vue";
import Gallery from "@/components/misc/Gallery.vue";
import {useLastCategoryStore} from "@/stores/store";
import Footer from "@/components/footer/Footer.vue";

const route = useRoute();
const categoryId = computed(() => Number(route.query.id));

const lastCategoryStore = useLastCategoryStore();
const category = computed<MCategory | null>(() => lastCategoryStore.category);
const products = computed<MProduct[]>(() => lastCategoryStore.products);

onMounted(() => {
  if (!category.value || products.value.length === 0 || category.value?.id != categoryId.value) {
    lastCategoryStore.reset();

    fetchCategory(categoryId.value).then((category) => {
      lastCategoryStore.setCategory(category);
    });
    fetchProducts(categoryId.value).then((data) => {
      lastCategoryStore.setProducts(data);
    })
  }
  window.scrollTo({top: 0, behavior: 'smooth'});
})
</script>

<template>
  <div class="view-flex">
    <div class="CategoryView__Column">
      <Gallery
        v-if="category"
        class="CategoryView__Gallery"
        :autoplay="category?.images?.length > 1 ? 3000 : 0"
        :images="category?.images"/>
      <Title light class="CategoryView__Title">
        {{ category?.name ?? '' }}
      </Title>
      <div class="CategoryView__CategoryList">
        <ProductCard
          v-for="product in products"
          :category-id="categoryId"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>

    <Footer/>
  </div>
</template>

<style>
.CategoryView__Column {
  width: 956px;
}

.CategoryView__Gallery .carousel_slide {
  width: 956px;
  height: 467px;
}

.CategoryView__Gallery .Gallery__item-container {
  width: 100%;
  height: 467px;
}

.CategoryView__Title {
  text-transform: uppercase;
  margin: 15px 0;
}

.CategoryView__CategoryList {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: start;
  width: 956px;;
  gap: 15px;
}
</style>
