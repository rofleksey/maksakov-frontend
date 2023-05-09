<script setup lang="ts">
import Cover from "@/components/misc/SiteCover.vue";
import Banner from "@/components/misc/SiteBanner.vue";
import Title from "@/components/misc/SiteTitle.vue";
import {computed, onMounted} from "vue";
import {fetchCategories, fetchMisc} from "@/lib/api";
import CategoryButtonColumn from "@/components/misc/CategoryButtonColumn.vue";
import Separator from "@/components/misc/SeparatorLine.vue";
import {useCatalogStore, useMiscStore} from "@/stores/store";
import Markdown from "@/components/misc/MarkDown.vue";
import Footer from "@/components/footer/SiteFooter.vue";

const catalogStore = useCatalogStore();
const categories = computed(() => catalogStore.categories);

const miscStore = useMiscStore();
const misc = computed(() => miscStore.misc);

onMounted(() => {
  if (categories.value.length === 0) {
    fetchCategories().then((data) => {
      catalogStore.setCategories(data);
    });
  }

  if (!misc.value) {
    fetchMisc().then((data) => {
      miscStore.setMisc(data);
    });
  }
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
        <CategoryButtonColumn :categories="categories"/>
        <Markdown
                class="HomeView__Markdown"
                :text="misc?.homeDescription ?? ''"
        />
    </div>

      <Footer/>
  </div>
</template>

<style scoped>
.HomeView__Maksakov {
  margin-top: 22px;
}

.HomeView__Maksakov-separator {
  margin-top: 34px;
  width: 219px;
}

.HomeView__content {
  position: relative;
  right: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  margin-top: 50px;
}

.HomeView__content .CategoryButtonColumn {
  flex-shrink: 0;
}

.HomeView__content .HomeView__Markdown {
  width: 570px;
}
</style>
