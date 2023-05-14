<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { CartItem } from "@/stores/store";
import { useCartStore, useMiscStore } from "@/stores/store";
import CartCardLarge from "@/components/cart/CartCardLarge.vue";
import { formatPrice } from "@/lib/misc";
import type { MMisc } from "@/lib/api_types";
import { DeliveryType } from "@/lib/api_types";
import { fetchMisc, sendOrder } from "@/lib/api";
import CartDeliveryDropDown from "@/components/cart/CartDeliveryDropDown.vue";
import CartNotes from "@/components/cart/CartNotes.vue";
import CartSubmit from "@/components/cart/CartSubmit.vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import Footer from "@/components/footer/SiteFooter.vue";
import TextField from "@/components/misc/TextField.vue";

const toast = useToast();
const router = useRouter();

const miscStore = useMiscStore();
const misc = computed<MMisc | null>(() => miscStore.misc);

const cartStore = useCartStore();
const cart = computed<CartItem[]>(() => cartStore.cart);
const notes = computed<string>(() => cartStore.notes);
const clientName = computed<string>(() => cartStore.name);
const clientPhone = computed<string>(() => cartStore.phone);
const clientEmail = computed<string>(() => cartStore.email);
const deliveryType = computed<DeliveryType>(() => cartStore.deliveryType);

const deliveryPrice = computed(() => {
  if (cartStore.deliveryType === DeliveryType.PICKUP) {
    return 0;
  }
  return 500;
});
const deliveryPriceStr = computed(() => formatPrice(deliveryPrice.value));

const itemsPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.product.price * item.count, 0)
);
const itemsPriceStr = computed(() => formatPrice(itemsPrice.value));

const totalPrice = computed(() => itemsPrice.value + deliveryPrice.value);
const totalPriceStr = computed(() => formatPrice(totalPrice.value));

const submitLoading = ref(false);

function onNameInput(e: any) {
  cartStore.setName(e.target.value);
}

function onPhoneInput(e: any) {
  cartStore.setPhone(e.target.value);
}

function onEmailInput(e: any) {
  cartStore.setEmail(e.target.value);
}

watch(cart.value, () => {
  if (cart.value.length === 0) {
    router.back();
  }
});

onMounted(() => {
  if (!misc.value) {
    fetchMisc().then((data) => {
      miscStore.setMisc(data);
    });
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
});

function onSubmit() {
  if (submitLoading.value) {
    return;
  }
  if (clientName.value.trim().length === 0) {
    toast.error("Пожалуйста, укажите свое имя!", {
      timeout: 5000,
    });
    return;
  }
  if (clientPhone.value.trim().length === 0) {
    toast.error("Пожалуйста, укажите свой телефон!", {
      timeout: 5000,
    });
    return;
  }
  if (clientEmail.value.trim().length === 0) {
    toast.error("Пожалуйста, укажите свою электронную почту!", {
      timeout: 5000,
    });
    return;
  }
  submitLoading.value = true;
  sendOrder({
    notes: notes.value,
    name: clientName.value,
    phone: clientPhone.value,
    email: clientEmail.value,
    deliveryType: deliveryType.value,
    items: cart.value.map((item) => ({
      id: item.product.id,
      count: item.count,
    })),
  })
    .then(() => {
      toast.success("Заказ оформлен!", {
        timeout: 5000,
      });
      router.push("/");
    })
    .catch((e) => {
      console.error(e);
      toast.error("Произошла ошибка, повторите позже", {
        timeout: 5000,
      });
    })
    .finally(() => {
      submitLoading.value = false;
    });
}
</script>

<template>
  <div class="view-flex">
    <div class="CartView__Column">
      <section class="CartView__Main">
        <div class="CartView__title">Моя корзина</div>
        <div class="CartView__Items">
          <TransitionGroup name="CartItemLarge">
            <CartCardLarge
              v-for="item in cart"
              :key="item.product.id"
              :item="item"
            />
          </TransitionGroup>
        </div>
        <CartNotes class="CartView__Notes" />
      </section>
      <aside class="CartView__Summary">
        <div class="CartView__title">Детали заказа</div>
        <div class="CartView__SummaryItem">
          <div>Сумма</div>
          <div>{{ itemsPriceStr }}</div>
        </div>
        <div class="CartView__SummaryItem">
          <div>Доставка</div>
          <div>{{ deliveryPriceStr }}</div>
        </div>
        <CartDeliveryDropDown
          class="CartView__CartDeliveryDropDown"
          :delivery-price="misc?.deliveryPrice ?? 0"
        />
        <div class="CartView__FinalItem">
          <div>Итого</div>
          <div>{{ totalPriceStr }}</div>
        </div>
        <TextField
          class="CartView__TextField"
          :value="clientName"
          @input="onNameInput"
          placeholder="Имя ⃰"
        />
        <TextField
          class="CartView__TextField"
          :value="clientPhone"
          @input="onPhoneInput"
          placeholder="Телефон ⃰"
        />
        <TextField
          class="CartView__TextField"
          :value="clientEmail"
          @input="onEmailInput"
          placeholder="Электронная почта ⃰"
        />
        <CartSubmit
          class="CartView__CartSubmit"
          :loading="submitLoading"
          @submit="onSubmit"
        />
      </aside>
    </div>

    <Footer />
  </div>
</template>

<style>
.CartView__Column {
  max-width: 980px;
  margin-top: 33px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.CartView__Main {
  flex-grow: 999;
  max-width: 608px;
}

.CartView__Summary {
  flex-grow: 1;
  margin-left: 52px;
  width: 280px;
}

.CartView__title {
  border-bottom: 1px solid rgba(48, 49, 50, 0.2);
  padding: 10px 0 16px;
  font: var(--font-din-next);
  font-size: 20px;
}

.CartView__Summary .CartView__title {
  margin-bottom: 32px;
}

.CartView__SummaryItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font: var(--font-din-next);
  font-size: 16px;
  padding-bottom: 12px;
  line-height: 1.8em;
}

.CartView__CartDeliveryDropDown {
  margin-bottom: 20px;
}

.CartView__FinalItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font: var(--font-din-next);
  font-size: 20px;
  padding-top: 12px;
  line-height: 1.8em;
  border-top: 1px solid rgba(48, 49, 50, 0.2);
}

.CartView__Notes {
  margin-top: 16px;
}

.CartView__CartSubmit {
  margin-top: 10px;
}

.CartView__TextField {
  height: 60px;
}

/* CartItem */
.CartItemLarge-enter-active,
.CartItemLarge-leave-active {
  transition: opacity 0.4s ease;
}

.CartItemLarge-enter-from {
  opacity: 0;
}

.CartItemLarge-enter-to {
  opacity: 1;
}

.CartItemLarge-leave-from {
  opacity: 1;
}

.CartItemLarge-leave-to {
  opacity: 0;
}

@media (max-width: 1000px) {
  .CartView__Column {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .CartView__Summary {
    margin-left: 0;
    width: 100%;
  }
}
</style>
