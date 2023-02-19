import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {MCategory, MMisc, MProduct} from "@/lib/api";
import {DeliveryType} from "@/lib/api";

export interface CartItem {
  product: MProduct;
  categoryId: number;
  count: number;
}

export const useMiscStore = defineStore('misc', () => {
  const misc = ref<MMisc | null>(null);

  function setMisc(data: MMisc) {
    misc.value = data;
  }

  return {misc, setMisc}
})

export const useCatalogStore = defineStore('catalog', () => {
  const categories = ref<MCategory[]>([]);

  function setCategories(data: MCategory[]) {
    categories.value = data;
  }

  return {categories, setCategories}
})

export const useLastCategoryStore = defineStore('last_category', () => {
  const category = ref<MCategory | null>(null);
  const products = ref<MProduct[]>([]);

  function setCategory(data: MCategory) {
    category.value = data;
  }

  function setProducts(data: MProduct[]) {
    products.value = data;
  }

  function reset() {
    category.value = null
    products.value = [];
  }

  return {category, products, setCategory, setProducts, reset}
})

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>([]);
  const isOpen = ref(false);
  const deliveryType = ref<DeliveryType>(DeliveryType.COURIER);
  const notes = ref("");

  function add(product: MProduct, categoryId: number) {
    const item = cart.value.find((it) => it.product.id === product.id);
    if (!item) {
      cart.value.push({
        product,
        categoryId: categoryId,
        count: 1
      });
    } else {
      item.count++;
    }
  }

  function remove(id: number) {
    const index = cart.value.findIndex((it) => it.product.id === id);
    cart.value.splice(index, 1);
  }

  function setCount(id: number, newCount: number) {
    const item = cart.value.find((it) => it.product.id === id);
    if (item) {
      item.count = newCount;
    }
  }

  function setNotes(curNotes: string) {
    notes.value = curNotes;
  }

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function setDeliveryType(delivery: DeliveryType) {
    deliveryType.value = delivery;
  }

  return {cart, isOpen, deliveryType, notes, add, remove, setCount, open, close, setDeliveryType, setNotes}
})
