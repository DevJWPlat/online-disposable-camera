<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import brandLogo from '@/assets/brand/logo-long.png'
import { appUrl, navItems } from '@/data/site.js'

const mobileMenuOpen = ref(false)

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
  
        <div class="header-buttons">
          <a class="header-btn header-btn--outline" :href="appUrl" target="_blank" rel="noopener">Sign in</a>
          <a class="header-btn header-btn--solid" :href="`${appUrl}/events/new`" target="_blank" rel="noopener">Get started</a>
        </div>
  
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
      <div class="menu-buttons">
        <a class="menu-btn menu-btn--outline" :href="appUrl" target="_blank" rel="noopener">Sign in</a>
        <a class="menu-btn menu-btn--solid" :href="`${appUrl}/events/new`" target="_blank" rel="noopener">
          Get started <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </a>
      </div>
    </aside>
  </Transition>
</template>


<style scoped>
/* Sign in and Get started. Styled here rather than with Tailwind classes,
   because the site's base link styles (colour and font inherit) beat those. */
.header-buttons { display: flex; align-items: center; gap: 10px; }
.header-btn {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  border: 2px solid #7437ff;
  border-radius: 999px;
  padding: 0 21px;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  transition: transform 180ms ease, background 180ms ease, color 180ms ease;
}
.header-btn:hover { transform: translateY(-2px); }
.header-btn--outline { background: transparent; color: #7437ff; }
.header-btn--outline:hover { background: #7437ff; color: #fff; }
.header-btn--solid { background: #7437ff; color: #fff; }
.header-btn--solid:hover { border-color: #5f22f4; background: #5f22f4; }

/* Tablets and large phones: only Get started in the header (Sign in lives
   in the menu), made a little smaller so everything fits on one line. */
@media (max-width: 980px) {
  .header-btn--outline { display: none; }
}
@media (max-width: 620px) {
  .header-actions { gap: 10px; }
  .header-btn { min-height: 42px; padding: 0 15px; font-size: 14px; }
}
/* Small phones: just the logo and the menu. Both buttons are in the menu. */
@media (max-width: 549px) {
  .header-buttons { display: none; }
}

.menu-buttons { display: grid; gap: 10px; margin-top: auto; }
.menu-btn {
  display: flex;
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #7437ff;
  border-radius: 999px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 700;
}
.menu-btn--outline { justify-content: center; background: transparent; color: #7437ff; }
.menu-btn--solid { background: #7437ff; color: #fff; }

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
