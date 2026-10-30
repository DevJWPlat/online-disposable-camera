<script setup>
import PhoneFrame from '@/components/PhoneFrame.vue'
import { startEnquiry } from '@/data/enquiry.js'

// Flat screenshots live in public/theme-screens/ (see the README there).
const themes = [
  {
    name: 'Classic Editorial',
    note: 'Clean typography, timeless layouts and a polished editorial feel.',
    bestFor: 'Best for weddings & anniversaries',
    screen: '/theme-screens/classic-editorial.png',
  },
  {
    name: 'Soft Film',
    note: 'Warm tones, tactile textures and a relaxed analogue-inspired look.',
    bestFor: 'Best for garden parties & birthdays',
    screen: '/theme-screens/soft-film.png',
  },
  {
    name: 'After Dark',
    note: 'Flash photography, bold contrast and a late-night party atmosphere.',
    bestFor: 'Best for hen dos & big nights out',
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
          <h2>Pick a look.<br />Make it yours.</h2>
        </div>
        <p>Start with a polished base theme, then personalise the names, date, photos and event details. Same camera, same private gallery, just a different feel.</p>
      </div>

      <div class="mt-[64px] grid grid-cols-4 gap-[28px] max-[1100px]:grid-cols-2 max-[680px]:grid-cols-1 max-[680px]:gap-[56px]">
        <article
          v-for="theme in themes"
          :key="theme.name"
          class="theme-card"
          @click="startEnquiry({ theme: theme.name })"
        >
          <div class="theme-stage">
            <PhoneFrame :src="theme.screen" :alt="`${theme.name} disposable camera theme`" />
          </div>

          <div class="theme-caption">
            <h3>{{ theme.name }}</h3>
            <p class="theme-note">{{ theme.note }}</p>
            <p class="theme-best">{{ theme.bestFor }}</p>
            <button class="theme-link" type="button" @click.stop="startEnquiry({ theme: theme.name })">
              Choose this theme <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </article>

        <article class="custom-theme-card flex flex-col rounded-[28px] border border-[#7437ff]/15 bg-[#efe5ff] p-[28px] text-[#101010]">
          <div class="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white/65 text-[24px] text-[#7437ff]">
            <i class="fa-solid fa-sparkles" aria-hidden="true"></i>
          </div>
          <h3 class="mt-[34px] max-w-[220px] font-display text-[34px] font-bold leading-[1.02] tracking-[-0.05em]">Custom designs</h3>
          <p class="mt-[18px] text-[15px] leading-[1.65] text-[#5f5867]">Have something specific in mind? I&nbsp;can create a fully bespoke design to match your event, invitations or&nbsp;brand.</p>
          <button class="mt-auto min-h-[56px] rounded-[14px] border-2 border-[#7437ff] bg-transparent px-[18px] font-bold text-[#4d22c7] transition hover:bg-[#7437ff] hover:text-white" type="button" @click="startEnquiry({ theme: 'Fully custom' })">
            Get a custom quote
          </button>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.theme-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  cursor: pointer;
}

.theme-stage {
  --phone-height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  padding-bottom: 26px;
}

/* Soft shadow on the "floor" under the phone. */
.theme-stage::after {
  position: absolute;
  bottom: 6px;
  left: 50%;
  width: 62%;
  height: 26px;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(25, 20, 38, .22), transparent);
  content: '';
  transition: transform 260ms ease, opacity 260ms ease;
  pointer-events: none;
}

.theme-caption {
  padding: 14px 6px 0;
}

.theme-caption h3 {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.theme-note {
  margin: 8px 0 0;
  color: #68645f;
  font-size: 14px;
  line-height: 1.55;
}

.theme-best {
  margin: 10px 0 0;
  color: #101010;
  font-size: 13px;
  font-weight: 700;
}

.theme-link {
  display: inline-flex;
  margin-top: 16px;
  align-items: center;
  gap: 8px;
  padding: 0 0 3px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: #101010;
  font-size: 14px;
  font-weight: 700;
  transition: color 180ms ease, border-color 180ms ease;
}

.theme-link i { transition: transform 180ms ease; }

/* Hover: the phone lifts, its floor shadow shrinks, the link turns purple. */
.theme-card:hover :deep(.phone) {
  transform: translateY(-10px);
  box-shadow:
    inset 0 0 0 calc(var(--u) * 2) #3a3a3c,
    0 calc(var(--u) * 34) calc(var(--u) * 60) rgba(25, 20, 38, 0.24);
}

.theme-card:hover .theme-stage::after {
  transform: translateX(-50%) scale(.82);
  opacity: .6;
}

.theme-card:hover .theme-link,
.theme-link:focus-visible {
  border-color: #7437ff;
  color: #7437ff;
}

.theme-card:hover .theme-link i { transform: translateX(4px); }

@media (max-width: 1280px) { .theme-stage { --phone-height: 440px; } }
@media (max-width: 680px)  { .theme-stage { --phone-height: 480px; } .theme-caption { text-align: center; } }
</style>
