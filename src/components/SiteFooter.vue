<script setup>
import { computed } from 'vue'
import brandLogo from '@/assets/brand/logo-long.png'
import { navItems } from '@/data/site.js'
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="bg-[#101010] text-white">
    <div class="wrapper">
      <div class="section-wrap flex items-start justify-between gap-[40px] py-[58px] max-[760px]:flex-col">
      <div><img class="w-[260px] brightness-0 invert" :src="brandLogo" alt="Online Disposable Camera" /><p class="mt-[20px] max-w-[430px] text-[14px] leading-[1.65] text-white/55">Disposable-camera style event photography, built for the phone already in your guests’ hands.</p></div>
      <div class="grid grid-cols-2 gap-x-[60px] gap-y-[12px] text-[14px]"><a v-for="item in navItems" :key="item[0]" :href="item[1]">{{ item[0] }}</a><a href="#contact">Get in touch</a></div>
    </div>
    <div class="section-wrap flex items-center justify-between border-t border-white/10 py-[22px] text-[12px] text-white/45 max-[620px]:flex-col max-[620px]:items-start max-[620px]:gap-[8px]"><span>© {{ currentYear }} Online Disposable Camera</span><span>onlinedisposablecamera.co.uk</span></div>
    </div>
  </footer>
</template>
