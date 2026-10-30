<script setup>
import PhoneFrame from '@/components/PhoneFrame.vue'

function scrollTo(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

const heroFeatures = [
  ['fa-regular fa-camera', '25 photos', 'per guest'],
  ['fa-regular fa-mobile-screen-button', 'iPhone & Android', 'works on both'],
  ['fa-regular fa-link', 'No app', 'scan and shoot'],
  ['fa-regular fa-lock', 'Private', 'event gallery'],
]
</script>

<template>
  <section class="hero">
    <div class="wrapper hero-grid">
      <div class="hero-copy">
        <p class="hero-eyebrow">CAPTURE THE REAL MOMENTS</p>
        <h1>Disposable camera vibes.</h1>
        <p class="hero-sub">No app download required.</p>
        <p class="hero-text">Give your guests a simple way to capture your event. They scan a QR code, take their photos, and you get a private gallery to relive every moment.</p>

        <div class="hero-actions">
          <button class="btn-primary" type="button" @click="scrollTo('#themes')">View themes <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
          <button class="btn-secondary" type="button" @click="scrollTo('#contact')">Get in touch</button>
        </div>

        <ul class="hero-features">
          <li v-for="feature in heroFeatures" :key="feature[1]">
            <i :class="feature[0]" aria-hidden="true"></i>
            <span><strong>{{ feature[1] }}</strong><small>{{ feature[2] }}</small></span>
          </li>
        </ul>
      </div>

      <div class="hero-stage" aria-label="Example disposable cameras: a ready-made wedding theme and a custom hen do design">
        <div class="hero-phone hero-phone--back">
          <PhoneFrame src="/showcase/sophie-landing.png" url="sophies-last-rodeo.party" alt="Sophie's Last Rodeo custom camera" />
        </div>
        <div class="hero-phone hero-phone--front">
          <PhoneFrame src="/theme-screens/classic-editorial.png" url="caz-and-dan.onlinedisposablecamera.co.uk" alt="Caz and Dan's wedding camera" />
        </div>

        <p class="hero-note hero-note--left" aria-hidden="true">
          Different themes,<br />same great experience.
          <svg viewBox="0 0 65.2 43.7"><path d="M1.2.7c1.5,11.6,7.3,23.2,17.5,29.1,5.9,3.4,12.9,4.8,19.8,4.4,7.7-.4,15.2-2.8,22.4-5.4-3.3-1.3-6.6-2.6-10-3.9-.6-.2-1.4-.6-1.4-1.3,0-.6.5-1.1,1.1-1.2s1.2,0,1.7.2c4.4,1.4,8.8,3.1,12.9,5.2-1.2,5.1-3,10.1-5.5,14.7-.3.5-.6,1.1-1.2,1.3-.8.2-1.5-.5-1.6-1.3s.2-1.5.4-2.2c1.3-3.2,2.6-6.3,4.2-9.3-6.3,3.2-13,5.7-20,6.6s-14.3.2-20.7-2.7c-6.4-2.9-11.7-8-15.3-14.1-1.9-3.3-3.4-7-4.3-10.7S.5,6.3.3,4.4,0,2.4,0,1.5c0-.2,0-.5,0-.7s.1-.4.3-.5S1.1-.1,1.2,0c0,.2,0,.4,0,.6Z"/></svg>
        </p>
        <p class="hero-note hero-note--right" aria-hidden="true">
          Fully custom<br />designs available
          <svg viewBox="0 0 73 32.9"><path d="M72,16.4c-8.1,8.5-19.7,14.2-31.4,12.9-6.8-.8-13.2-3.9-18.5-8.2-6-4.9-10.5-11.3-14.8-17.7,3.4.9,6.9,1.9,10.3,2.8.7.2,1.5.3,1.9-.2.4-.4.3-1.2-.1-1.6s-1-.7-1.5-.9C13.6,2,9,.8,4.5,0,2.3,4.8.9,9.9,0,15.1c0,.6-.2,1.3.2,1.7.5.6,1.5.4,2.1,0s.8-1.3,1-2.1c.9-3.3,1.6-6.6,2.2-9.9,3.1,6.3,7,12.3,12.1,17.2,5.1,4.9,11.3,8.7,18.2,10.2,6.9,1.5,14.2.5,20.7-2.2,3.6-1.5,6.9-3.6,9.8-6.1s2.8-2.5,4.1-3.9,1.4-1.4,1.9-2.2c.1-.2.3-.3.4-.6s.1-.4,0-.6-.4-.8-.5-.7c-.1.2-.3.3-.4.5Z"/></svg>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 70px 0 120px; }

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
  align-items: center;
  gap: 40px;
}

