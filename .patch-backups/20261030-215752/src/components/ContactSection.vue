<script setup>
import { ref } from 'vue'
import { enquiry, eventTypes, guestOptions, themeOptions } from '@/data/enquiry.js'

const status = ref('idle') // idle | sending | sent | error
const errorMessage = ref('')

const nextSteps = [
  { title: 'I reply within a day', text: 'With ideas for your design and the right setup for your guests.' },
  { title: 'You approve and pay', text: 'Once you’re happy, I send a secure payment link. Pay once, no subscription.' },
  { title: 'Get your link and QR code', text: 'Ready to print on invites, table cards and signs.' },
]

async function submitContact() {
  if (status.value === 'sending') return

  status.value = 'sending'
  errorMessage.value = ''

  try {
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
    })
    const data = await response.json().catch(() => null)
    if (!response.ok || !data?.ok) throw new Error(data?.error || 'Something went wrong sending your enquiry.')
    status.value = 'sent'
  } catch (err) {
    status.value = 'error'
    errorMessage.value = err?.message || 'Something went wrong sending your enquiry.'
  }
}
</script>

<template>
  <section id="contact" class="contact py-[110px] text-white">
    <div class="wrapper">
      <div class="contact-layout">
        <div class="contact-intro">
          <p class="kicker">GET IN TOUCH</p>
          <h2>Tell me about your event.</h2>
          <p class="lead">Wedding, hen do, birthday or something completely different? Send over the idea and I’ll come back to you with the right setup.</p>

          <ol class="steps">
            <li v-for="(step, index) in nextSteps" :key="step.title">
              <span>{{ index + 1 }}</span>
              <div><strong>{{ step.title }}</strong><p>{{ step.text }}</p></div>
            </li>
          </ol>

          <p class="email-fallback">
            Prefer email? <a href="mailto:hello@onlinedisposablecamera.co.uk">hello@onlinedisposablecamera.co.uk</a>
          </p>
        </div>

        <div class="card">
          <div v-if="status === 'sent'" class="sent">
            <span class="sent-icon"><i class="fa-solid fa-check" aria-hidden="true"></i></span>
            <h3>Thanks, {{ enquiry.name.split(' ')[0] || 'that’s sent' }}!</h3>
            <p>Your enquiry has arrived. I’ll reply to <strong>{{ enquiry.email }}</strong> within a day with the next steps for your camera.</p>
          </div>

          <form v-else class="form" novalidate @submit.prevent="submitContact">
            <div class="row">
              <label class="field">
                <span>Your name</span>
                <input v-model.trim="enquiry.name" required maxlength="120" type="text" autocomplete="name" placeholder="Jo Bloggs" />
              </label>
              <label class="field">
                <span>Email</span>
                <input v-model.trim="enquiry.email" required maxlength="200" type="email" autocomplete="email" placeholder="you@example.com" />
              </label>
            </div>

            <fieldset class="field">
              <legend>What are you celebrating?</legend>
              <div class="chips">
                <button
                  v-for="type in eventTypes"
                  :key="type"
                  type="button"
                  :class="{ active: enquiry.eventType === type }"
                  :aria-pressed="enquiry.eventType === type"
                  @click="enquiry.eventType = type"
                >{{ type }}</button>
              </div>
            </fieldset>

            <div class="row row--three">
              <label class="field">
                <span>Event date</span>
                <input v-model="enquiry.eventDate" type="date" />
              </label>
              <label class="field">
                <span>Guests</span>
                <span class="select"><select v-model="enquiry.guests"><option v-for="option in guestOptions" :key="option">{{ option }}</option></select><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></span>
              </label>
              <label class="field">
                <span>Theme</span>
                <span class="select"><select v-model="enquiry.theme"><option v-for="option in themeOptions" :key="option">{{ option }}</option></select><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></span>
              </label>
            </div>

            <label class="field">
              <span>Anything else? <em>(optional)</em></span>
              <textarea v-model="enquiry.message" maxlength="4000" rows="4" placeholder="Names, venue, colours, photos per guest, custom ideas..."></textarea>
            </label>

            <!-- Spam trap: hidden from people, bots tend to fill it in. -->
            <label class="trap" aria-hidden="true"><span>Website</span><input v-model="enquiry.website" type="text" tabindex="-1" autocomplete="off" /></label>

            <p v-if="status === 'error'" class="error" role="alert">
              {{ errorMessage }} You can also email <a href="mailto:hello@onlinedisposablecamera.co.uk">hello@onlinedisposablecamera.co.uk</a>.
            </p>

            <button class="submit" type="submit" :disabled="status === 'sending' || !enquiry.name || !enquiry.email">
              {{ status === 'sending' ? 'Sending…' : 'Send enquiry' }}
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
            <p class="small-print">No commitment. I’ll only use your details to reply to you.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact { background: #7437ff; }

.contact-layout {
  display: grid;
  grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr);
  gap: 70px;
  align-items: start;
}

