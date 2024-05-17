<script lang="ts" setup>
import CategoryButton from "@/components/misc/CategoryButton.vue";

interface Props {
  categories: MCategory[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-start gap-[5px] w-[280px]">
    <CategoryButton
        v-for="category in props.categories"
        :id="category.id"
        :key="category.id"
        :img="category.imageMain.small ?? category.imageMain.thumbnail"
        :name="category.name"
    />
  </div>
</template>

<style lang="sass" scoped>
</style>
