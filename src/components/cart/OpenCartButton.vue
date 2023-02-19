<script setup lang="ts">
import {useRouter} from "vue-router";
import {useCartStore} from "@/stores/store";

const router = useRouter();
const cartStore = useCartStore();

function onClick() {
  router.push('/cart');
  cartStore.close();
}
</script>

<template>
  <button class="OpenCartButton" @click="onClick">
    <span>Смотреть корзину</span>
  </button>
</template>

<style scoped>
.OpenCartButton {
  font: var(--font-din-next);
  font-size: 14px;
  color: white;
  background-color: #9E7076;
  cursor: pointer;
  padding: 8px 16px;
  width: 100%;
  transition: background-color .3s ease-in-out, color .3s ease-in-out, border-radius .3s ease;
}

.OpenCartButton:hover {
  background-color: rgba(158, 112, 118, 0.7);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
}

.AddToCartButton span {
  line-height: 1.5;
}
</style>
