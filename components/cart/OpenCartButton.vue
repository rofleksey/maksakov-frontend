<script lang="ts" setup>
import {useRouter} from "vue-router";
import {useCartStore} from "~/stores/cart-store";

const router = useRouter();
const cartStore = useCartStore();

function onClick() {
  router.push("/cart");
  cartStore.close();
}
</script>

<template>
  <button class="OpenCartButton" @click="onClick">
    <span>Смотреть корзину</span>
  </button>
</template>

<style lang="sass" scoped>
.OpenCartButton
  font: var(--font-din-next)
  @apply text-sm text-[white] bg-[#9e7076] cursor-pointer w-full px-4 py-2
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-radius 0.3s ease

  &:hover
    @apply bg-[rgba(158,112,118,0.7)] text-[rgba(255,255,255,0.7)] rounded-[5px]

.AddToCartButton span
  line-height: 1.5

</style>
