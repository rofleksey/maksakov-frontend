<script setup lang="ts">
import Separator from "@/components/misc/SeparatorLine.vue";
import type {MProduct} from "@/lib/api_types";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {formatPrice} from "@/lib/misc";

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
            @mouseover="curIndex = 1"
            @mouseleave="curIndex = 0"
            @click="
      router.push(
        `/product?productId=${props.product.id}&categoryId=${props.categoryId}`
      )
    "
    >
        <div class="ProductCard__Ribbon" v-if="props.product.ribbon">
            {{ props.product.ribbon }}
        </div>
        <div class="ProductCard__img-container">
            <img
                    :class="{ active: curIndex === 1 }"
                    v-if="props.product.previewImages.length === 1"
                    :src="
          props.product.previewImages[0].medium ??
          props.product.previewImages[0].original
        "
                    :alt="props.product.name"
            />
            <Transition name="ProductCard" tag="div" v-else>
                <img
                        v-if="curIndex === 0"
                        :src="
            props.product.previewImages[0].medium ??
            props.product.previewImages[0].original
          "
                        :alt="props.product.name"
                />
                <img
                        v-else
                        class="active"
                        :src="
            props.product.previewImages[1].medium ??
            props.product.previewImages[1].original
          "
                        :alt="props.product.name"
                />
      </Transition>
    </div>
    <div class="ProductCard__name">{{ props.product.name }}</div>
        <Separator class="ProductCard__Separator"/>
    <div class="ProductCard__price">{{ priceStr }}</div>
  </div>
</template>

<style scoped>
.ProductCard {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font: var(--font-din-next);
  color: var(--color-secondary);
  transition: background-color 0.25s ease 0s, letter-spacing 0.4s ease 0s;
  text-align: center;
  font-size: 16px;
}

.ProductCard__img-container {
  position: relative;
  overflow: hidden;
  width: 306px;
  height: 204px;
}

.ProductCard__img-container img {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 306px;
  height: 204px;
  object-fit: cover;
  object-position: 50% 50%;
  transition: opacity 250ms ease, filter 250ms ease;
}

.ProductCard__img-container img.active {
  filter: brightness(130%);
}

.ProductCard__name {
  margin-top: 16px;
}

.ProductCard__Separator {
  width: 20px;
  margin: 8px 0;
}

.ProductCard__Ribbon {
    position: absolute;
    left: 1px;
    top: 1px;
    z-index: 1;
    background-color: #9e7076;
    padding: 2px 12px;
    font: var(--font-din-next);
    color: white;
}

.ProductCard-enter-active,
.ProductCard-leave-active {
}

.ProductCard-enter-from {
  opacity: 0;
}

.ProductCard-enter-to {
  opacity: 1;
}

.ProductCard-leave-from {
  opacity: 1;
}

.ProductCard-leave-to {
  opacity: 0;
}
</style>
