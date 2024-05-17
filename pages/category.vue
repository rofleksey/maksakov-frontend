<script lang="ts" setup>
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import Title from "@/components/misc/SiteTitle.vue";
import ProductCard from "@/components/misc/ProductCard.vue";
import Gallery from "@/components/misc/ImageGallery.vue";
import Footer from "@/components/footer/SiteFooter.vue";
import Skeleton from "@/components/misc/Skeleton.vue";

const route = useRoute();
const categoryId = computed(() => Number(route.query.id));

const {data: category} = await useFetchCategory(categoryId.value)
const {data: products} = await useFetchProducts(categoryId.value)

onMounted(() => {
  window.scrollTo({top: 0, behavior: "smooth"});
});
</script>

<template>
  <div class="view-flex">
    <div class="CategoryView__Column">
      <Gallery
          v-if="category"
          :autoplay="category?.images?.length > 1 ? 5000 : 0"
          :images="category?.images ?? []"
          :transition="1000"
          class="CategoryView__Gallery"
      />
      <Title class="CategoryView__Title" light>
        {{ category?.name ?? "" }}
      </Title>
      <div v-if="products?.length" class="CategoryView__CategoryList">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :category-id="categoryId"
            :product="product"
        />
      </div>
      <div v-else class="CategoryView__CategoryList">
        <Skeleton v-for="num in 50" :key="num" height="282px" width="306px"/>
      </div>
    </div>

    <Footer/>
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
