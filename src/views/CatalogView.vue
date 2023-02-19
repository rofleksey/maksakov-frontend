<script setup lang="ts">
import Title from "@/components/misc/Title.vue";
import {computed, onMounted} from "vue";
import type {MCategory} from "@/lib/api"
import {fetchCategories} from "@/lib/api"
import Separator from "@/components/misc/Separator.vue";
import CategoryButton from "@/components/misc/CategoryButton.vue";
import {useCatalogStore} from "@/stores/store";
import Footer from "@/components/footer/Footer.vue";

const catalogStore = useCatalogStore();
const categories = computed<MCategory[]>(() => catalogStore.categories);

onMounted(() => {
  if (categories.value.length === 0) {
    fetchCategories().then((data) => {
      catalogStore.setCategories(data);
    });
  }
  window.scrollTo({top: 0, behavior: 'smooth'});
});
</script>

<template>
  <div class="view-flex">
    <Title class="CatalogView__Title" light>
      <span>Ассортимент</span>
    </Title>
    <div class="CatalogView__CategoryContainer">
      <Separator class="CatalogView__Title-separator"/>
      <div class="CatalogView__CategoryList">
        <CategoryButton
          v-for="category in categories"
          :id="category.id"
          :key="category.id"
          :name="category.name"
          :img="category.imageMain.large ?? category.imageMain.original"
          big
        />
      </div>
    </div>

    <Footer/>
  </div>
</template>

<style>
.CatalogView__Title {
  margin-top: 20px;
  margin-bottom: 25px;
}

.CatalogView__Title-separator {
  width: 100%;
  margin-bottom: 30px;
}

.CatalogView__CategoryContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 828px;
}

.CatalogView__CategoryList {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  column-gap: 50px;
  row-gap: 25px;
  width: 100%;
}
</style>
