<script setup>
import { ref } from 'vue'
import { faqs } from '@/data/site.js'
const openFaq = ref(0)
</script>

<template>
  <section id="faq" class="section-wrap py-[110px]">
    <div class="wrapper">
      <div class="grid grid-cols-[0.7fr_1.3fr] gap-[70px] max-[900px]:grid-cols-1">
        <div class="max-w-[470px]"><p class="section-kicker">FAQ</p><h2 class="mt-[10px] font-display text-[clamp(48px,6vw,80px)] font-extrabold leading-none tracking-[-0.06em]">A few things people usually ask.</h2><p class="mt-[22px] text-[16px] leading-[1.7] text-[#68645f]">If your question isn’t here, send it over and I’ll help you work out the best setup for your event.</p></div>
        <div class="border-t border-black/10">
          <article v-for="(faq, index) in faqs" :key="faq[0]" class="border-b border-black/10">
            <button class="flex w-full items-center justify-between gap-[20px] py-[24px] text-left" type="button" @click="openFaq = openFaq === index ? -1 : index"><span class="font-display text-[22px] font-bold tracking-[-0.03em]">{{ faq[0] }}</span><i class="fa-solid fa-plus transition-transform" :class="{ 'rotate-45': openFaq === index }"></i></button>
            <div v-if="openFaq === index" class="pb-[26px] pr-[50px] text-[15px] leading-[1.75] text-[#68645f]">{{ faq[1] }}</div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