.hero-eyebrow { margin: 0 0 18px; color: #7437ff; font-size: 13px; font-weight: 800; letter-spacing: .3em; }

.hero h1 {
  margin: 0;
  max-width: 640px;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(50px, 6.6vw, 98px);
  font-weight: 800;
  line-height: .9;
  letter-spacing: -0.06em;
  text-wrap: balance;
}

.hero-sub {
  margin: 14px 0 0;
  font-size: clamp(26px, 3.1vw, 48px);
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.hero-text { margin: 26px 0 0; max-width: 560px; color: #5f5b56; font-size: clamp(16px, 1.4vw, 19px); line-height: 1.6; }

.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }

.btn-primary,
.btn-secondary {
  display: inline-flex;
  min-height: 58px;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 999px;
  padding: 0 28px;
  font-size: 16px;
  font-weight: 700;
  transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
}

.btn-primary { border: 0; background: #7437ff; color: #fff; }
.btn-primary:hover { transform: translateY(-2px); background: #6128ec; }
.btn-secondary { border: 2px solid rgba(16, 16, 16, .2); background: transparent; color: #101010; }
.btn-secondary:hover { transform: translateY(-2px); border-color: #101010; }

.hero-features {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin: 56px 0 0;
  padding: 0;
  list-style: none;
}

.hero-features li { display: flex; align-items: center; gap: 12px; min-width: 0; }
.hero-features i { flex: 0 0 auto; width: 28px; font-size: 24px; text-align: center; }
.hero-features span { display: grid; min-width: 0; }
.hero-features strong { font-size: 13px; line-height: 1.25; }
.hero-features small { color: #68645f; font-size: 13px; line-height: 1.25; }

/* Two phones, fanned */
.hero-stage {
  position: relative;
  height: 640px;
}

.hero-phone { position: absolute; bottom: 20px; left: 50%; --phone-height: 560px; }
.hero-phone--front { z-index: 2; transform: translateX(-82%) rotate(-5deg); }
.hero-phone--back { z-index: 1; transform: translateX(-12%) rotate(8deg); }

.hero-phone :deep(.phone) {
  box-shadow:
    inset 0 0 0 calc(var(--u) * 2) #3a3a3c,
    0 calc(var(--u) * 34) calc(var(--u) * 70) rgba(25, 20, 38, .22);
}

.hero-note {
  position: absolute;
  z-index: 3;
  margin: 0;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.hero-note svg { position: absolute; width: 64px; fill: currentColor; }
/* Each arrow sits under its note and curves towards the phones, as in the original design. */
.hero-note--left { top: -30px; left: -10px; width: 300px; transform: rotate(-8deg); }
.hero-note--left svg { top: calc(100% + 2px); left: 40%; transform: rotate(18deg); }
/* Sits under Sophie's phone; the arrow curves up into it. */
.hero-note--right { right: 0; bottom: -46px; width: 230px; text-align: right; transform: rotate(-5deg); }
.hero-note--right svg { right: 62%; bottom: calc(100% + 4px); transform: rotate(-4deg); }

@media (max-width: 1200px) {
  .hero-phone { --phone-height: 500px; }
  .hero-stage { height: 580px; }
  .hero-features { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hero-note--left { left: 0; }
}

@media (max-width: 1000px) {
  .hero { padding-top: 48px; }
  .hero-grid { grid-template-columns: minmax(0, 1fr); gap: 20px; }
  .hero-stage { height: 560px; }
  .hero-phone { --phone-height: 480px; }
  .hero-note { display: none; }
}

@media (max-width: 620px) {
  .hero { padding: 36px 0 60px; }
  .hero-actions { flex-direction: column; }
  .btn-primary, .btn-secondary { width: 100%; }
  .hero-features { gap: 18px 14px; margin-top: 40px; }
  .hero-stage { height: 440px; }
  .hero-phone { --phone-height: 380px; bottom: 10px; }
  .hero-phone--front { transform: translateX(-78%) rotate(-5deg); }
  .hero-phone--back { transform: translateX(-18%) rotate(7deg); }
}
</style>
