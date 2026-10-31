<script setup>
import { ref } from 'vue'
import { faqs } from '@/data/site.js'
import { startEnquiry } from '@/data/enquiry.js'

const openFaq = ref(0)

function toggle(index) {
  openFaq.value = openFaq.value === index ? -1 : index
}
</script>

<template>
  <section id="faq" class="py-[110px]">
    <div class="wrapper">
      <div class="faq-layout">
        <aside class="faq-intro">
          <p class="section-kicker">FAQ</p>
          <h2>Questions, answered.</h2>
          <p class="faq-lead">Everything people usually ask before booking a camera for their event.</p>

          <div class="faq-ask faq-ask--desktop">
            <i class="fa-solid fa-comment-dots" aria-hidden="true"></i>
            <div>
              <strong>Still got a question?</strong>
              <p>Send it over and I’ll get back to you within 3 working days.</p>
              <button type="button" @click="startEnquiry({})">Ask a question <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
            </div>
          </div>
        </aside>

        <div class="faq-list">
          <article v-for="(faq, index) in faqs" :key="faq[0]" class="faq-item" :class="{ open: openFaq === index }">
            <h3>
              <button
                :id="`faq-q-${index}`"
                type="button"
                :aria-expanded="openFaq === index"
                :aria-controls="`faq-a-${index}`"
                @click="toggle(index)"
              >
                <span>{{ faq[0] }}</span>
                <i class="fa-solid fa-plus" aria-hidden="true"></i>
              </button>
            </h3>
            <div :id="`faq-a-${index}`" class="faq-answer" role="region" :aria-labelledby="`faq-q-${index}`">
              <div><p>{{ faq[1] }}</p></div>
            </div>
          </article>

          <div class="faq-ask faq-ask--mobile">
            <i class="fa-solid fa-comment-dots" aria-hidden="true"></i>
            <div>
              <strong>Still got a question?</strong>
              <p>Send it over and I’ll get back to you within 3 working days.</p>
              <button type="button" @click="startEnquiry({})">Ask a question <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-layout {
  display: grid;
  grid-template-columns: minmax(0, .8fr) minmax(0, 1.3fr);
  gap: 80px;
  align-items: start;
}

.faq-intro { position: sticky; top: 40px; }

.faq-intro h2 {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(48px, 5.4vw, 80px);
  font-weight: 800;
  line-height: .98;
  letter-spacing: -0.055em;
}

.faq-lead { margin: 22px 0 0; max-width: 420px; color: #68645f; font-size: 16px; line-height: 1.7; }

.faq-ask {
  display: flex;
  gap: 16px;
  max-width: 420px;
  margin-top: 36px;
  border: 1px solid rgba(116, 55, 255, .18);
  border-radius: 22px;
  background: rgba(116, 55, 255, .05);
  padding: 22px;
}

.faq-ask > i { margin-top: 2px; color: #7437ff; font-size: 22px; }
.faq-ask strong { display: block; font-family: 'Manrope', sans-serif; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
.faq-ask p { margin: 6px 0 0; color: #68645f; font-size: 14px; line-height: 1.55; }

.faq-ask button {
  display: inline-flex;
  margin-top: 14px;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  padding: 0;
  color: #7437ff;
  font-size: 14px;
  font-weight: 700;
}

.faq-ask button i { transition: transform 180ms ease; }
.faq-ask button:hover i { transform: translateX(4px); }

.faq-list { border-top: 1px solid rgba(16, 16, 16, .1); }
.faq-item { border-bottom: 1px solid rgba(16, 16, 16, .1); }
.faq-item h3 { margin: 0; }

.faq-item button {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border: 0;
  background: transparent;
  padding: 24px 0;
  color: #101010;
  text-align: left;
}

.faq-item button span {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(18px, 1.7vw, 22px);
  font-weight: 700;
  letter-spacing: -0.03em;
  transition: color 160ms ease;
}

.faq-item button:hover span { color: #7437ff; }

.faq-item button i {
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  place-items: center;
  border: 1px solid rgba(16, 16, 16, .12);
  border-radius: 50%;
  font-size: 13px;
  transition: transform 240ms ease, background 240ms ease, color 240ms ease, border-color 240ms ease;
}

.faq-item.open button i { transform: rotate(45deg); border-color: #7437ff; background: #7437ff; color: #fff; }

/* Smooth open/close: animate the row height from 0 to the answer's natural height. */
.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 280ms ease;
}

.faq-answer > div { overflow: hidden; }
.faq-item.open .faq-answer { grid-template-rows: 1fr; }

.faq-answer p {
  margin: 0;
  max-width: 680px;
  padding: 0 56px 26px 0;
  color: #4f4b46;
  font-size: 16px;
  line-height: 1.7;
}

/* The "Still got a question?" card shows beside the list on desktop and after it on mobile. */
.faq-ask--mobile { display: none; }

@media (max-width: 900px) {
  .faq-ask--desktop { display: none; }
  .faq-ask--mobile { display: flex; max-width: none; }
  .faq-layout { grid-template-columns: 1fr; gap: 40px; }
  .faq-intro { position: static; }
  .faq-answer p { padding-right: 0; }
}
</style>
