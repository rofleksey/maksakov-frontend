<script setup lang="ts">
import {useCartStore} from "@/stores/store";
import {computed} from "vue";
import IconNext from "@/components/icons/IconNext.vue";
import CartCardSmall from "@/components/cart/CartCardSmall.vue";
import OpenCartButton from "@/components/cart/OpenCartButton.vue";
import {formatPrice} from "@/lib/misc";

const cartStore = useCartStore();
const cart = computed(() => cartStore.cart);
const isOpen = computed(() => cartStore.isOpen);

const totalPrice = computed(() => formatPrice(cart.value.reduce((sum, item) => sum + item.product.price * item.count, 0)))
</script>

<template>
  <Transition name="CartPopup">
    <div class="CartPopup" v-if="isOpen">
      <div class="CartPopup__curtain" @click="cartStore.close"></div>
      <div class="CartPopup__body">
        <div class="CartPopup__header">
          <IconNext class="CartPopup__CloseButton" @click="cartStore.close"/>
          <span class="CartPopup__header__text">Корзина</span>
        </div>
        <div class="CartPopup__items" v-if="cart.length > 0">
          <TransitionGroup name="CartItemSmall">
            <CartCardSmall
              v-for="item in cart"
              :item="item"
              :key="item.product.id"/>
          </TransitionGroup>
        </div>
        <section class="CartPopup__PriceSection" v-if="cart.length > 0">
          <div class="CartPopup__PriceHeader">
            Сумма
          </div>
          <div class="CartPopup__PriceValue">
            {{ totalPrice }}
          </div>
        </section>
        <div class="CartCard__Submit" v-if="cart.length > 0">
          <OpenCartButton class="CartCard__Submit__Button"/>
        </div>
        <div class="CartCard__Empty" v-if="cart.length === 0">
          Корзина пуста
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.CartPopup {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  font: var(--font-din-next);
}

.CartPopup__curtain {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.2;
}

.CartPopup__body {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 350px;
  display: flex;
  flex-direction: column;
  background: white;
}

.CartPopup__header {
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

.CartPopup__header__text {
  font-size: 23px;
  font-weight: lighter;
  line-height: 28px;
  text-align: center;
}

.CartPopup__CloseButton {
  cursor: pointer;
  position: absolute;
  left: 31px;
  width: 20px;
  height: 20px;
}

.CartPopup__items {
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

.CartPopup__items::-webkit-scrollbar {
  width: 0 !important;
}

.CartPopup__PriceSection {
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
  border-top: 1px solid #D3D3D3;
}

.CartCard__Empty {
  text-align: center;
  padding: 34px;
  font-size: 18px;
  line-height: 29px;
}

.CartPopup-enter-active,
.CartPopup-leave-active {
  transition: opacity 0.4s ease;
}

.CartPopup-enter-active .CartPopup__body,
.CartPopup-leave-active .CartPopup__body {
  transition: right 0.4s ease;
}

.CartPopup-enter-active .CartPopup__CloseButton,
.CartPopup-leave-active .CartPopup__CloseButton {
  transition: transform 0.4s ease;
}

.CartPopup-enter-from .CartPopup__body {
  right: -350px;
}

.CartPopup-enter-from .CartPopup__CloseButton {
  transform: rotate(-180deg);
}

.CartPopup-enter-from {
  opacity: 0;
}

.CartPopup-enter-to {
  opacity: 1;
}

.CartPopup-leave-from {
  opacity: 1;
}

.CartPopup-leave-to {
  opacity: 0;
}

.CartPopup-leave-to .CartPopup__body {
  right: -350px;
}

.CartPopup-leave-to .CartPopup__CloseButton {
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
