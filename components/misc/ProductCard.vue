<script lang="ts" setup>
import Separator from "@/components/misc/SeparatorLine.vue";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

interface Props {
  product: MProduct;
  categoryId: number;
}

const props = defineProps<Props>();

const curIndex = ref(0);

const priceStr = computed(() => formatPrice(props.product.price));
</script>

<template>
  <div
      class="ProductCard no-select"
      @click="
      router.push(
        `/product?productId=${props.product.id}&categoryId=${props.categoryId}`
      )
    "
      @mouseleave="curIndex = 0"
      @mouseover="curIndex = 1"
  >
    <div v-if="props.product.ribbon" class="ProductCard__Ribbon">
      {{ props.product.ribbon }}
    </div>
    <div class="ProductCard__img-container">
      <img
          v-if="props.product.previewImages.length === 1"
          :alt="props.product.name"
          :class="{ active: curIndex === 1 }"
          :src="
          props.product.previewImages[0].medium ??
          props.product.previewImages[0].original
        "
      />
      <Transition v-else name="ProductCard" tag="div">
        <img
            v-if="curIndex === 0"
            :alt="props.product.name"
            :src="
            props.product.previewImages[0].medium ??
            props.product.previewImages[0].original
          "
        />
        <img
            v-else
            :alt="props.product.name"
            :src="
            props.product.previewImages[1].medium ??
            props.product.previewImages[1].original
          "
            class="active"
        />
      </Transition>
    </div>
    <div class="ProductCard__name">{{ props.product.name }}</div>
    <Separator class="ProductCard__Separator"/>
    <div class="ProductCard__price">{{ priceStr }}</div>
  </div>
</template>

<style lang="sass" scoped>
.ProductCard
  font: var(--font-din-next)
  @apply relative cursor-pointer flex flex-col justify-center items-center text-[color:var(--color-secondary)] text-center text-base
  transition: background-color 0.25s ease 0s, letter-spacing 0.4s ease 0s

.ProductCard__img-container
  @apply relative overflow-hidden w-[306px] h-[204px]

  img
    @apply absolute w-[306px] h-[204px] object-cover object-[50%_50%] inset-0
    transition: opacity 250ms ease, filter 250ms ease

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
