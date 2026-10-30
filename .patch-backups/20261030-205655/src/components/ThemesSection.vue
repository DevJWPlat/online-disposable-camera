<script setup>
import classicEditorial from '@/assets/marketing/themes/classic-editorial.png'
import softFilm from '@/assets/marketing/themes/soft-film.png'
import afterDark from '@/assets/marketing/themes/after-dark.png'
import { startEnquiry } from '@/data/enquiry.js'

const themes = [
  {
    name: 'Classic Editorial',
    note: 'Clean typography, timeless layouts and a polished editorial feel.',
    bestFor: 'Weddings · anniversaries · milestone birthdays',
    image: classicEditorial,
  },
  {
    name: 'Soft Film',
    note: 'Warm tones, tactile textures and a relaxed analogue-inspired look.',
    bestFor: 'Garden parties · birthdays · relaxed weddings',
    image: softFilm,
  },
  {
    name: 'After Dark',
    note: 'Flash photography, bold contrast and a late-night party atmosphere.',
    bestFor: 'Hen dos · 30ths · Christmas parties',
    image: afterDark,
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

      <div class="mt-[54px] grid grid-cols-4 gap-[22px] max-[1100px]:grid-cols-2 max-[680px]:grid-cols-1">
        <article v-for="theme in themes" :key="theme.name" class="theme-card group flex min-w-0 flex-col">
          <div class="theme-preview relative flex min-h-[560px] items-end justify-center overflow-visible max-[680px]:min-h-[520px]">
            <img class="theme-preview-phone block h-auto w-[118%] max-w-none object-contain" :src="theme.image" :alt="`${theme.name} disposable camera theme preview`" />
          </div>

          <div class="mt-[-18px] flex items-end justify-between gap-[18px] rounded-[22px] border border-black/10 bg-white/70 p-[20px] pt-[34px] backdrop-blur-[8px]">
            <div>
              <h3 class="font-display text-[28px] font-bold tracking-[-0.04em]">{{ theme.name }}</h3>
              <p class="mt-[6px] max-w-[320px] text-[14px] leading-[1.55] text-[#68645f]">{{ theme.note }}</p>
              <p class="mt-[10px] text-[11px] font-bold tracking-[0.08em] text-[#7437ff]">{{ theme.bestFor }}</p>
            </div>
            <button class="icon-button" type="button" :aria-label="`Choose ${theme.name}`" :title="`Choose ${theme.name}`" @click="startEnquiry({ theme: theme.name })">
              <i class="fa-solid fa-arrow-up-right"></i>
            </button>
          </div>
        </article>

        <article class="custom-theme-card flex min-h-[100%] flex-col rounded-[28px] border border-[#7437ff]/15 bg-[#efe5ff] p-[28px] text-[#101010]">
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
