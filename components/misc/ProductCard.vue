<script lang="ts" setup>
import Separator from "@/components/misc/SeparatorLine.vue";
import {computed, ref} from "vue";
import LazyImage from "~/components/misc/LazyImage.vue";

interface Props {
  product: MProduct;
  categoryId: number;
}

const props = defineProps<Props>();

const curIndex = ref(0);

const priceStr = computed(() => formatPrice(props.product.price));
</script>

<template>
  <RouterLink :to="`/product?productId=${props.product.id}&categoryId=${props.categoryId}`">
    <div class="ProductCard no-select"
         @mouseleave="curIndex = 0"
         @mouseover="curIndex = 1"
    >
      <div v-if="props.product.ribbon" class="ProductCard__Ribbon">
        {{ props.product.ribbon }}
      </div>
      <div class="ProductCard__img-container">
        <LazyImage
            v-if="props.product.previewImages.length === 1"
            :alt="props.product.name"
            :class="{ active: curIndex === 0 }"
            :src="
              props.product.previewImages[0].medium ??
              props.product.previewImages[0].original
            "
            aspect-ratio="3/2"
            class="image"
            eager
            height="204px"
            width="306px"
        />
        <div>
          <LazyImage
              :alt="props.product.name"
              :class="{show: curIndex === 0}"
              :src="
                props.product.previewImages[0].medium ??
                props.product.previewImages[0].original
              "
              aspect-ratio="3/2"
              class="image"
              eager
              height="204px"
              width="306px"
          />
          <LazyImage
              :alt="props.product.name"
              :class="{show: curIndex === 1, active: curIndex === 1}"
              :src="
                props.product.previewImages[1].medium ??
                props.product.previewImages[1].original
              "
              aspect-ratio="3/2"
              class="image"
              eager
              height="204px"
              width="306px"
          />
        </div>
      </div>
      <div class="ProductCard__name">{{ props.product.name }}</div>
      <Separator class="ProductCard__Separator"/>
      <div class="ProductCard__price">{{ priceStr }}</div>
    </div>
  </RouterLink>
</template>

<style lang="sass" scoped>
.ProductCard
  font: var(--font-din-next)
  @apply relative cursor-pointer flex flex-col justify-center items-center text-[color:var(--color-secondary)] text-center text-base
  transition: background-color 0.25s ease 0s, letter-spacing 0.4s ease 0s

.ProductCard__img-container
  @apply relative overflow-hidden w-[306px] h-[204px]

  .image
    @apply absolute w-[306px] h-[204px] object-cover object-[50%_50%] inset-0 opacity-0
    transition: opacity 333ms ease, filter 333ms ease

    &.show
      @apply opacity-100

    &.active
      @apply brightness-[130%]

.ProductCard__name
  @apply mt-4

.ProductCard__Separator
  @apply w-5 mx-0 my-2

.ProductCard__Ribbon
  font: var(--font-din-next)
  @apply absolute z-[1] bg-[#9e7076] text-[white] px-3 py-0.5 left-px top-px

.ProductCard-enter-active, .ProductCard-leave-active
  transition: opacity 1s ease

.ProductCard-enter-from
  @apply opacity-0

.ProductCard-enter-to, .ProductCard-leave-from
  @apply opacity-100

.ProductCard-leave-to
  @apply opacity-0
</style>
