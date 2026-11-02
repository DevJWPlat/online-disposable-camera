<script setup>
import { computed, ref } from 'vue'
import { appUrl, guestTiers, startUrl } from '@/data/site.js'
import { startEnquiry } from '@/data/enquiry.js'

// Default to 100 guests: a typical wedding, and a sensible middle price to anchor on.
const selected = ref(Math.min(2, guestTiers.length - 1))
const tier = computed(() => guestTiers[selected.value])
const isQuote = computed(() => selected.value === guestTiers.length - 1)

const included = [
  'Your choice of ready-made theme',
  'Names, date and photos added',
  '25 photos per guest',
  'Your own link and QR code',
  'Gallery reveal at a time you choose',
  'Private organiser gallery',
  'Download everything as a ZIP',
  'Gallery kept for three months',
]

const customIncludes = [
  'A design built around your event',
  'Custom artwork, colours and fonts',
  'Your own domain if you’d like one',
  'Everything in the standard event',
]

function chooseStandard() {
  if (isQuote.value) startEnquiry({ guests: tier.value.label })
  else window.open(startUrl({ guests: tier.value.guests }), '_blank', 'noopener')
}
</script>

<template>
  <section id="pricing" class="bg-[#1a1a1a] py-[110px] text-white">
    <div class="wrapper">
      <div class="section-heading section-heading-dark">
        <div>
          <p class="section-kicker text-[#9b82ff]">PRICING</p>
          <h2>One price.<br />Your whole event.</h2>
        </div>
        <p>Pay once per event, based on roughly how many guests you’re expecting. Try it free first, and pay online when you’re ready. No hidden extras.</p>
      </div>

      <div class="plans">
        <!-- Standard -->
        <article class="plan plan--standard">
          <div class="plan-top">
            <div>
              <p class="plan-label">Standard event</p>
              <h3>How many guests?</h3>
            </div>
            <div class="plan-price" aria-live="polite">
              <strong>{{ isQuote ? 'Let’s talk' : tier.price }}</strong>
              <small>{{ isQuote ? 'tailored quote' : 'one-off, per event' }}</small>
            </div>
          </div>

          <div class="chips" role="radiogroup" aria-label="Number of guests">
            <button
              v-for="(option, index) in guestTiers"
              :key="option.guests"
              type="button"
              role="radio"
              :aria-checked="selected === index"
              :class="{ active: selected === index }"
              @click="selected = index"
            >
              <span>{{ index === guestTiers.length - 1 ? '250+' : `Up to ${option.guests}` }}</span>
            </button>
          </div>

          <ul class="included">
            <li v-for="item in included" :key="item"><i class="fa-solid fa-check" aria-hidden="true"></i>{{ item }}</li>
          </ul>

          <button class="plan-cta" type="button" @click="chooseStandard">
            {{ isQuote ? 'Get a quote' : `Get started for ${tier.price}` }}
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </article>

        <!-- Custom -->
        <article class="plan plan--custom">
          <p class="plan-label">Fully custom</p>
          <h3>Made just for your event.</h3>
          <div class="plan-price plan-price--left">
            <small>from</small>
            <strong>£149</strong>
          </div>
          <ul class="included included--single">
            <li v-for="item in customIncludes" :key="item"><i class="fa-solid fa-check" aria-hidden="true"></i>{{ item }}</li>
          </ul>
          <button class="plan-cta plan-cta--light" type="button" @click="startEnquiry({ theme: 'Fully custom' })">
            Get a custom quote <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </button>
        </article>
      </div>

      <div class="extras">
        <div>
          <i class="fa-solid fa-plus" aria-hidden="true"></i>
          <p><strong>Optional extras:</strong> more shots per guest, longer gallery storage and printed QR table cards.</p>
        </div>
        <a :href="appUrl" target="_blank" rel="noopener">
          <span class="extras-badge">£149 a year</span>
          Planning lots of events? Get the yearly pass
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.plans {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
  gap: 24px;
  margin-top: 58px;
}

