<script setup>
import { computed } from 'vue'
import brandLogo from '@/assets/brand/logo-long.png'
import { contactEmail, navItems, socialLinks } from '@/data/site.js'
import { startEnquiry } from '@/data/enquiry.js'

const currentYear = new Date().getFullYear()
const socials = computed(() => socialLinks.filter((link) => link.url))

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer-hero">
        <p class="footer-line">Every guest gets a camera.<br /><span>You get every photo.</span></p>
        <button class="footer-cta" type="button" @click="startEnquiry({})">
          Book your camera <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>

      <div class="footer-main">
        <div class="footer-brand">
          <img :src="brandLogo" alt="Online Disposable Camera" />
          <p>A disposable camera for your event, built for the phones already in your guests’ hands. No app needed.</p>
          <div v-if="socials.length" class="socials">
            <a v-for="link in socials" :key="link.name" :href="link.url" target="_blank" rel="noopener" :aria-label="link.name">
              <i :class="link.icon" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <nav class="footer-col" aria-label="Footer">
          <p class="footer-heading">Explore</p>
          <a v-for="item in navItems" :key="item[0]" :href="item[1]">{{ item[0] }}</a>
        </nav>

        <div class="footer-col">
          <p class="footer-heading">Get in touch</p>
          <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
          <a href="#contact">Send an enquiry</a>
          <p class="footer-note">I usually reply within a day.</p>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© {{ currentYear }} Online Disposable Camera</span>
        <nav class="legal" aria-label="Legal">
          <a href="/privacy.html">Privacy policy</a>
          <a href="/terms.html">Terms</a>
        </nav>
        <button type="button" @click="backToTop">Back to top <i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: #101010; color: #fff; }

.footer-hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  padding: 90px 0 64px;
  border-bottom: 1px solid rgba(255, 255, 255, .1);
}

.footer-line {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(40px, 5.6vw, 84px);
  font-weight: 800;
  line-height: .98;
  letter-spacing: -0.055em;
}

.footer-line span { color: #a98cff; }

.footer-cta {
  display: inline-flex;
  min-height: 58px;
  flex: 0 0 auto;
  align-items: center;
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

.footer-cta:hover { transform: translateY(-2px); background: #6128ec; }

.footer-main {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, .7fr) minmax(0, 1fr);
  gap: 48px;
  padding: 56px 0;
}

.footer-brand img { width: 240px; height: auto; filter: brightness(0) invert(1); }
.footer-brand p { margin: 18px 0 0; max-width: 400px; color: rgba(255, 255, 255, .55); font-size: 14px; line-height: 1.65; }

.socials { display: flex; gap: 10px; margin-top: 22px; }
.socials a {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 50%;
  font-size: 17px;
  transition: background 160ms ease, border-color 160ms ease;
}
.socials a:hover { border-color: #7437ff; background: #7437ff; }

.footer-col { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
.footer-heading { margin: 0 0 4px; color: rgba(255, 255, 255, .45); font-size: 11px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; }
.footer-col a { color: rgba(255, 255, 255, .85); font-size: 15px; transition: color 160ms ease; }
.footer-col a:hover { color: #a98cff; }
.footer-note { margin: 0; color: rgba(255, 255, 255, .45); font-size: 13px; }

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid rgba(255, 255, 255, .1);
  padding: 22px 0 28px;
  color: rgba(255, 255, 255, .45);
  font-size: 13px;
}

.footer-bottom button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  padding: 0;
  color: rgba(255, 255, 255, .7);
  font-size: 13px;
  font-weight: 600;
}

.footer-bottom button:hover { color: #fff; }
.legal { display: flex; gap: 20px; margin-left: auto; margin-right: 28px; }
.legal a { color: rgba(255, 255, 255, .7); transition: color 160ms ease; }
.legal a:hover { color: #fff; }

@media (max-width: 620px) {
  .footer-bottom { flex-wrap: wrap; }
  .legal { order: 3; width: 100%; margin: 0; }
}

@media (max-width: 900px) {
  .footer-hero { align-items: flex-start; flex-direction: column; padding-top: 70px; }
  .footer-main { grid-template-columns: 1fr 1fr; }
  .footer-brand { grid-column: 1 / -1; }
}

@media (max-width: 520px) {
  .footer-main { grid-template-columns: 1fr; gap: 36px; }
}
</style>
