<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import HowItWorksBanner from '@/components/HowItWorksBanner.vue'
import ThemesSection from '@/components/ThemesSection.vue'
import CustomThemesSection from '@/components/CustomThemesSection.vue'
import BothSidesSection from '@/components/BothSidesSection.vue'
import KindWordsSection from '@/components/KindWordsSection.vue'
import PricingSection from '@/components/PricingSection.vue'
import FaqSection from '@/components/FaqSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import ComingSoonPage from '@/components/ComingSoonPage.vue'

const SHOW_COMING_SOON = false
</script>

<template>
  <ComingSoonPage v-if="SHOW_COMING_SOON" />

  <main v-else id="top" class="min-h-screen overflow-x-clip bg-[#f7f5ef] text-[#101010]">
    <SiteHeader /> 
    <HeroSection />
    <HowItWorksBanner />
    <ThemesSection />
    <CustomThemesSection />
    <BothSidesSection />
    <KindWordsSection />
    <PricingSection />
    <FaqSection />
    <ContactSection />
    <SiteFooter />
  </main>
</template>
