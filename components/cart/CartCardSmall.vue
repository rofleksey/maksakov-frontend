<script lang="ts" setup>
import {computed} from "vue";
import {useRouter} from "vue-router";
import CartCounter from "@/components/cart/CartCounter.vue";
import IconClose from "@/components/icons/IconClose.vue";
import {type CartItem, useCartStore} from "~/stores/cart-store";

const router = useRouter();
const cartStore = useCartStore();

interface Props {
  item: CartItem;
}

const props = defineProps<Props>();

const priceStr = computed(() => formatPrice(props.item.product.price));

function gotoItemPage() {
  router.push({
    path: '/product',
    query: {
      productId: props.item.product.id,
      categoryId: props.item.categoryId
    }
  });
  cartStore.close();
}
</script>

<template>
  <div class="CartCardSmall no-select">
    <div class="CartCardSmall__ImgContainer" @click="gotoItemPage">
      <img
          :alt="`${props.item.product.name} image`"
          :src="
          props.item.product.previewImages[0].small ??
          props.item.product.previewImages[0].original
        "
      />
    </div>
    <div class="CartCardSmall__Info">
      <div class="CartCardSmall__name">
        {{ props.item.product.name }}
      </div>
      <div class="CartCardSmall__price">
        {{ priceStr }}
      </div>
      <CartCounter :item="props.item" class="CartCardSmall__counter"/>
    </div>
    <IconClose
        class="CartCardSmall__CloseButton"
        @click="cartStore.remove(props.item.product.id)"
    />
  </div>
</template>

<style lang="sass" scoped>
.CartCardSmall
  padding-bottom: 30px
  margin-bottom: 30px
  border-bottom: 1px solid #d3d3d3
  position: relative
  display: flex
  flex-direction: row

.CartCardSmall__Info
  width: 170px

.CartCardSmall__ImgContainer
  width: 80px
  height: 80px
  margin-right: 10px
  cursor: pointer

  img
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center
    background: transparent

.CartCardSmall__name
  color: var(--color-secondary)
  font-size: 16px
  font-weight: lighter
  line-height: 1.5em
  width: 90%
  word-break: break-word

.CartCardSmall__price
  font-weight: 600

.CartCardSmall__CloseButton
  cursor: pointer
  position: absolute
  text-align: center
  transition: opacity 0.2s ease
  opacity: 0.4
  top: -10px
  right: 0
  padding: 6px
  width: 24px
  height: 24px

.CartCardSmall:hover .CartCardSmall__CloseButton
  opacity: 1

.CartCardSmall__counter
  margin-top: 8px

</style>