.kicker { margin: 0; color: rgba(255, 255, 255, .7); font-size: 12px; font-weight: 800; letter-spacing: 4.6px; }

.contact-intro h2 {
  margin: 12px 0 0;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(48px, 5.6vw, 84px);
  font-weight: 800;
  line-height: .96;
  letter-spacing: -0.055em;
}

.lead { margin: 22px 0 0; max-width: 480px; color: rgba(255, 255, 255, .8); font-size: 17px; line-height: 1.65; }

.steps { display: grid; gap: 18px; margin: 38px 0 0; padding: 0; list-style: none; }
.steps li { display: flex; gap: 16px; }
.steps li > span {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, .16);
  font-size: 14px;
  font-weight: 800;
}
.steps strong { display: block; font-size: 16px; }
.steps p { margin: 3px 0 0; color: rgba(255, 255, 255, .7); font-size: 14px; line-height: 1.55; }

.email-fallback { margin: 34px 0 0; color: rgba(255, 255, 255, .7); font-size: 14px; }
.email-fallback a { color: #fff; font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }

/* White form card */
.card {
  border-radius: 28px;
  background: #fff;
  padding: 34px;
  color: #101010;
  box-shadow: 0 30px 80px rgba(40, 10, 110, .35);
}

.form { display: grid; gap: 20px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.row--three { grid-template-columns: 1fr 1fr 1fr; }

.field { display: grid; gap: 8px; min-width: 0; margin: 0; border: 0; padding: 0; }
.field > span,
.field legend { padding: 0; color: #3d3a36; font-size: 13px; font-weight: 700; }
.field em { color: #8a857e; font-style: normal; font-weight: 500; }

.field input,
.field select,
.field textarea {
  width: 100%;
  min-height: 52px;
  border: 1px solid #dcd8d0;
  border-radius: 14px;
  outline: 0;
  background: #faf9f6;
  padding: 0 14px;
  color: #101010;
  font-size: 15px;
  transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

.field textarea { padding-top: 14px; padding-bottom: 14px; resize: vertical; }
.field input::placeholder,
.field textarea::placeholder { color: #a29d95; }

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: #7437ff;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(116, 55, 255, .14);
}

.select { position: relative; display: block; }
.select select { appearance: none; -webkit-appearance: none; padding-right: 40px; cursor: pointer; }
.select i { position: absolute; top: 50%; right: 15px; transform: translateY(-50%); color: #68645f; font-size: 12px; pointer-events: none; }

.chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.chips button {
  min-height: 42px;
  border: 1px solid #dcd8d0;
  border-radius: 999px;
  background: #faf9f6;
  padding: 0 16px;
  color: #3d3a36;
  font-size: 14px;
  font-weight: 600;
  transition: background 160ms ease, border-color 160ms ease, color 160ms ease;
}
.chips button:hover { border-color: #7437ff; }
.chips button.active { border-color: #7437ff; background: #7437ff; color: #fff; }

.trap { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }

.error { margin: 0; border-radius: 12px; background: #fdecee; padding: 12px 14px; color: #9b2335; font-size: 13px; line-height: 1.55; }
.error a { font-weight: 700; text-decoration: underline; }

.submit {
  display: flex;
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  border: 0;
  border-radius: 999px;
  background: #7437ff;
  padding: 0 26px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  transition: transform 180ms ease, background 180ms ease, opacity 180ms ease;
}
.submit:hover:not(:disabled) { transform: translateY(-2px); background: #6128ec; }
.submit:disabled { cursor: not-allowed; opacity: .45; }

.small-print { margin: -6px 0 0; color: #8a857e; font-size: 12px; text-align: center; }

.sent { display: grid; justify-items: start; gap: 14px; padding: 20px 4px; }
.sent-icon { display: grid; width: 56px; height: 56px; place-items: center; border-radius: 50%; background: #efe5ff; color: #7437ff; font-size: 22px; }
.sent h3 { margin: 8px 0 0; font-family: 'Manrope', sans-serif; font-size: 38px; font-weight: 800; line-height: 1; letter-spacing: -0.05em; }
.sent p { margin: 0; max-width: 460px; color: #5f5b56; font-size: 16px; line-height: 1.65; }

@media (max-width: 960px) {
  .contact-layout { grid-template-columns: 1fr; gap: 44px; }
}

@media (max-width: 620px) {
  .card { padding: 22px; border-radius: 22px; }
  .row, .row--three { grid-template-columns: 1fr; }
}
</style>
