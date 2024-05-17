import {DeliveryType} from "~/utils/api_types";
import {fetchProductEager} from "~/utils/api";

const CART_VERSION = "v1";
const CART_KEY = "maksakov_cart";

export interface CartItem {
  product: MProduct;
  categoryId: number;
  count: number;
}

interface SerializedCartItem {
  productId: number;
  categoryId: number;
  count: number;
}

interface SerializedCart {
  name: string;
  email: string;
  phone: string;
  notes: string;
  version: string;
  deliveryType: DeliveryType;
  items: SerializedCartItem[];
}

export const useCartStore = defineStore("cart", () => {
  const cart = useState<CartItem[]>('cartStoreCart', () => []);
  const isOpen = useState('cartStoreIsOpen', () => false);
  const deliveryType = useState<DeliveryType>('cartStoreDeliveryType', () => DeliveryType.COURIER);
  const notes = useState('cartStoreNotes', () => "");
  const name = useState('cartStoreName', () => "");
  const phone = useState('cartStorePhone', () => "");
  const email = useState('cartStoreEmail', () => "");

  function add(product: MProduct, categoryId: number) {
    const item = cart.value.find((it) => it.product.id === product.id);
    if (!item) {
      cart.value.push({
        product,
        categoryId: categoryId,
        count: 1,
      });
    } else {
      item.count++;
    }
    saveCart();
  }

  function remove(id: number) {
    const index = cart.value.findIndex((it) => it.product.id === id);
    cart.value.splice(index, 1);
    saveCart();
  }

  function setCount(id: number, newCount: number) {
    const item = cart.value.find((it) => it.product.id === id);
    if (item) {
      item.count = newCount;
      saveCart();
    }
  }

  function setNotes(curNotes: string) {
    notes.value = curNotes;
    saveCart();
  }

  function setName(curName: string) {
    name.value = curName;
    saveCart();
  }

  function setPhone(curPhone: string) {
    phone.value = curPhone;
    saveCart();
  }

  function setEmail(curEmail: string) {
    email.value = curEmail;
    saveCart();
  }

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function setDeliveryType(delivery: DeliveryType) {
    deliveryType.value = delivery;
    saveCart();
  }

  function saveCart() {
    const serializedCart: SerializedCart = {
      notes: notes.value,
      name: name.value,
      phone: phone.value,
      email: email.value,
      deliveryType: deliveryType.value,
      version: CART_VERSION,
      items: cart.value.map((item) => ({
        productId: item.product.id,
        categoryId: item.categoryId,
        count: item.count,
      })),
    };
    localStorage.setItem(CART_KEY, JSON.stringify(serializedCart));
  }

  async function restoreCart() {
    if (cart.value.length !== 0) {
      return;
    }
    const serializedCartStr = localStorage.getItem(CART_KEY);
    if (!serializedCartStr) {
      return;
    }
    const serializedCart: SerializedCart = JSON.parse(serializedCartStr);
    if (serializedCart.version !== CART_VERSION) {
      saveCart();
      return;
    }
    name.value = serializedCart.name;
    email.value = serializedCart.email;
    phone.value = serializedCart.phone;
    notes.value = serializedCart.notes;
    deliveryType.value = serializedCart.deliveryType;
    cart.value = await Promise.all(
      serializedCart.items.map(async (serializedItem) => {
        const remoteItem = await fetchProductEager(serializedItem.productId);
        return {
          product: remoteItem,
          categoryId: serializedItem.categoryId,
          count: serializedItem.count,
        };
      })
    );
  }

  return {
    cart,
    isOpen,
    deliveryType,
    notes,
    name,
    phone,
    email,
    add,
    remove,
    setCount,
    open,
    close,
    setDeliveryType,
    setNotes,
    setName,
    setPhone,
    setEmail,
    restoreCart,
  };
});
