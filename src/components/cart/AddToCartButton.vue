<script setup lang="ts">
import {useCartStore} from "@/stores/store";
import type {MProduct} from "@/lib/api";

interface Props {
  product: MProduct;
  categoryId: number;
}

const props = defineProps<Props>();

const cartStore = useCartStore();

function onClick() {
  cartStore.add(props.product, props.categoryId);
  cartStore.open();
}
</script>

<template>
  <button class="AddToCartButton" @click="onClick">
    <span>Добавить в корзину</span>
  </button>
</template>

<style scoped>
.AddToCartButton {
  font: var(--font-din-next);
  font-size: 16px;
  color: white;
  background-color: var(--color-secondary);
  border-radius: 5px;
  cursor: pointer;
  padding: 8px 16px;
  width: 100%;
  transition: background-color .2s ease-in-out, color .2s ease-in-out;
}

.AddToCartButton:hover {
  background-color: rgba(48, 49, 50, 0.7);
  color: rgba(255, 255, 255, 0.7);
}

.AddToCartButton span {
  line-height: 1.5;
}
</style>
