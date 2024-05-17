<script lang="ts" setup>
import IconVK from "@/components/icons/IconVK.vue";
import IconInst from "@/components/icons/IconInst.vue";
import FooterIcon from "@/components/footer/FooterIcon.vue";
import IconEmail from "@/components/icons/IconEmail.vue";
</script>

<template>
  <footer class="Footer">
    <div class="Footer__Text">8-981-87-000-22</div>

    <FooterIcon>
      <IconEmail/>
    </FooterIcon>

    <FooterIcon href="https://vk.com/maksakovcom">
      <IconVK/>
    </FooterIcon>

    <FooterIcon href="https://www.instagram.com/maksakovcom">
      <IconInst/>
    </FooterIcon>

    <div class="Footer__Text">maksakovcom@mail.ru</div>
  </footer>
</template>

<style lang="sass" scoped>
.Footer
  @apply absolute flex flex-row justify-center items-center gap-[25px] flex-nowrap bg-[rgb(83,81,81)]
  @apply w-full animate-[fadein_1s_forwards] opacity-0 px-0 py-[15px] bottom-0
  animation-delay: 1s

.Footer__Text
  color: white
  font: var(--font-din-next)
  font-size: 16px

@media (max-width: 767px)
  .Footer__Text
    display: none

@keyframes fadein
  from
    opacity: 0

  to
    opacity: 1

</style>
