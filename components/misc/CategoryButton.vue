<script lang="ts" setup>
import {useRouter} from "vue-router";

interface Props {
  id: number;
  name: string;
  img: string;
  big?: boolean;
}

const router = useRouter();

const props = withDefaults(defineProps<Props>(), {
  big: false,
});
</script>

<template>
  <div
      :class="{ CategoryButton: true, 'no-select': true, big: props.big }"
      @click="router.push(`/category?id=${props.id}`)"
  >
    <div class="CategoryButton__img-container">
      <img :alt="props.name" :src="props.img"/>
    </div>
    <div class="CategoryButton__name">{{ props.name }}</div>
  </div>
</template>

<style scoped>
.CategoryButton {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  font: var(--font-din-next);
  color: var(--color-secondary);
  background-color: var(--color-banner);
  transition: background-color 0.25s ease 0s, letter-spacing 0.4s ease 0s;
  text-align: center;
  font-size: 14px;
  width: 100%;
}

.CategoryButton.big {
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
}

.CategoryButton:hover {
  background-color: white;
  letter-spacing: 1px;
}

.CategoryButton__name {
  flex-grow: 1;
}

.CategoryButton__img-container {
  width: 57px;
  height: 37px;
  overflow: hidden;
}

.CategoryButton.big .CategoryButton__img-container {
  width: 391px;
  height: 259px;
}

.CategoryButton img {
  width: 57px;
  height: 37px;
  object-fit: cover;
  transition: transform 0.4s ease 0s;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transform: translate3d(0, 0, 1px) scale(1, 1);
}

.CategoryButton.big img {
  width: 391px;
  height: 259px;
}

.CategoryButton:hover img {
  transform: scale(1.2);
}

.CategoryButton.big:hover img {
  transform: scale(1.1);
}
</style>
