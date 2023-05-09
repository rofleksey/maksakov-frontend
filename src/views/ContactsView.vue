<script setup lang="ts">
import {computed, onMounted} from "vue";
import type {MMisc} from "@/lib/api_types";
import {fetchMisc} from "@/lib/api";
import {useMiscStore} from "@/stores/store";
import Markdown from "@/components/misc/MarkDown.vue";
import Footer from "@/components/footer/SiteFooter.vue";
import Gallery from "@/components/misc/ImageGallery.vue";
import ShopMap from "@/components/misc/ShopMap.vue";

const miscStore = useMiscStore();
const misc = computed<MMisc | null>(() => miscStore.misc);

onMounted(() => {
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
        <div class="ContactsView__Column">
            <Gallery
                    v-if="misc"
                    class="ContactsView__Gallery"
                    :autoplay="misc?.contactsImages?.length > 1 ? 5000 : 0"
                    :transition="1000"
                    :images="misc?.contactsImages ?? []"
            />
            <Markdown :text="misc?.contactsDescription ?? ''"/>
            <ShopMap style="width: 100%"/>
        </div>

        <Footer/>
    </div>
</template>

<style>
.ContactsView__Column {
    width: 956px;
}

.ContactsView__Gallery .carousel_slide {
    width: 956px;
    height: 467px;
}

.ContactsView__Gallery .Gallery__item-container {
    width: 100%;
    height: 467px;
}
</style>
