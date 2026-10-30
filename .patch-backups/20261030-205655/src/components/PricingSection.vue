<script setup>
import { computed, ref } from 'vue'
import { guestTiers } from '@/data/site.js'
import { startEnquiry } from '@/data/enquiry.js'

const selectedGuestTier = ref(0)
const selectedTier = computed(() => guestTiers[selectedGuestTier.value])
const guestSliderProgress = computed(() => (selectedGuestTier.value / (guestTiers.length - 1)) * 100)
const pricingButtonLabel = computed(() => selectedGuestTier.value === guestTiers.length - 1
  ? 'Contact us'
  : `Create your event — ${selectedTier.value.price}`)

function choosePlan() {
  startEnquiry({ guests: selectedTier.value.label })
}
</script>

<template>
  <section id="pricing" class="bg-[#1f1f1f] py-[110px] text-white">
    <div class="wrapper">
      <div class="max-w-[760px]"><p class="section-kicker text-[#9b82ff]">PRICING</p><h2 class="mt-[9px] font-display text-[clamp(52px,7vw,92px)] font-extrabold leading-[0.94] tracking-[-0.06em]">Pricing calculator</h2><p class="mt-[22px] max-w-[650px] text-[16px] leading-[1.7] text-white/60">One price for your whole event, based on roughly how many guests you’re expecting. No subscriptions, no hidden extras.</p></div>

      <div class="pricing-calculator mt-[58px] rounded-[30px] border border-white/10 bg-[#242424] p-[40px] max-[620px]:p-[22px]">
        <div>
          <h3 class="text-[clamp(26px,3vw,36px)] font-bold tracking-[-0.04em]">How many guests?</h3>
          <div class="guest-scale mt-[34px]">
            <div class="guest-range-wrap">
              <div class="guest-track" aria-hidden="true"><span :style="{ width: `${guestSliderProgress}%` }"></span></div>
              <input v-model.number="selectedGuestTier" class="guest-range" type="range" min="0" :max="guestTiers.length - 1" step="1" aria-label="Guest capacity" />
            </div>
            <div class="guest-options">
              <button v-for="(tier, index) in guestTiers" :key="tier.guests" type="button" :class="{ active: selectedGuestTier === index }" :style="{ left: `${(index / (guestTiers.length - 1)) * 100}%` }" @click="selectedGuestTier = index">{{ tier.guests }}</button>
            </div>
          </div>
        </div>

        <div class="mt-[48px] flex items-center justify-between gap-[24px] border-t border-white/10 pt-[30px] max-[620px]:items-start max-[620px]:flex-col">
          <div class="flex items-center gap-[16px]"><i class="fa-light fa-people-group text-[28px] text-white/55"></i><strong class="text-[clamp(24px,3vw,34px)] font-medium">{{ selectedTier.label }}</strong></div>
          <strong class="text-[clamp(24px,3vw,34px)] font-bold">{{ selectedTier.price }}</strong>
        </div>

        <div class="mt-[46px] grid grid-cols-2 gap-x-[28px] gap-y-[14px] border-t border-white/10 pt-[30px] text-[14px] text-white/65 max-[700px]:grid-cols-1">
          <span><i class="fa-solid fa-check mr-[9px] text-[#9b82ff]"></i>Choice of three themes</span><span><i class="fa-solid fa-check mr-[9px] text-[#9b82ff]"></i>Event text &amp; image customisation</span><span><i class="fa-solid fa-check mr-[9px] text-[#9b82ff]"></i>25 photos per guest</span><span><i class="fa-solid fa-check mr-[9px] text-[#9b82ff]"></i>Hosted event link</span><span><i class="fa-solid fa-check mr-[9px] text-[#9b82ff]"></i>Downloadable QR code</span><span><i class="fa-solid fa-check mr-[9px] text-[#9b82ff]"></i>Private organiser gallery</span><span><i class="fa-solid fa-check mr-[9px] text-[#9b82ff]"></i>Delayed gallery reveal</span><span><i class="fa-solid fa-check mr-[9px] text-[#9b82ff]"></i>Individual &amp; ZIP downloads</span><span><i class="fa-solid fa-check mr-[9px] text-[#9b82ff]"></i>iPhone &amp; Android support</span><span><i class="fa-solid fa-check mr-[9px] text-[#9b82ff]"></i>Three months of gallery storage</span>
        </div>

        <button class="mt-[42px] flex min-h-[62px] w-full items-center justify-center gap-[12px] rounded-[12px] bg-[#7437ff] px-[24px] text-[18px] font-bold transition hover:bg-[#6330dc]" type="button" @click="choosePlan">{{ pricingButtonLabel }} <i class="fa-solid fa-arrow-right"></i></button>
        <p class="mt-[18px] text-center text-[13px] text-white/40">Need more than 250 guests, more shots per guest or a completely bespoke design? Custom designs start from £149 — get in touch for a quote.</p>
      </div>
    </div>
  </section>
</template>
