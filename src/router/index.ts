import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useCartStore, useMenuDrawerStore } from "@/stores/store";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/catalog",
      name: "catalog",
      component: () => import("../views/CatalogView.vue"),
    },
    {
      path: "/category",
      name: "category",
      component: () => import("../views/CategoryView.vue"),
    },
    {
      path: "/product",
      name: "product",
      component: () => import("../views/ProductView.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/delivery",
      name: "delivery",
      component: () => import("../views/DeliveryView.vue"),
    },
    {
      path: "/contacts",
      name: "contacts",
      component: () => import("../views/ContactsView.vue"),
    },
  ],
});

router.beforeEach(() => {
  const cartStore = useCartStore();
  cartStore.restoreCart().catch((e) => {
    console.error(e);
  });

  const menuDrawerStore = useMenuDrawerStore();

  if (cartStore.isOpen || menuDrawerStore.isOpen) {
    cartStore.close();
    menuDrawerStore.close();
    return false;
  }
});

export default router;
