<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PhoneFrame from '@/components/PhoneFrame.vue'

const guestPoints = [
  { icon: 'fa-solid fa-qrcode', title: 'Scan and shoot', text: 'No app, no sign-up. The camera opens straight in their phone’s browser.' },
  { icon: 'fa-solid fa-film', title: 'A real roll of film', text: '25 shots each. No previews, no retakes, so every photo counts.' },
  { icon: 'fa-solid fa-bolt', title: 'Works after dark', text: 'Flash on the back camera, and a bright screen flash for selfies.' },
]

const hostPoints = [
  { icon: 'fa-solid fa-lock', title: 'The big reveal', text: 'Photos stay hidden until the morning after, or whenever you choose.' },
  { icon: 'fa-solid fa-file-zipper', title: 'Everything in one go', text: 'Download every photo as one ZIP, even on an iPhone.' },
  { icon: 'fa-solid fa-share-nodes', title: 'Share with guests', text: 'Switch on a secret gallery link for guests, and off again any time.' },
]

// The dashboard mock flips between "locked" and "open" to show the reveal.
const unlocked = ref(false)
let timer = 0

onMounted(() => {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    unlocked.value = true
    return
  }
  timer = window.setInterval(() => { unlocked.value = !unlocked.value }, 3200)
})

onBeforeUnmount(() => window.clearInterval(timer))
</script>

<template>
  <section id="features" class="both py-[110px]">
    <div class="wrapper">
      <div class="section-heading">
        <div>
          <p class="section-kicker">INCLUDED AS STANDARD</p>
          <h2>Simple on both sides.</h2>
        </div>
        <p>Guests get a camera in seconds. You get every photo, revealed when you’re ready.</p>
      </div>

      <div class="sides">
        <!-- Guests -->
        <article class="side side--guest">
          <p class="side-label">For your guests</p>
          <div class="side-visual side-visual--phone">
            <PhoneFrame src="/showcase/caz-camera.png" url="caz-and-dan.onlinedisposablecamera.co.uk" alt="The guest camera screen" />
          </div>
          <ul class="points">
            <li v-for="point in guestPoints" :key="point.title">
              <i :class="point.icon" aria-hidden="true"></i>
              <div><strong>{{ point.title }}</strong><span>{{ point.text }}</span></div>
            </li>
          </ul>
        </article>

        <!-- Organiser -->
        <article class="side side--host">
          <p class="side-label">For you</p>
          <div class="side-visual">
            <div class="dash" aria-label="Example organiser dashboard" role="img">
              <div class="dash-bar" aria-hidden="true">
                <span></span><span></span><span></span>
                <em>caz-and-dan.onlinedisposablecamera.co.uk/admin</em>
              </div>

              <div class="dash-body">
                <div class="dash-head">
                  <small>CAZ &amp; DAN · 10.10.26</small>
                  <strong>Overview</strong>
                </div>

                <div class="dash-stats">
                  <div><small>PARTICIPANTS</small><strong>84</strong></div>
                  <div><small>PHOTOS TAKEN</small><strong>1,912</strong></div>
                </div>

                <div class="dash-gallery" :class="{ open: unlocked }">
                  <div>
                    <small>PHOTO GALLERY</small>
                    <strong>{{ unlocked ? 'Gallery open' : 'Gallery locked' }}</strong>
                    <span>{{ unlocked ? '1,912 photographs' : 'Opens 11 October at 9:00am' }}</span>
                  </div>
                  <i v-if="unlocked" key="open" class="fa-solid fa-arrow-right"></i>
                  <i v-else key="locked" class="fa-solid fa-lock"></i>
                </div>

                <div class="dash-row">
                  <div>
                    <small>GUEST GALLERY</small>
                    <span>Share a secret link with guests</span>
                  </div>
                  <span class="dash-toggle" :class="{ on: unlocked }"><b></b></span>
                </div>

                <div class="dash-zip" :class="{ ready: unlocked }">
                  <i class="fa-solid fa-file-zipper"></i> Download all as ZIP
                </div>
              </div>
            </div>
          </div>
          <ul class="points">
            <li v-for="point in hostPoints" :key="point.title">
              <i :class="point.icon" aria-hidden="true"></i>
              <div><strong>{{ point.title }}</strong><span>{{ point.text }}</span></div>
            </li>
          </ul>
        </article>
      </div>

      <!-- Event link strip (replaces the old "Your event link" section) -->
      <div class="link-strip">
        <i class="fa-solid fa-qrcode" aria-hidden="true"></i>
        <div>
          <strong><b>your-event</b>.<wbr />onlinedisposablecamera.co.uk</strong>
          <span>Your own link and QR code. They never change, so they’re safe to print on invitations, table cards and signs. A custom domain is available too.</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.both { border-top: 1px solid rgba(16, 16, 16, .1); background: rgba(255, 255, 255, .35); }

.sides {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 58px;
}

.side {
  min-width: 0;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  padding: 30px;
}

