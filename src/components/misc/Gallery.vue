<script setup lang="ts">
import {Carousel, Navigation, Pagination, Slide} from 'vue3-carousel';
import type {MImage} from "@/lib/api";

interface Props {
  images: MImage[];
  autoplay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: undefined,
});
</script>

<template>
  <Carousel
    v-if="props.images.length > 0"
    class="Gallery__Carousel"
    :autoplay="props.autoplay"
    wrapAround
  >
    <Slide v-for="image in props.images" :key="image.id">
      <div class="Gallery__item-container">
        <img :alt="`${image.id}`" :src="image.original"/>
      </div>
    </Slide>

    <template #addons>
      <Navigation/>
      <Pagination/>
    </template>
  </Carousel>
</template>

<style>
/* not scoped to set fill to white */
.Gallery__Carousel .carousel__prev path,
.Gallery__Carousel .carousel__next path {
  fill: #9E7076;
}

.Gallery__item-container {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Gallery__item-container img {
  height: auto;
  width: 100%;
}
</style>
