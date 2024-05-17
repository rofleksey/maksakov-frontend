<script lang="ts" setup>
import {onMounted} from "vue";
import Separator from "@/components/misc/SeparatorLine.vue";
import Markdown from "@/components/misc/MarkDown.vue";
import Footer from "@/components/footer/SiteFooter.vue";

const {data: misc} = await useFetchMisc()

onMounted(() => {
  window.scrollTo({top: 0, behavior: "smooth"});
});
</script>

<template>
  <div class="view-flex">
    <div class="DeliveryView__Column">
      <div class="DeliveryView__Cover">
        <img alt="cover" src="../assets/delivery.jpg"/>
      </div>
      <Separator class="DeliveryView__Separator"/>
      <Markdown
          :text="misc?.deliveryDescription ?? ''"
          class="DeliveryView__Markdown"
      />
    </div>

    <Footer/>
  </div>
</template>

<style lang="sass" scoped>
.DeliveryView__Column
  max-width: 825px

.DeliveryView__Cover
  width: 100%
  max-height: 416px

  img
    width: 100%
    max-height: 416px
    object-fit: cover
    object-position: 50% 50%

.DeliveryView__Separator
  margin-top: 16px
  margin-bottom: 14px

.DeliveryView__Markdown
  margin: 10px
</style>
