<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useCatalogStore} from "@/stores/store";
import {computed} from "vue";
import {SALE_CATEGORY_ID} from "@/lib/misc";

const router = useRouter();
const route = useRoute();
const catalogStore = useCatalogStore();
const categories = computed(() => catalogStore.categories);
</script>

<template>
  <div class="HeaderMenu">
    <div
      :class="{HeaderMenu__item: true, selected: route.name === 'home'}"
      style="width: 140px"
      @click="router.push('/')">
      о производстве
    </div>
    <div
      :class="{HeaderMenu__item: true,
      selected: (route.name === 'catalog' || route.name === 'category' || route.name === 'product')
      && route.query.id !== '-1' && route.query.categoryId !== '-1'}"
      style="width: 80px"
      @click="router.push('/catalog')">
      каталог
      <ul class="HeaderMenu__SubMenu">
        <li v-for="category in categories" @click.stop="router.push(`/category?id=${category.id}`)">
          {{ category.name }}
        </li>
      </ul>
    </div>
    <div
      :class="{HeaderMenu__item: true,
      selected: (route.name === 'catalog' || route.name === 'category' || route.name === 'product')
      && (route.query.id === '-1' || route.query.categoryId === '-1')}"
      style="width: 110px"
      @click="router.push(`/category?id=${SALE_CATEGORY_ID}`)">
      распродажа
    </div>
    <div
      class="HeaderMenu__item"
      style="width: 160px"
      @click="router.push('/delivery')">
      доставка и оплата
    </div>
  </div>
</template>

<style scoped>
.HeaderMenu {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 25px;
  font-size: 15px;
}

.HeaderMenu__item {
  position: relative;
  box-sizing: content-box;
  text-align: center;
  cursor: pointer;
  flex-shrink: 0;
  padding: 10px 5px;
  font-weight: bold;
  transition: color 0.25s ease 0s, letter-spacing 0.4s ease 0s;
}

.HeaderMenu__item > div {
  width: 100%;
  height: 100%;
}

.HeaderMenu__item:hover {
  color: var(--color-hovered);
  letter-spacing: 1px;
}

.HeaderMenu__item.selected {
  color: var(--color-selected);
}

.HeaderMenu__item.selected:hover {
  color: var(--color-hovered);
}

.HeaderMenu__SubMenu {
  padding-top: 20px;
  background: white;
  list-style: none;
  position: absolute;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  text-align: center;
}

.HeaderMenu__item:hover .HeaderMenu__SubMenu li {
  display: block;
  opacity: 1;
}

.HeaderMenu__SubMenu li {
  color: var(--color-secondary);
  letter-spacing: normal;
  padding: 5px;
  display: none;
  opacity: 0;
  transition: color 0.25s ease 0s, letter-spacing 0.4s ease 0s, opacity 0.4s ease 0s;
}

.HeaderMenu__SubMenu li:hover {
  color: var(--color-hovered);
  letter-spacing: 1px;
}
</style>
