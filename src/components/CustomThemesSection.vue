<script setup>
import PhoneFrame from '@/components/PhoneFrame.vue'
import { startEnquiry } from '@/data/enquiry.js'

const points = [
  {
    icon: 'fa-solid fa-envelope-open-text',
    title: 'Matches your invites',
    text: 'Your colours, typography and stationery details carried straight into the camera.',
  },
  {
    icon: 'fa-solid fa-paintbrush',
    title: 'Bespoke artwork',
    text: 'Custom illustrations, buttons, counters and finished screens made just for your event.',
  },
  {
    icon: 'fa-solid fa-champagne-glasses',
    title: 'Any kind of event',
    text: 'Hen dos, milestone birthdays, launches and parties can all have their own identity.',
  },
]
</script>

<template>
  <section id="custom" class="bg-[#101010] py-[110px] text-white">
    <div class="wrapper">
      <div class="section-heading section-heading-dark">
        <div>
          <p class="section-kicker text-[#a98cff]">CUSTOM THEMES</p>
          <h2>Built around your event, not a template.</h2>
        </div>
        <p>Send over your invitations, colours, venue details or even a completely ridiculous theme. I&nbsp;can build the whole camera experience around&nbsp;it.</p>
      </div>

      <!-- Ready-made vs fully custom, same camera underneath -->
      <div class="compare">
        <figure class="compare-side">
          <div class="compare-phones compare-phones--pair compare-phones--mirror">
            <div class="fan fan-back"><PhoneFrame src="/showcase/caz-camera.png" url="caz-and-dan.onlinedisposablecamera.co.uk" alt="Caz and Dan's camera screen" /></div>
            <div class="fan fan-front"><PhoneFrame src="/theme-screens/classic-editorial.png" url="caz-and-dan.onlinedisposablecamera.co.uk" alt="Caz and Dan's wedding camera in the Classic Editorial theme" /></div>
          </div>
          <figcaption>
            <span class="compare-label">Ready-made theme</span>
            <strong>Caz &amp; Dan’s wedding</strong>
            <small>Classic Editorial, from £14.99</small>
          </figcaption>
        </figure>

        <div class="compare-link" aria-hidden="true">
          <span></span>
          <p>Same camera<br />underneath</p>
          <span></span>
        </div>

        <figure class="compare-side">
          <div class="compare-phones compare-phones--pair">
            <div class="fan fan-back"><PhoneFrame src="/showcase/sophie-camera.png" url="sophies-last-rodeo.party" alt="Sophie's Last Rodeo custom camera screen" /></div>
            <div class="fan fan-front"><PhoneFrame src="/showcase/sophie-landing.png" url="sophies-last-rodeo.party" alt="Sophie's Last Rodeo custom landing page" /></div>
          </div>
          <figcaption>
            <span class="compare-label compare-label--custom">Fully custom</span>
            <strong>Sophie’s Last Rodeo hen do</strong>
            <small>Bespoke design and its own domain, from £149</small>
          </figcaption>
        </figure>
      </div>

      <div class="points">
        <article v-for="point in points" :key="point.title">
          <i :class="point.icon" aria-hidden="true"></i>
          <h3>{{ point.title }}</h3>
          <p>{{ point.text }}</p>
        </article>
      </div>

      <div class="custom-cta">
        <p>Got an idea? Tell me about it and I’ll come back with a design direction and a quote.</p>
        <button type="button" @click="startEnquiry({ theme: 'Fully custom' })">
          Get a custom quote <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.compare {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: end;
  gap: 40px;
  margin-top: 72px;
}

.compare-side { margin: 0; }

.compare-phones {
  --phone-height: 440px;
  position: relative;
  display: flex;
  height: 540px;
  align-items: flex-end;
  justify-content: center;
}

.compare-phones :deep(.phone) {
  box-shadow:
    inset 0 0 0 calc(var(--u) * 2) #3a3a3c,
    0 calc(var(--u) * 30) calc(var(--u) * 70) rgba(0, 0, 0, .55);
}

