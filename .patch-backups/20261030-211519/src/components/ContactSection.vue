<script setup>
import { ref } from 'vue'
import { enquiry, eventTypes, guestOptions, themeOptions } from '@/data/enquiry.js'

const status = ref('idle') // idle | sending | sent | error
const errorMessage = ref('')

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
  <section id="contact" class="bg-[#7437ff] py-[110px] text-white">
    <div class="wrapper">
      <div class="section-wrap grid grid-cols-[0.8fr_1.2fr] gap-[70px] max-[900px]:grid-cols-1">
        <div>
          <p class="text-[11px] font-extrabold tracking-[0.2em] text-white/65">GET IN TOUCH</p>
          <h2 class="mt-[10px] font-display text-[clamp(50px,7vw,94px)] font-extrabold leading-[0.94] tracking-[-0.06em]">Tell me about your event.</h2>
          <p class="mt-[24px] max-w-[500px] text-[17px] leading-[1.7] text-white/75">Wedding, hen do, birthday or something completely different — send over the idea and I’ll come back to you with the right setup, usually within a day.</p>
        </div>

        <div v-if="status === 'sent'" class="rounded-[24px] bg-white/10 p-[34px]">
          <i class="fa-solid fa-circle-check text-[34px]" aria-hidden="true"></i>
          <h3 class="mt-[24px] font-display text-[40px] font-extrabold leading-none tracking-[-0.05em]">Thanks, {{ enquiry.name.split(' ')[0] || 'that’s sent' }}!</h3>
          <p class="mt-[14px] max-w-[460px] text-[16px] leading-[1.7] text-white/75">Your enquiry has arrived. I’ll reply to {{ enquiry.email }} shortly with the next steps for your camera.</p>
        </div>

        <form v-else class="contact-form" @submit.prevent="submitContact">
          <div class="grid grid-cols-2 gap-[14px] max-[620px]:grid-cols-1">
            <label><span>Name</span><input v-model.trim="enquiry.name" required maxlength="120" type="text" autocomplete="name" placeholder="Your name" /></label>
            <label><span>Email</span><input v-model.trim="enquiry.email" required maxlength="200" type="email" autocomplete="email" placeholder="you@example.com" /></label>
          </div>
          <div class="grid grid-cols-2 gap-[14px] max-[620px]:grid-cols-1">
            <label><span>Event date</span><input v-model="enquiry.eventDate" type="date" /></label>
            <label><span>Event type</span><select v-model="enquiry.eventType"><option v-for="option in eventTypes" :key="option">{{ option }}</option></select></label>
          </div>
          <div class="grid grid-cols-2 gap-[14px] max-[620px]:grid-cols-1">
            <label><span>Guests</span><select v-model="enquiry.guests"><option v-for="option in guestOptions" :key="option">{{ option }}</option></select></label>
            <label><span>Theme</span><select v-model="enquiry.theme"><option v-for="option in themeOptions" :key="option">{{ option }}</option></select></label>
          </div>
          <label><span>Tell me about it</span><textarea v-model="enquiry.message" required maxlength="4000" rows="5" placeholder="Names, venue, colours, number of photos per guest, custom ideas..."></textarea></label>

          <!-- Spam trap: hidden from people, bots tend to fill it in. -->
          <label class="enquiry-trap" aria-hidden="true"><span>Website</span><input v-model="enquiry.website" type="text" tabindex="-1" autocomplete="off" /></label>

          <button type="submit" :disabled="status === 'sending'">
            {{ status === 'sending' ? 'Sending…' : 'Send enquiry' }} <i class="fa-solid fa-arrow-right"></i>
          </button>

          <p v-if="status === 'error'" class="rounded-[14px] bg-white/10 p-[14px] text-[13px] leading-[1.6]" role="alert">
            {{ errorMessage }} You can also email <a class="underline" href="mailto:hello@onlinedisposablecamera.co.uk">hello@onlinedisposablecamera.co.uk</a>.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.enquiry-trap { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.contact-form > button:disabled { cursor: wait; opacity: .7; }
</style>
