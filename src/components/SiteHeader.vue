<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import brandLogo from '@/assets/brand/logo-long.png'
import { navItems } from '@/data/site.js'

const mobileMenuOpen = ref(false)

function scrollTo(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function handleEscape(event) {
  if (event.key === 'Escape') closeMobileMenu()
}

watch(mobileMenuOpen, (open) => {
  document.body.classList.toggle('menu-open', open)
})

onMounted(() => window.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.classList.remove('menu-open')
})
</script>

<template>
  <header :class="{ 'menu-is-open': mobileMenuOpen }" class="site-header mx-auto border-b border-black/10 py-[28px] max-[620px]:w-[calc(100%-28px)] max-[620px]:py-[18px]">
    <div class="wrapper flex items-center justify-between">
      <a class="brand flex w-[230px] max-[620px]:w-[176px]" href="#top" aria-label="Online Disposable Camera home">
        <img class="block h-auto w-full" :src="brandLogo" alt="Online Disposable Camera" />
      </a>
  
      <div class="header-actions ml-auto flex items-center gap-[32px]">
        <nav class="site-nav flex items-center gap-[28px] text-[14px] font-semibold max-[980px]:hidden" aria-label="Primary navigation">
          <a v-for="item in navItems" :key="item[0]" class="transition-opacity hover:opacity-50" :href="item[1]">{{ item[0] }}</a>
        </nav>
  
        <button class="header-cta min-h-[46px] rounded-full bg-[#7437ff] px-[21px] font-bold text-white transition hover:-translate-y-[2px] hover:bg-[#5f22f4] max-[980px]:hidden" type="button" @click="scrollTo('#contact')">Get in touch</button>
  
        <button class="menu-toggle" :class="{ 'is-open': mobileMenuOpen }" type="button" :aria-expanded="mobileMenuOpen" aria-controls="mobile-navigation" :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'" @click="mobileMenuOpen = !mobileMenuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <Transition name="mobile-overlay">
    <button v-if="mobileMenuOpen" class="mobile-menu-overlay" type="button" aria-label="Close menu" @click="closeMobileMenu"></button>
  </Transition>

  <Transition name="mobile-drawer">
    <aside v-if="mobileMenuOpen" id="mobile-navigation" class="mobile-menu" aria-label="Mobile navigation">
      <div class="flex items-center justify-between border-b border-black/10 pb-[20px]">
        <span class="text-[12px] font-extrabold tracking-[0.2em]">MENU</span>
        
      </div>
      <nav class="mt-[22px] flex flex-col">
        <a v-for="item in navItems" :key="item[0]" class="border-b border-black/10 py-[22px] text-[clamp(30px,7vw,52px)] font-bold tracking-[-0.04em]" :href="item[1]" @click="closeMobileMenu">{{ item[0] }}</a>
      </nav>
      <button type="button" class="mt-auto flex min-h-[58px] items-center justify-between rounded-full bg-[#7437ff] px-[24px] font-bold text-white" @click="scrollTo('#contact'); closeMobileMenu()">
        Get in touch <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </button>
    </aside>
  </Transition>
</template>


<style scoped>
/* While the menu is open the header floats above the drawer, so the hamburger
   stays exactly where it was and becomes the close button. */
.site-header.menu-is-open { z-index: 60; border-color: transparent; }
.site-header.menu-is-open .brand { visibility: hidden; }
.site-header .menu-toggle.is-open {
  position: relative;
  top: auto;
  right: auto;
  background: #fff;
}
</style>