.fan { position: absolute; bottom: 0; transition: transform 300ms cubic-bezier(.22,.8,.24,1); }
.fan-back { transform: translateX(28%) rotate(7deg); transform-origin: bottom center; }
.fan-front { transform: translateX(-26%) rotate(-3deg); transform-origin: bottom center; z-index: 2; }
.compare-phones--pair:hover .fan-back { transform: translateX(36%) rotate(10deg); }
.compare-phones--pair:hover .fan-front { transform: translateX(-32%) rotate(-5deg) translateY(-8px); }

/* Caz & Dan's pair fans the other way, so both sides open out from the middle. */
.compare-phones--mirror .fan-back { transform: translateX(-28%) rotate(-7deg); }
.compare-phones--mirror .fan-front { transform: translateX(26%) rotate(3deg); }
.compare-phones--mirror:hover .fan-back { transform: translateX(-36%) rotate(-10deg); }
.compare-phones--mirror:hover .fan-front { transform: translateX(32%) rotate(5deg) translateY(-8px); }

figcaption {
  display: grid;
  justify-items: center;
  gap: 4px;
  margin-top: 30px;
  text-align: center;
}

figcaption strong {
  font-family: 'Manrope', sans-serif;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
}

figcaption small { color: rgba(255, 255, 255, .55); font-size: 14px; }

.compare-label {
  margin-bottom: 8px;
  border: 1px solid rgba(255, 255, 255, .22);
  border-radius: 999px;
  padding: 6px 12px;
  color: rgba(255, 255, 255, .8);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .18em;
  text-transform: uppercase;
}

.compare-label--custom { border-color: #a98cff; background: rgba(169, 140, 255, .14); color: #cdbcff; }

.compare-link {
  display: flex;
  height: 540px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: rgba(255, 255, 255, .5);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .16em;
  line-height: 1.5;
  text-align: center;
  text-transform: uppercase;
}

.compare-link span { width: 1px; height: 70px; background: linear-gradient(transparent, rgba(255, 255, 255, .3), transparent); }
.compare-link p { margin: 0; }

.points {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin-top: 80px;
  overflow: hidden;
  border-radius: 24px;
  background: rgba(255, 255, 255, .1);
}

.points article { background: #161616; padding: 30px; }
.points i { color: #a98cff; font-size: 22px; }
.points h3 { margin: 26px 0 0; font-family: 'Manrope', sans-serif; font-size: 22px; font-weight: 800; letter-spacing: -0.03em; }
.points p { margin: 8px 0 0; color: rgba(255, 255, 255, .6); font-size: 14px; line-height: 1.65; }

.custom-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 28px;
  border-radius: 24px;
  background: #7437ff;
  padding: 26px 30px;
}

.custom-cta p { margin: 0; max-width: 560px; font-size: 17px; line-height: 1.55; }

.custom-cta button {
  display: inline-flex;
  min-height: 54px;
  flex: 0 0 auto;
  align-items: center;
  gap: 12px;
  border: 0;
  border-radius: 999px;
  background: #fff;
  padding: 0 24px;
  color: #101010;
  font-weight: 700;
  transition: transform 180ms ease;
}

.custom-cta button:hover { transform: translateY(-2px); }

@media (max-width: 1100px) {
  .compare-phones { --phone-height: 400px; height: 450px; }
  .compare-link { height: 450px; }
}

@media (max-width: 860px) {
  .compare { grid-template-columns: minmax(0, 1fr); gap: 48px; }
  .compare-link { height: auto; flex-direction: row; }
  .compare-link span { width: 60px; height: 1px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .3), transparent); }
  .compare-link br { display: none; }
  .points { grid-template-columns: minmax(0, 1fr); }
  .custom-cta { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 520px) {
  .compare-phones { --phone-height: 380px; height: 420px; }
  .fan-back { transform: translateX(22%) rotate(7deg); }
  .fan-front { transform: translateX(-20%) rotate(-3deg); }
  .compare-phones--mirror .fan-back { transform: translateX(-22%) rotate(-7deg); }
  .compare-phones--mirror .fan-front { transform: translateX(20%) rotate(3deg); }
}
</style>
