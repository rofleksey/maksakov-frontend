<script lang="ts" setup>
import {onMounted} from "vue";
import Markdown from "@/components/misc/MarkDown.vue";
import Footer from "@/components/footer/SiteFooter.vue";
import Gallery from "@/components/misc/ImageGallery.vue";
import ShopMap from "@/components/misc/ShopMap.vue";

const {data: misc} = await useFetchMisc()

onMounted(() => {
  window.scrollTo({top: 0, behavior: "smooth"});
});
</script>

<template>
  <div class="view-flex">
    <div class="ContactsView__Column">
      <Gallery
          v-if="misc"
          :autoplay="misc?.contactsImages?.length > 1 ? 5000 : 0"
          :images="misc?.contactsImages ?? []"
          :transition="1000"
          class="ContactsView__Gallery"
      />
      <Markdown
          :text="misc?.contactsDescription ?? ''"
          class="ContactsView__Markdown"
      />
      <ShopMap style="width: 100%"/>
    </div>

    <Footer/>
  </div>
</template>

<style lang="sass">
.ContactsView__Column
  max-width: 956px
  width: 100%

.ContactsView__Gallery
  .carousel_slide
    max-width: 956px
    max-height: 467px

  .Gallery__item-container
    width: 100%
    max-height: 467px

.ContactsView__Markdown
  margin: 10px
</style>
