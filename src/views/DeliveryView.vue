<script setup lang="ts">
import {computed, onMounted} from "vue";
import type {MMisc} from "@/lib/api"
import {fetchMisc} from "@/lib/api"
import {useMiscStore} from "@/stores/store";
import Separator from "@/components/misc/Separator.vue";
import Markdown from "@/components/misc/Markdown.vue";
import Footer from "@/components/footer/Footer.vue";

const miscStore = useMiscStore();
const misc = computed<MMisc | null>(() => miscStore.misc);

onMounted(() => {
  if (!misc.value) {
    fetchMisc().then((data) => {
      miscStore.setMisc(data);
    });
  }
  window.scrollTo({top: 0, behavior: 'smooth'});
})
</script>

<template>
  <div class="view-flex">
    <div class="DeliveryView__Column">
      <div class="DeliveryView__Cover">
        <img alt="cover" src="../assets/delivery.jpg"/>
      </div>
      <Separator class="DeliveryView__Separator"/>
      <Markdown
        :text="misc?.deliveryDescription ?? ''"/>
    </div>

    <Footer/>
  </div>
</template>

<style scoped>
.DeliveryView__Column {
  width: 825px;
}

.DeliveryView__Cover {
  width: 825px;
  height: 416px;
}

.DeliveryView__Cover img {
  width: 825px;
  height: 416px;
  object-fit: cover;
  object-position: 50% 50%;
}

.DeliveryView__Separator {
  margin-top: 16px;
  margin-bottom: 14px;
}
</style>
