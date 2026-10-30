<script setup>
import PhoneFrame from '@/components/PhoneFrame.vue'
import { startEnquiry } from '@/data/enquiry.js'

// Flat screenshots live in public/theme-screens/ (see the README there).
const themes = [
  {
    name: 'Classic Editorial',
    note: 'Clean typography, timeless layouts and a polished editorial feel.',
    bestFor: 'Weddings · anniversaries · milestone birthdays',
    screen: '/theme-screens/classic-editorial.png',
  },
  {
    name: 'Soft Film',
    note: 'Warm tones, tactile textures and a relaxed analogue-inspired look.',
    bestFor: 'Garden parties · birthdays · relaxed weddings',
    screen: '/theme-screens/soft-film.png',
  },
  {
    name: 'After Dark',
    note: 'Flash photography, bold contrast and a late-night party atmosphere.',
    bestFor: 'Hen dos · 30ths · Christmas parties',
    screen: '/theme-screens/after-dark.png',
  },
]
</script>

<template>
  <section id="themes" class="section-wrap border-t border-black/10 py-[110px]">
    <div class="wrapper">
      <div class="section-heading">
        <div>
          <p class="section-kicker">STANDARD THEMES</p>
          <h2>Pick a look. Make it yours.</h2>
        </div>
        <p>Start with a polished base theme, then personalise the names, date, photos and event details. Same camera, same private gallery — just a different feel.</p>
      </div>

      <div class="themes-grid mt-[54px] grid grid-cols-4 gap-[22px] max-[1100px]:grid-cols-2 max-[680px]:grid-cols-1">
        <article
          v-for="theme in themes"
          :key="theme.name"
          class="theme-card flex min-w-0 cursor-pointer flex-col"
          @click="startEnquiry({ theme: theme.name })"
        >
          <div class="theme-stage">
            <PhoneFrame :src="theme.screen" :alt="`${theme.name} disposable camera theme`" />
          </div>

          <div class="theme-info">
            <div>
              <h3 class="font-display text-[28px] font-bold tracking-[-0.04em]">{{ theme.name }}</h3>
              <p class="mt-[6px] max-w-[320px] text-[14px] leading-[1.55] text-[#68645f]">{{ theme.note }}</p>
              <p class="mt-[10px] text-[11px] font-bold tracking-[0.08em] text-[#7437ff]">{{ theme.bestFor }}</p>
            </div>
            <button class="icon-button" type="button" :aria-label="`Choose ${theme.name}`" :title="`Choose ${theme.name}`" @click.stop="startEnquiry({ theme: theme.name })">
              <i class="fa-solid fa-arrow-up-right"></i>
            </button>
          </div>
        </article>

        <article class="custom-theme-card flex flex-col rounded-[28px] border border-[#7437ff]/15 bg-[#efe5ff] p-[28px] text-[#101010]">
          <div class="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white/65 text-[24px] text-[#7437ff]">
            <i class="fa-solid fa-sparkles" aria-hidden="true"></i>
          </div>
          <h3 class="mt-[34px] max-w-[220px] font-display text-[34px] font-bold leading-[1.02] tracking-[-0.05em]">Custom designs</h3>
          <p class="mt-[18px] text-[15px] leading-[1.65] text-[#5f5867]">Have something specific in mind? I can create a fully bespoke design to match your event, invitations or brand.</p>
          <button class="mt-auto min-h-[56px] rounded-[14px] border-2 border-[#7437ff] bg-transparent px-[18px] font-bold text-[#4d22c7] transition hover:bg-[#7437ff] hover:text-white" type="button" @click="startEnquiry({ theme: 'Fully custom' })">
            Get a custom quote
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.theme-stage {
  --phone-height: 500px;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  margin-bottom: -26px; /* phone tucks slightly behind the info card */
}

.theme-info {
  position: relative;
  z-index: 2;
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  border: 1px solid rgba(16, 16, 16, .1);
  border-radius: 22px;
  background: rgba(255, 255, 255, .78);
  padding: 44px 20px 20px;
  backdrop-filter: blur(8px);
}

/* Hover: the phone lifts and its shadow deepens. The card itself stays put. */
.theme-card:hover :deep(.phone) {
  transform: translateY(-10px);
  box-shadow:
    inset 0 0 0 calc(var(--u) * 2) #3a3a3c,
    0 calc(var(--u) * 34) calc(var(--u) * 60) rgba(25, 20, 38, 0.26);
}

@media (max-width: 1280px) { .theme-stage { --phone-height: 440px; } }
@media (max-width: 680px)  { .theme-stage { --phone-height: 480px; } }
</style>
