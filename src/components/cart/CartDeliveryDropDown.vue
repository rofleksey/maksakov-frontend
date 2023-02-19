<script setup lang="ts">
import {useCartStore} from "@/stores/store";
import {computed, ref} from "vue";
import {formatPrice} from "@/lib/misc";
import IconDropDown from "@/components/icons/IconDropDown.vue";
import {DeliveryType} from "@/lib/api";

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

const deliveryTextMap = computed<{ [t: string]: DeliveryItem }>(() => ({
  [DeliveryType.MAIL]: {
    key: DeliveryType.MAIL,
    text: `Доставка почтой России - ${deliveryPriceStr.value}`,
    subtext: "точная стоимость зависит от веса посылки",
  },
  [DeliveryType.COURIER]: {
    key: DeliveryType.COURIER,
    text: `Курьерская доставка по Санкт-Петербургу - ${deliveryPriceStr.value}`,
    subtext: null,
  },
  [DeliveryType.PICKUP]: {
    key: DeliveryType.PICKUP,
    text: `Самовывоз (Для жителей Санкт-Петербурга) - ${deliveryPriceStr.value}`,
    subtext: null,
  }
}))

const curText = computed(() => deliveryTextMap.value[deliveryType.value].text)
</script>

<template>
  <div class="CartDeliveryDropDown no-select" v-click-outside="() => popupOpened = false"
       @click="popupOpened = !popupOpened">
    <div class="CartDeliveryDropDown__Container">
      <span class="CartDeliveryDropDown__CurText">
        {{ curText }}
      </span>
      <span class="CartDeliveryDropDown__DropDown">
        <IconDropDown :class="{CartDeliveryDropDown__DropDown__Icon: true, opened: popupOpened}"/>
      </span>
    </div>
    <div class="CartDeliveryDropDown__PopupMenu" v-if="popupOpened">
      <div
        :class="{CartDeliveryDropDown__PopupMenu__Item: true, selected: item.key === deliveryType}"
        v-for="item in Object.values(deliveryTextMap)"
        :key="item.key"
        @click="cartStore.setDeliveryType(item.key)"
      >
        <div>{{ item.text }}</div>
        <div v-if="item.subtext" class="subtext">{{ item.subtext }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.CartDeliveryDropDown {
  position: relative;
  width: 100%;
  border: 1px solid rgba(48, 49, 50, 0.6);
  color: var(--color-secondary);
  font: var(--font-din-next);
  font-size: 16px;
  box-sizing: content-box;
  cursor: pointer;
}

.CartDeliveryDropDown__Container {
  display: flex;
  align-items: center;
  padding: 11px 16px;
  height: 42px;
  box-sizing: border-box;
}

.CartDeliveryDropDown__CurText {
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
}

.CartDeliveryDropDown__DropDown {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.CartDeliveryDropDown__DropDown__Icon {
  transition: transform 0.15s ease;
}

.CartDeliveryDropDown__DropDown__Icon.opened {
  transform: scaleY(-1);
}

.CartDeliveryDropDown__PopupMenu {
  position: absolute;
  padding: 12px 0;
  width: 100%;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
}

.CartDeliveryDropDown__PopupMenu__Item {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 12px;
  background-color: white;
  transition: background-color 0.15s ease;
  box-sizing: border-box;
}

.CartDeliveryDropDown__PopupMenu__Item:hover {
  background-color: rgba(48, 49, 50, 0.06);
}

.CartDeliveryDropDown__PopupMenu__Item.selected {
  background-color: rgba(48, 49, 50, 0.12);
}

.CartDeliveryDropDown__PopupMenu__Item.selected:hover {
  background-color: rgba(48, 49, 50, 0.24);
}

.CartDeliveryDropDown__PopupMenu__Item .subtext {
  opacity: 0.7;
  font-size: 14px;
}
</style>
