<script setup lang="ts">
import { computed, onMounted } from "vue";
import type { MMisc } from "@/lib/api_types";
import { fetchMisc } from "@/lib/api";
import { useMiscStore } from "@/stores/store";
import Separator from "@/components/misc/SeparatorLine.vue";
import Markdown from "@/components/misc/MarkDown.vue";
import Footer from "@/components/footer/SiteFooter.vue";

const miscStore = useMiscStore();
const misc = computed<MMisc | null>(() => miscStore.misc);

onMounted(() => {
  if (!misc.value) {
    fetchMisc().then((data) => {
      miscStore.setMisc(data);
    });
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<template>
  <div class="view-flex">
    <div class="DeliveryView__Column">
      <div class="DeliveryView__Cover">
        <img alt="cover" src="../assets/delivery.jpg" />
      </div>
      <Separator class="DeliveryView__Separator" />
      <Markdown
        class="DeliveryView__Markdown"
        :text="misc?.deliveryDescription ?? ''"
      />
    </div>

    <Footer />
  </div>
</template>

<style scoped>
.DeliveryView__Column {
  max-width: 825px;
}

.DeliveryView__Cover {
  width: 100%;
  max-height: 416px;
}

.DeliveryView__Cover img {
  width: 100%;
  max-height: 416px;
  object-fit: cover;
  object-position: 50% 50%;
}

.DeliveryView__Separator {
  margin-top: 16px;
  margin-bottom: 14px;
}

.DeliveryView__Markdown {
  margin: 10px;
}
</style>
