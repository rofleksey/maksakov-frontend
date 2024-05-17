<script lang="ts" setup>

import {type CartItem, useCartStore} from "~/stores/cart-store";

const cartStore = useCartStore();

interface Props {
  item: CartItem;
}

const props = defineProps<Props>();

function decreaseCount() {
  if (props.item.count === 1) {
    return;
  }
  cartStore.setCount(props.item.product.id, props.item.count - 1);
}

function increaseCount() {
  cartStore.setCount(props.item.product.id, props.item.count + 1);
}
</script>

<template>
  <div class="CartCounter no-select">
    <span
        :class="{
        CartCounter__button: true,
        CartCounter__minus: true,
        active: props.item.count > 1,
      }"
        @click="decreaseCount"
    >
      -
    </span>
    <span class="CartCounter__count">
      {{ item.count }}
    </span>
    <span
        class="CartCounter__button CartCounter__plus active"
        @click="increaseCount"
    >
      +
    </span>
  </div>
</template>

<style scoped>
.CartCounter {
  position: relative;
  border: 1px solid var(--color-secondary);
  padding: 2px;
  width: 55px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 28px;
  font-size: 12px;
  font: var(--font-din-next);
  text-align: center;
  vertical-align: middle;
}

.CartCounter__button {
  position: absolute;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

.CartCounter__minus {
  left: 3px;
}

.CartCounter__plus {
  right: 3px;
}

.CartCounter__button.active {
  opacity: 1;
  cursor: pointer;
}

.CartCounter__button.active:hover {
  font-weight: bold;
}

.CartCounter__button,
.CartCounter__count {
  padding: 0 5px;
  display: inline-block;
}

.CartCounter__count {
  position: relative;
  top: 1px;
  font-size: 12px;
}
</style>
