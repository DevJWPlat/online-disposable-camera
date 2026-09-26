<script setup>
import { included } from '@/data/site.js'
</script>

<template>
  <section class="border-y border-black/10 bg-white/35 py-[110px]">
   <div class="wrapper">
    <div class="section-wrap">
      <div class="section-heading"><div><p class="section-kicker">INCLUDED AS STANDARD</p><h2>Everything the camera needs.</h2></div><p>The experience is deliberately simple for guests, while the admin side gives you control after the event.</p></div>
      <div class="mt-[54px] grid grid-cols-3 border-l border-t border-black/10 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1">
        <article v-for="item in included" :key="item[1]" class="border-b border-r border-black/10 p-[28px]"><i :class="item[0]" class="text-[24px] text-[#7437ff]"></i><h3 class="mt-[34px] font-display text-[24px] font-bold tracking-[-0.04em]">{{ item[1] }}</h3><p class="mt-[9px] text-[14px] leading-[1.65] text-[#68645f]">{{ item[2] }}</p></article>
      </div>
    </div>
   </div>
  </section>
</template>