.plan {
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  padding: 36px;
}

.plan--standard { border: 1px solid rgba(255, 255, 255, .1); background: #242424; }
.plan--custom { background: linear-gradient(160deg, #7437ff, #5a22e0); }

.plan-label {
  margin: 0;
  color: #9b82ff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .2em;
  text-transform: uppercase;
}

.plan--custom .plan-label { color: rgba(255, 255, 255, .7); }

.plan h3 {
  margin: 10px 0 0;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(28px, 2.6vw, 36px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.plan-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; }

.plan-price { display: grid; justify-items: end; text-align: right; }
.plan-price strong { font-family: 'Manrope', sans-serif; font-size: clamp(40px, 4vw, 56px); font-weight: 800; line-height: 1; letter-spacing: -0.04em; }
.plan-price small { margin-top: 6px; color: rgba(255, 255, 255, .5); font-size: 13px; }
.plan-price--left { justify-items: start; margin-top: 28px; text-align: left; }
.plan-price--left small { order: -1; margin: 0 0 4px; color: rgba(255, 255, 255, .7); }

.chips {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-top: 28px;
}

.chips button {
  min-height: 52px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 14px;
  background: transparent;
  color: rgba(255, 255, 255, .75);
  font-size: 14px;
  font-weight: 700;
  transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
}

.chips button:hover { border-color: rgba(255, 255, 255, .35); color: #fff; }
.chips button.active { border-color: #7437ff; background: #7437ff; color: #fff; }
.chips button:focus-visible { outline: 3px solid rgba(155, 130, 255, .5); outline-offset: 2px; }

.included {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  margin: 32px 0 0;
  padding: 28px 0 0;
  border-top: 1px solid rgba(255, 255, 255, .1);
  list-style: none;
  color: rgba(255, 255, 255, .75);
  font-size: 14px;
}

.included li { display: flex; align-items: baseline; gap: 10px; }
.included i { color: #9b82ff; font-size: 12px; }
.included--single { grid-template-columns: 1fr; border-color: rgba(255, 255, 255, .2); color: rgba(255, 255, 255, .9); }
.plan--custom .included i { color: #fff; }

.plan-cta {
  display: flex;
  min-height: 58px;
  margin-top: auto;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 0;
  border-radius: 999px;
  background: #7437ff;
  padding: 0 26px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  transition: transform 180ms ease, background 180ms ease;
}

.plan--standard .plan-cta { margin-top: 34px; }
.plan--custom .plan-cta { margin-top: 34px; }
.plan-cta:hover { transform: translateY(-2px); background: #6128ec; }
.plan-cta--light { background: #fff; color: #101010; }
.plan-cta--light:hover { background: #f1ecff; }

.extras {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 24px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 24px;
  padding: 20px 26px;
}

.extras > div { display: flex; align-items: center; gap: 14px; }
.extras > div i { color: #9b82ff; }
.extras p { margin: 0; color: rgba(255, 255, 255, .65); font-size: 14px; line-height: 1.5; }
.extras strong { color: #fff; }

.extras a {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 10px;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.extras a i { transition: transform 180ms ease; }
.extras a:hover i { transform: translateX(4px); }

.extras-badge {
  border-radius: 999px;
  background: rgba(155, 130, 255, .18);
  padding: 4px 10px;
  color: #c9baff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
}

@media (max-width: 1000px) {
  .plans { grid-template-columns: minmax(0, 1fr); }
  .extras { align-items: flex-start; flex-direction: column; }
  .extras a { flex-wrap: wrap; text-align: left; }
}

@media (max-width: 620px) {
  .plan { padding: 24px; }
  .plan-top { flex-direction: column; gap: 14px; }
  .plan-price { justify-items: start; text-align: left; }
  .chips { grid-template-columns: repeat(3, 1fr); }
  .included { grid-template-columns: 1fr; }
}
</style>
