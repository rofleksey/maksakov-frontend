<script lang="ts" setup>
import {computed, ref} from "vue";
import {vOnClickOutside} from '@vueuse/components'
import IconDropDown from "@/components/icons/IconDropDown.vue";
import {DeliveryType} from "~/utils/api_types";
import {useCartStore} from "~/stores/cart-store";

interface Props {
  deliveryPrice: number;
}

interface DeliveryItem {
  key: DeliveryType;
  text: string;
  subtext: string | null;
}

const props = defineProps<Props>();

const cartStore = useCartStore();

const popupOpened = ref(false);
const deliveryType = computed(() => cartStore.deliveryType);
const deliveryPriceStr = computed(() => formatPrice(props.deliveryPrice));
const freePriceStr = formatPrice(0);

const deliveryTextMap = computed<{ [t: string]: DeliveryItem }>(() => ({
  [DeliveryType.MAIL]: {
    key: DeliveryType.MAIL,
    text: `Доставка почтой России - ${deliveryPriceStr.value}`,
    subtext: "точная стоимость зависит от веса посылки",
  },
  [DeliveryType.COURIER]: {
    key: DeliveryType.COURIER,
    text: `Курьерская доставка - ${deliveryPriceStr.value}`,
    subtext: "только по Санкт-Петербургу",
  },
  [DeliveryType.PICKUP]: {
    key: DeliveryType.PICKUP,
    text: `Самовывоз - ${freePriceStr}`,
    subtext: "для жителей Санкт-Петербурга",
  },
}));

const curText = computed(() => deliveryTextMap.value[deliveryType.value].text);
</script>

<template>
  <div
      v-on-click-outside="() => (popupOpened = false)"
      class="CartDeliveryDropDown no-select"
      @click="popupOpened = !popupOpened"
  >
    <div class="CartDeliveryDropDown__Container">
      <span class="CartDeliveryDropDown__CurText">
        {{ curText }}
      </span>
      <span class="CartDeliveryDropDown__DropDown">
        <IconDropDown
            :class="{
            CartDeliveryDropDown__DropDown__Icon: true,
            opened: popupOpened,
          }"
        />
      </span>
    </div>
    <div v-if="popupOpened" class="CartDeliveryDropDown__PopupMenu">
      <div
          v-for="item in Object.values(deliveryTextMap)"
          :key="item.key"
          :class="{
          CartDeliveryDropDown__PopupMenu__Item: true,
          selected: item.key === deliveryType,
        }"
          @click="cartStore.setDeliveryType(item.key)"
      >
        <div>{{ item.text }}</div>
        <div v-if="item.subtext" class="subtext">{{ item.subtext }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.CartDeliveryDropDown
  position: relative
  width: 100%
  border: 1px solid rgba(48, 49, 50, 0.6)
  color: var(--color-secondary)
  font: var(--font-din-next)
  font-size: 16px
  box-sizing: content-box
  cursor: pointer

.CartDeliveryDropDown__Container
  display: flex
  align-items: center
  padding: 11px 16px
  height: 42px
  box-sizing: border-box

.CartDeliveryDropDown__CurText
  flex: 1
  text-overflow: ellipsis
  white-space: nowrap
  display: inline-block
  overflow: hidden

.CartDeliveryDropDown__DropDown
  flex-shrink: 0
  width: 24px
  height: 24px
  display: flex
  justify-content: center
  align-items: center

.CartDeliveryDropDown__DropDown__Icon
  transition: transform 0.15s ease

  &.opened
    transform: scaleY(-1)

.CartDeliveryDropDown__PopupMenu
  position: absolute
  z-index: 1
  padding: 12px 0
  width: 100%
  background-color: white
  border: 1px solid rgba(0, 0, 0, 0.4)
  box-sizing: border-box

.CartDeliveryDropDown__PopupMenu__Item
  display: flex
  flex-direction: column
  width: 100%
  padding: 8px 12px
  background-color: white
  transition: background-color 0.15s ease
  box-sizing: border-box

  &:hover
    background-color: rgba(48, 49, 50, 0.06)

  &.selected
    background-color: rgba(48, 49, 50, 0.12)

    &:hover
      background-color: rgba(48, 49, 50, 0.24)

  .subtext
    opacity: 0.7
    font-size: 14px

</style>
