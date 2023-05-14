<script setup lang="ts">
import { useCartStore } from "@/stores/store";
import { computed } from "vue";
import IconNext from "@/components/icons/IconNext.vue";
import CartCardSmall from "@/components/cart/CartCardSmall.vue";
import OpenCartButton from "@/components/cart/OpenCartButton.vue";
import { formatPrice } from "@/lib/misc";

const cartStore = useCartStore();
const cart = computed(() => cartStore.cart);
const isOpen = computed(() => cartStore.isOpen);

const totalPrice = computed(() =>
  formatPrice(
    cart.value.reduce((sum, item) => sum + item.product.price * item.count, 0)
  )
);
</script>

<template>
  <Transition name="CartDrawer">
    <div class="CartDrawer" v-if="isOpen">
      <div class="CartDrawer__curtain" @click="cartStore.close"></div>
      <div class="CartDrawer__body">
        <div class="CartDrawer__header">
          <IconNext class="CartDrawer__CloseButton" @click="cartStore.close" />
          <span class="CartDrawer__header__text">Корзина</span>
        </div>
        <div class="CartDrawer__items" v-if="cart.length > 0">
          <TransitionGroup name="CartItemSmall">
            <CartCardSmall
              v-for="item in cart"
              :item="item"
              :key="item.product.id"
            />
          </TransitionGroup>
        </div>
        <section class="CartDrawer__PriceSection" v-if="cart.length > 0">
          <div class="CartDrawer__PriceHeader">Сумма</div>
          <div class="CartDrawer__PriceValue">
            {{ totalPrice }}
          </div>
        </section>
        <div class="CartCard__Submit" v-if="cart.length > 0">
          <OpenCartButton class="CartCard__Submit__Button" />
        </div>
        <div class="CartCard__Empty" v-if="cart.length === 0">
          Корзина пуста
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.CartDrawer {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  font: var(--font-din-next);
}

.CartDrawer__curtain {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.2;
}

.CartDrawer__body {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 350px;
  display: flex;
  flex-direction: column;
  background: white;
}

.CartDrawer__header {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  color: white;
  background: var(--color-secondary);
}

.CartDrawer__header__text {
  font-size: 23px;
  font-weight: lighter;
  line-height: 28px;
  text-align: center;
}

.CartDrawer__CloseButton {
  cursor: pointer;
  position: absolute;
  left: 31px;
  width: 20px;
  height: 20px;
}

.CartDrawer__items {
  box-sizing: border-box;
  padding: 34px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.CartDrawer__items::-webkit-scrollbar {
  width: 0 !important;
}

.CartDrawer__PriceSection {
  font-size: 26px;
  padding: 20px 34px 34px 34px;
  line-height: 1.5;
}

.CartCard__Submit {
  height: 114px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 34px;
  border-top: 1px solid #d3d3d3;
}

.CartCard__Empty {
  text-align: center;
  padding: 34px;
  font-size: 18px;
  line-height: 29px;
}

.CartDrawer-enter-active,
.CartDrawer-leave-active {
  transition: opacity 0.4s ease;
}

.CartDrawer-enter-active .CartDrawer__body,
.CartDrawer-leave-active .CartDrawer__body {
  transition: right 0.4s ease;
}

.CartDrawer-enter-active .CartDrawer__CloseButton,
.CartDrawer-leave-active .CartDrawer__CloseButton {
  transition: transform 0.4s ease;
}

.CartDrawer-enter-from .CartDrawer__body {
  right: -350px;
}

.CartDrawer-enter-from .CartDrawer__CloseButton {
  transform: rotate(-180deg);
}

.CartDrawer-enter-from {
  opacity: 0;
}

.CartDrawer-enter-to {
  opacity: 1;
}

.CartDrawer-leave-from {
  opacity: 1;
}

.CartDrawer-leave-to {
  opacity: 0;
}

.CartDrawer-leave-to .CartDrawer__body {
  right: -350px;
}

.CartDrawer-leave-to .CartDrawer__CloseButton {
  transform: rotate(-180deg);
}

/* CartItem */
.CartItemSmall-enter-active,
.CartItemSmall-leave-active {
  transition: opacity 0.4s ease;
}

.CartItemSmall-enter-from {
  opacity: 0;
}

.CartItemSmall-enter-to {
  opacity: 1;
}

.CartItemSmall-leave-from {
  opacity: 1;
}

.CartItemSmall-leave-to {
  opacity: 0;
}
</style>
