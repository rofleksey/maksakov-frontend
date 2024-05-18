<script lang="ts" setup>
import Cover from "@/components/misc/SiteCover.vue";
import Banner from "@/components/misc/SiteBanner.vue";
import Title from "@/components/misc/SiteTitle.vue";
import {onMounted} from "vue";
import CategoryButtonColumn from "@/components/misc/CategoryButtonColumn.vue";
import Separator from "@/components/misc/SeparatorLine.vue";
import Markdown from "@/components/misc/MarkDown.vue";
import Footer from "@/components/footer/SiteFooter.vue";

const {data: categories} = await useFetchCategories()
const {data: misc} = await useFetchMisc()

onMounted(() => {
  window.scrollTo({top: 0, behavior: "smooth"});
});
</script>

<template>
  <div class="view-flex">
    <Cover/>
    <Banner>
      <span>без него, как без рук</span>
    </Banner>
    <Title class="HomeView__Maksakov">
      <span>"МАКСАКОВ"</span>
    </Title>
    <Separator class="HomeView__Maksakov-separator"/>
    <div class="HomeView__content">
      <CategoryButtonColumn :categories="categories || []"/>
      <Markdown
          :text="misc?.homeDescription ?? ''"
          class="HomeView__Markdown"
      />
    </div>

    <Footer/>
  </div>
</template>

<style lang="sass" scoped>
.HomeView__Maksakov
  margin-top: 22px

.HomeView__Maksakov-separator
  margin-top: 34px
  width: 219px

.HomeView__content
  display: flex
  flex-direction: row
  justify-content: center
  gap: 50px
  margin-top: 50px
  flex-wrap: wrap-reverse
  width: 100%

  .CategoryButtonColumn
    flex-shrink: 0

  .HomeView__Markdown
    max-width: 570px
    flex-shrink: 1
    padding: 10px
</style>
