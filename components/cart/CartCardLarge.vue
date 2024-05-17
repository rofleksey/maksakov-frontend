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
const totalPriceStr = computed(() =>
    formatPrice(props.item.product.price * props.item.count)
);

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
  <div class="CartCardLarge">
    <div class="CartCardLarge__ImgContainer" @click="gotoItemPage">
      <img
          :alt="`${props.item.product.name} image`"
          :src="
          props.item.product.previewImages[0].medium ??
          props.item.product.previewImages[0].original
        "
      />
    </div>
    <div class="CartCardLarge__Info">
      <div class="CartCardLarge__Name">
        {{ props.item.product.name }}
      </div>
      <div class="CartCardLarge__Price">
        {{ priceStr }}
      </div>
    </div>
    <div class="CartCardLarge__TotalPriceContainer">
      <CartCounter :item="props.item"/>
      <div class="CartCardLarge__TotalPrice">
        {{ totalPriceStr }}
      </div>
    </div>
    <div
        class="CartCardLarge__CloseButton"
        @click="cartStore.remove(props.item.product.id)"
    >
      <IconClose/>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.CartCardLarge
  position: relative
  padding: 32px 0
  display: flex
  flex-direction: row
  flex-wrap: wrap
  justify-content: space-between
  font: var(--font-din-next)
  border-bottom: 1px solid rgba(48, 49, 50, 0.2)

.CartCardLarge__ImgContainer
  width: 100px
  height: 66px
  cursor: pointer

  img
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center
    background: transparent

.CartCardLarge__Info
  width: 254px
  margin-left: 10px

.CartCardLarge__Name
  font-size: 16px
  line-height: 24px

.CartCardLarge__Price
  font-size: 14px
  line-height: 20px
  margin-top: 10px

.CartCardLarge__TotalPriceContainer
  display: flex
  flex-direction: row
  margin: 5px

.CartCardLarge__TotalPrice
  font-size: 16px
  margin-top: 4px
  width: 100px
  text-align: center

.CartCardLarge__CloseButton
  position: absolute
  top: 5px
  right: 5px
  display: flex
  align-items: center
  justify-content: center
  width: 12px
  height: 12px
  cursor: pointer
  padding: 12px
  opacity: 0.5
  transition: opacity 0.15s ease

  &:hover
    opacity: 1

</style>
