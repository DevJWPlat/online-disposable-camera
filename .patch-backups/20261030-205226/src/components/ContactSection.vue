<script setup>
import { ref } from 'vue'
const contactSent = ref(false)
function submitContact() { contactSent.value = true }
</script>

<template>
  <section id="contact" class="bg-[#7437ff] py-[110px] text-white">
    <div class="wrapper">
      <div class="section-wrap grid grid-cols-[0.8fr_1.2fr] gap-[70px] max-[900px]:grid-cols-1">
        <div><p class="text-[11px] font-extrabold tracking-[0.2em] text-white/65">GET IN TOUCH</p><h2 class="mt-[10px] font-display text-[clamp(50px,7vw,94px)] font-extrabold leading-[0.94] tracking-[-0.06em]">Tell me about your event.</h2><p class="mt-[24px] max-w-[500px] text-[17px] leading-[1.7] text-white/75">Wedding, hen do, birthday or something completely different — send over the idea and I can recommend the right setup.</p></div>
        <form class="contact-form" @submit.prevent="submitContact">
          <div class="grid grid-cols-2 gap-[14px] max-[620px]:grid-cols-1"><label><span>Name</span><input required type="text" placeholder="Your name" /></label><label><span>Email</span><input required type="email" placeholder="you@example.com" /></label></div>
          <div class="grid grid-cols-2 gap-[14px] max-[620px]:grid-cols-1"><label><span>Event date</span><input type="date" /></label><label><span>Event type</span><select><option>Wedding</option><option>Hen do</option><option>Birthday</option><option>Party</option><option>Corporate event</option><option>Something else</option></select></label></div>
          <label><span>Tell me about it</span><textarea required rows="5" placeholder="Theme, colours, venue, number of guests, custom ideas..."></textarea></label>
          <button type="submit">Send enquiry <i class="fa-solid fa-arrow-right"></i></button>
          <p v-if="contactSent" class="rounded-[14px] bg-white/10 p-[14px] text-[13px] leading-[1.6]">The form layout is ready. We’ll connect the real email delivery before launch so enquiries actually arrive in your inbox.</p>
        </form>
      </div>
    </div>
  </section>
</template>
