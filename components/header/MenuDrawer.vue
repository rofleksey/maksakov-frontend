<script lang="ts" setup>
import {computed} from "vue";
import IconNext from "@/components/icons/IconNext.vue";
import {useRouter} from "vue-router";
import {useMenuDrawerStore} from "~/stores/menu-store";

const router = useRouter();

const menuDrawerStore = useMenuDrawerStore();
const isOpen = computed(() => menuDrawerStore.isOpen);

function openPage(page: string) {
  router.push(page);
  menuDrawerStore.close();
}
</script>

<template>
  <Transition name="MenuDrawer">
    <div v-if="isOpen" class="MenuDrawer">
      <div class="MenuDrawer__curtain" @click="menuDrawerStore.close"></div>
      <div class="MenuDrawer__body">
        <div class="MenuDrawer__header">
          <IconNext
              class="MenuDrawer__CloseButton"
              @click="menuDrawerStore.close"
          />
          <span class="MenuDrawer__header__text">Меню</span>
        </div>
        <div class="MenuDrawer__Items">
          <div class="MenuDrawer__item" @click="openPage('/')">главная</div>
          <div class="MenuDrawer__item" @click="openPage('/catalog')">
            каталог
          </div>
          <div
              class="MenuDrawer__item"
              @click="openPage(`/category/${SALE_CATEGORY_ID}`)"
          >
            распродажа
          </div>
          <div class="MenuDrawer__item" @click="openPage('/delivery')">
            доставка и оплата
          </div>
          <div class="MenuDrawer__item" @click="openPage('/contacts')">
            контакты
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.MenuDrawer {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  font: var(--font-din-next);
}

.MenuDrawer__curtain {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.2;
}

.MenuDrawer__body {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 350px;
  display: flex;
  flex-direction: column;
  background: white;
}

.MenuDrawer__header {
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

.MenuDrawer__header__text {
  font-size: 23px;
  font-weight: lighter;
  line-height: 28px;
  text-align: center;
}

.MenuDrawer__CloseButton {
  cursor: pointer;
  position: absolute;
  left: 31px;
  width: 20px;
  height: 20px;
  transform: rotate(-180deg);
}

.MenuDrawer__Items {
  display: flex;
  flex-direction: column;
  align-items: center;
  letter-spacing: 2px;
  text-align: center;
  font: var(--font-raleway);
  font-size: 20px;
}

.MenuDrawer__item {
  padding: 10px 20px;
  cursor: pointer;
  transition: color 0.25s ease 0s, letter-spacing 0.4s ease 0s;
}

.MenuDrawer__item:hover {
  color: var(--color-hovered);
  letter-spacing: 1px;
}

.MenuDrawer-enter-active .MenuDrawer__body,
.MenuDrawer-leave-active .MenuDrawer__body {
  transition: left 0.4s ease;
}

.MenuDrawer-enter-active .MenuDrawer__CloseButton,
.MenuDrawer-leave-active .MenuDrawer__CloseButton {
  transition: transform 0.4s ease;
}

.MenuDrawer-enter-from .MenuDrawer__body,
.MenuDrawer-leave-to .MenuDrawer__body {
  left: -350px;
}

.MenuDrawer-enter-from .MenuDrawer__CloseButton {
  transform: rotate(-180deg);
}

.MenuDrawer-enter-active,
.MenuDrawer-leave-active {
  transition: opacity 0.4s ease;
}

.MenuDrawer-enter-from {
  opacity: 0;
}

.MenuDrawer-enter-to {
  opacity: 1;
}

.MenuDrawer-leave-from {
  opacity: 1;
}

.MenuDrawer-leave-to {
  opacity: 0;
}

.MenuDrawer-leave-to .MenuDrawer__CloseButton {
  transform: rotate(0);
}
</style>
