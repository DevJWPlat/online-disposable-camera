<script setup>
import { googleReviewsUrl, testimonials } from '@/data/site.js'

// Hidden until there are at least two real quotes, so it never looks empty.
const show = testimonials.length >= 2
</script>

<template>
  <section v-if="show" id="kind-words" class="kind py-[110px]">
    <div class="wrapper">
      <div class="section-heading">
        <div>
          <p class="section-kicker">FROM REAL EVENTS</p>
          <h2>Kind words.</h2>
        </div>
        <p>A few words from people who’ve used an Online Disposable Camera at their own events.</p>
      </div>

      <div class="quotes" :class="{ 'quotes--two': testimonials.length === 2 }">
        <figure v-for="item in testimonials" :key="item.name + item.quote" class="quote">
          <span class="quote-mark" aria-hidden="true">“</span>
          <blockquote>{{ item.quote }}</blockquote>
          <figcaption>
            <strong>{{ item.name }}</strong>
            <span>{{ [item.event, item.date].filter(Boolean).join(' · ') }}</span>
          </figcaption>
        </figure>
      </div>

      <a v-if="googleReviewsUrl" class="google-link" :href="googleReviewsUrl" target="_blank" rel="noopener">
        <i class="fa-brands fa-google" aria-hidden="true"></i>
        Read and leave reviews on Google
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </a>
    </div>
  </section>
</template>

<style scoped>
.kind { border-top: 1px solid rgba(16, 16, 16, .1); }

.quotes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 54px;
}

.quotes--two { grid-template-columns: repeat(2, minmax(0, 1fr)); }

.quote {
  display: flex;
  min-width: 0;
  flex-direction: column;
  margin: 0;
  border: 1px solid rgba(16, 16, 16, .1);
  border-radius: 26px;
  background: #fff;
  padding: 30px;
}

.quote-mark {
  height: 44px;
  color: #7437ff;
  font-family: Georgia, serif;
  font-size: 80px;
  line-height: 1;
}

.quote blockquote {
  margin: 14px 0 0;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(18px, 1.6vw, 22px);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.02em;
  text-wrap: pretty;
}

.quote figcaption {
  display: grid;
  gap: 2px;
  margin-top: auto;
  padding-top: 26px;
}

.quote figcaption strong { font-size: 15px; }
.quote figcaption span { color: #68645f; font-size: 13px; }

.google-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  color: #101010;
  font-size: 15px;
  font-weight: 700;
}

.google-link:hover { color: #7437ff; }
.google-link .fa-arrow-right { transition: transform 180ms ease; }
.google-link:hover .fa-arrow-right { transform: translateX(4px); }

@media (max-width: 960px) {
  .quotes, .quotes--two { grid-template-columns: minmax(0, 1fr); }
}
</style>