.side--guest { border: 1px solid rgba(16, 16, 16, .1); background: #fff; }
.side--host { background: #101010; color: #fff; }

.side-label {
  margin: 0;
  color: #7437ff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .2em;
  text-transform: uppercase;
}

.side--host .side-label { color: #a98cff; }

.side-visual {
  display: flex;
  height: 470px;
  margin: 26px 0 30px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  background: #f4f1ea;
}

.side--host .side-visual { background: #1c1c1c; }
.side--host .side-visual { height: auto; min-height: 470px; padding: 26px; }
.side-visual--phone { --phone-height: 460px; align-items: flex-end; overflow: hidden; padding-top: 30px; }
.side-visual--phone :deep(.phone) { margin-bottom: -60px; }

.points { display: grid; gap: 18px; margin: auto 0 0; padding: 0; list-style: none; }
.points li { display: flex; gap: 14px; }
.points i { width: 22px; flex: 0 0 22px; margin-top: 3px; color: #7437ff; font-size: 17px; text-align: center; }
.side--host .points i { color: #a98cff; }
.points strong { display: block; font-family: 'Manrope', sans-serif; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
.points span { display: block; margin-top: 3px; color: #68645f; font-size: 14px; line-height: 1.55; }
.side--host .points span { color: rgba(255, 255, 255, .6); }

/* Dashboard mock, styled after the real Caz & Dan admin */
.dash {
  width: min(100%, 440px);
  overflow: hidden;
  border-radius: 16px;
  background: #f7f5ef;
  color: #111;
  box-shadow: 0 30px 70px rgba(0, 0, 0, .45);
}

.dash-bar { display: flex; align-items: center; gap: 6px; padding: 10px 14px; background: #e8e5dd; }
.dash-bar > span { width: 9px; height: 9px; border-radius: 50%; background: #c9c5bb; }
.dash-bar em { min-width: 0; flex: 1; margin-left: 10px; overflow: hidden; color: #77736c; font-size: 11px; font-style: normal; white-space: nowrap; text-overflow: ellipsis; }

.dash-body { display: grid; gap: 10px; padding: 18px; }
.dash small { display: block; font-size: 8px; font-weight: 700; letter-spacing: .2em; }
.dash-head strong { display: block; margin-top: 4px; font: 400 30px/1 Georgia, serif; }

.dash-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.dash-stats > div { border: 1px solid #d8d5cd; border-radius: 10px; padding: 12px 14px; }
.dash-stats strong { display: block; margin-top: 14px; font: 400 36px/1 Georgia, serif; }

.dash-gallery {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d8d5cd;
  border-radius: 10px;
  background: #f2f0ea;
  padding: 14px;
  color: #8b877f;
  transition: background 400ms ease, color 400ms ease, border-color 400ms ease;
}

.dash-gallery strong { display: block; margin-top: 4px; font: 400 22px/1.1 Georgia, serif; }
.dash-gallery span { display: block; margin-top: 3px; font-size: 11px; }
.dash-gallery i { font-size: 18px; }
.dash-gallery.open { border-color: #111; background: #111; color: #fff; }

.dash-row { display: flex; align-items: center; justify-content: space-between; border: 1px solid #d8d5cd; border-radius: 10px; background: #fff; padding: 12px 14px; }
.dash-row span { display: block; margin-top: 3px; color: #716f69; font-size: 11px; }

.dash-toggle { position: relative; width: 44px; height: 24px; flex: 0 0 auto; border-radius: 999px; background: #dedbd3; transition: background 400ms ease; }
.dash-toggle b { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0, 0, 0, .2); transition: transform 400ms ease; }
.dash-toggle.on { background: #111; }
.dash-toggle.on b { transform: translateX(20px); }

.dash-zip { border-radius: 10px; background: #e3e0d8; padding: 12px; color: #9c988f; font-size: 12px; font-weight: 700; text-align: center; transition: background 400ms ease, color 400ms ease; }
.dash-zip i { margin-right: 6px; }
.dash-zip.ready { background: #7437ff; color: #fff; }

/* Link strip */
.link-strip {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-top: 24px;
  border: 1px solid rgba(116, 55, 255, .2);
  border-radius: 24px;
  background: rgba(116, 55, 255, .05);
  padding: 24px 28px;
}

.link-strip > i { color: #7437ff; font-size: 34px; }
.link-strip strong { display: block; overflow-wrap: break-word; font-family: 'Manrope', sans-serif; font-size: clamp(18px, 2vw, 26px); font-weight: 800; letter-spacing: -0.03em; }
.link-strip strong b { color: #7437ff; font-weight: inherit; }
.link-strip span { display: block; margin-top: 6px; color: #5f5b56; font-size: 14px; line-height: 1.55; }

@media (max-width: 960px) {
  .sides { grid-template-columns: minmax(0, 1fr); }
}

@media (max-width: 620px) {
  .side { padding: 18px; }
  .side--host .side-visual { padding: 12px; }
  .dash-body { padding: 14px; }
  .side-visual { height: 400px; }
  .side--host .side-visual { height: auto; min-height: 0; padding: 18px; }
  .side-visual--phone { --phone-height: 400px; }
  .dash-head strong { font-size: 24px; }
  .dash-stats strong { font-size: 28px; }
  .link-strip { align-items: flex-start; flex-direction: column; gap: 14px; }
}
</style>
