<script lang="ts" setup>
import Title from "@/components/misc/SiteTitle.vue";
import {onMounted} from "vue";
import Separator from "@/components/misc/SeparatorLine.vue";
import CategoryButton from "@/components/misc/CategoryButton.vue";
import Footer from "@/components/footer/SiteFooter.vue";

const {data: categories} = await useFetchCategories()

onMounted(() => {
  window.scrollTo({top: 0, behavior: "smooth"});
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
            :img="category.imageMain.large ?? category.imageMain.original"
            :name="category.name"
            big
        />
      </div>
    </div>

    <Footer/>
  </div>
</template>

<style lang="sass">
.CatalogView__Title
  margin-top: 20px
  margin-bottom: 25px

.CatalogView__Title-separator
  width: 100%
  margin-bottom: 30px

.CatalogView__CategoryContainer
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  max-width: 828px
  width: 100%

.CatalogView__CategoryList
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(391px, 1fr))
  align-items: start
  grid-column-gap: 45px
  grid-row-gap: 25px
  max-width: 100%
</style>
