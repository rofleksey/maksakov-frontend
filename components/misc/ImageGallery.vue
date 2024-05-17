<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import VueEasyLightbox from "vue-easy-lightbox";
import {computed, ref} from "vue";

interface Props {
  images: MImage[];
  autoplay?: number;
  transition?: number;
  zoom?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: undefined,
  transition: undefined,
  zoom: false,
});

const zoomVisible = ref(false);
const zoomIndex = ref(0);

const imageOriginals = computed(() => props.images.map((img) => img.original));

function onZoomHide() {
  zoomVisible.value = false;
}

function onImageClick(index: number) {
  if (props.zoom) {
    zoomVisible.value = true;
    zoomIndex.value = index;
  }
}
</script>

<template>
  <div>
    <Carousel
        v-if="props.images.length > 0"
        :autoplay="props.autoplay"
        :mouseDrag="false"
        :touchDrag="true"
        :transition="props.transition"
        class="Gallery__Carousel"
        wrapAround
    >
      <Slide v-for="(image, index) in props.images" :key="image.id">
        <div
            :class="{ 'Gallery__item-container': true, zoom: props.zoom }"
            @click="onImageClick(index)"
        >
          <img :alt="`${image.id}`" :src="image.original"/>
        </div>
      </Slide>

      <template #addons>
        <Navigation/>
        <Pagination/>
      </template>
    </Carousel>

    <vue-easy-lightbox
        :imgs="imageOriginals"
        :index="zoomIndex"
        :visible="zoomVisible"
        @hide="onZoomHide"
    >
    </vue-easy-lightbox>
  </div>
</template>

<style lang="sass">
/* not scoped to set fill to white */
.Gallery__Carousel .carousel__prev path,
.Gallery__Carousel .carousel__next path
  @apply fill-white

.Gallery__item-container
  @apply overflow-hidden flex justify-center items-center

.Gallery__item-container.zoom
  @apply cursor-zoom-in

.Gallery__item-container img
  @apply h-auto w-full

</style>
