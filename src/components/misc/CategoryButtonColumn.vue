<script setup lang="ts">
import CategoryButton from "@/components/misc/CategoryButton.vue";
import type {MCategory} from "@/lib/api_types";

interface Props {
  categories: MCategory[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="CategoryButtonColumn">
    <CategoryButton
      v-for="category in props.categories"
      :id="category.id"
      :key="category.id"
      :img="category.imageMain.small ?? category.imageMain.thumbnail"
      :name="category.name"
    />
  </div>
</template>

<style scoped>
.CategoryButtonColumn {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;
  width: 280px;
}
</style>
