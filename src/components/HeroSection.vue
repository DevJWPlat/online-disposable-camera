<script setup>
import sophieHeroPhone from '@/assets/marketing/sophie-last-rodeo-iphone.png'
import cazHeroPhone from '@/assets/marketing/caz-and-dan-iphone.png'

function scrollTo(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

const heroFeatures = [
  ['fa-regular fa-camera', '25 photos', 'as standard'],
  ['fa-regular fa-mobile-screen-button', 'Works on', 'iPhone & Android'],
  ['fa-regular fa-link', 'No app', 'download needed'],
  ['fa-regular fa-user-group', 'Private', 'event gallery'],
]
</script>

<template>
  <section class="hero hero-reference mx-auto py-[74px]">
    <div class="wrapper flex items-center gap-[54px] relative">
      <div class="relative z-[4]">
        <p class="hero-eyebrow">CAPTURE THE REAL MOMENTS</p>
        <h1 class="hero-reference-title">Disposable<br />camera vibes.</h1>
        <p class="hero-reference-subtitle">No app download required.</p>
        <p class="hero-reference-copy">Give your guests a simple way to capture your event. They scan a QR code, take their photos, and you get a private gallery to relive all the moments.</p>
  
        <div class="mt-[34px] flex flex-wrap gap-[14px] max-[620px]:flex-col">
          <button class="hero-reference-primary" type="button" @click="scrollTo('#themes')">View themes <i class="fa-solid fa-arrow-right"></i></button>
          <button class="hero-reference-secondary" type="button" @click="scrollTo('#contact')">Get in touch</button>
        </div>
  
        <div class="hero-row flex gap-[64px] mt-[76px]">
          <div v-for="feature in heroFeatures" :key="feature[1]" class="hero-feature-item">
            <i :class="feature[0]" aria-hidden="true"></i>
            <span><strong>{{ feature[1] }}</strong><small>{{ feature[2] }}</small></span>
          </div>
        </div>
      </div>
  
      <div class="hero-product hero-product-reference absolute right-0" aria-label="Custom disposable camera examples">
        <div class="phone-text left">
          <p>DIFFERENT THEMES<br> SAME GREAT EXPERIENCE.</p>
          <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 65.2 43.7">
            <path d="M1.2.7c1.5,11.6,7.3,23.2,17.5,29.1,5.9,3.4,12.9,4.8,19.8,4.4,7.7-.4,15.2-2.8,22.4-5.4-3.3-1.3-6.6-2.6-10-3.9-.6-.2-1.4-.6-1.4-1.3,0-.6.5-1.1,1.1-1.2s1.2,0,1.7.2c4.4,1.4,8.8,3.1,12.9,5.2-1.2,5.1-3,10.1-5.5,14.7-.3.5-.6,1.1-1.2,1.3-.8.2-1.5-.5-1.6-1.3s.2-1.5.4-2.2c1.3-3.2,2.6-6.3,4.2-9.3-6.3,3.2-13,5.7-20,6.6s-14.3.2-20.7-2.7c-6.4-2.9-11.7-8-15.3-14.1-1.9-3.3-3.4-7-4.3-10.7S.5,6.3.3,4.4,0,2.4,0,1.5c0-.2,0-.5,0-.7s.1-.4.3-.5S1.1-.1,1.2,0c0,.2,0,.4,0,.6Z"/>
          </svg>
        </div>
        <img class="hero-caz-phone" :src="cazHeroPhone" alt="Caz and Dan disposable camera shown on an iPhone" />
        <img class="hero-real-phone" :src="sophieHeroPhone" alt="Sophie's Last Rodeo disposable camera shown on an iPhone" />
        <div class="phone-text right">
          <p>FULLY CUSTOM DESIGNS AVAILABLE</p>
          <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 73 32.9">
            <path d="M72,16.4c-8.1,8.5-19.7,14.2-31.4,12.9-6.8-.8-13.2-3.9-18.5-8.2-6-4.9-10.5-11.3-14.8-17.7,3.4.9,6.9,1.9,10.3,2.8.7.2,1.5.3,1.9-.2.4-.4.3-1.2-.1-1.6s-1-.7-1.5-.9C13.6,2,9,.8,4.5,0,2.3,4.8.9,9.9,0,15.1c0,.6-.2,1.3.2,1.7.5.6,1.5.4,2.1,0s.8-1.3,1-2.1c.9-3.3,1.6-6.6,2.2-9.9,3.1,6.3,7,12.3,12.1,17.2,5.1,4.9,11.3,8.7,18.2,10.2,6.9,1.5,14.2.5,20.7-2.2,3.6-1.5,6.9-3.6,9.8-6.1s2.8-2.5,4.1-3.9,1.4-1.4,1.9-2.2c.1-.2.3-.3.4-.6s.1-.4,0-.6-.4-.8-.5-.7c-.1.2-.3.3-.4.5Z"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-row {
  svg {
    height: auto;
    width: 40px;
    max-height: 35px;  
  }
}

.hero-product {
  width: 100%;
  max-width: 570px;
  height: 100%;
  .hero-caz-phone {
    left: 6%;
    top: 10px;
    width: 63%;
    position: absolute;
    z-index: 10;
    filter: drop-shadow(0 34px 42px rgba(25, 20, 38, .16));
    
  }
  .hero-real-phone {
    left: 200px;
    top: 13px;
    width: 63%;
    position: absolute;
    z-index: 7;
    filter: drop-shadow(0 35px 45px rgba(25, 20, 38, 0.18));
    transform: rotate(15deg);
  }
  .phone-text {
    &.left {
      font-family: 'DM Sans', sans-serif;
      width: 24%;
      text-align: center;
      font-weight: 800;
      letter-spacing: -0.8px;
      position: absolute;
      left: -70px;
      transform: rotate(-35deg);
      top: 90px;
      svg {
        left: 50px;
        position: absolute;
        transform: rotate(18deg);
        top: 109px;
        width: 50%;
      }
    }
    &.right {
      font-family: 'DM Sans', sans-serif;
      width: 18%;
      text-align: center;
      font-weight: 800;
      letter-spacing: -0.8px;
      position: absolute;
      right: 0px;
      transform: rotate(-15deg);
      bottom: 140px;
      svg {
        position: absolute;
        bottom: -23px;
        right: 60px;
        transform: rotate(-5deg);
        width: 60px;
      }
    }
  }
}
</style>
