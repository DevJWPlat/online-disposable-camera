<script setup>
// An iPhone drawn in code. Pass a flat screenshot of the page (no phone around it)
// and it sits inside the frame between a Safari address bar and toolbar.
// Every PhoneFrame is the same shape, so phones always match in size.
import { ref } from 'vue'

const missing = ref(false)

defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  url: { type: String, default: 'onlinedisposablecamera.co.uk' },
})
</script>

<template>
  <div class="phone">
    <div class="phone-screen">
      <div class="phone-status" aria-hidden="true">
        <span class="phone-time">9:41</span>
        <span class="phone-island"></span>
        <span class="phone-icons">
          <i class="fa-solid fa-signal"></i>
          <i class="fa-solid fa-wifi"></i>
          <i class="fa-solid fa-battery-full"></i>
        </span>
      </div>

      <div class="phone-address" aria-hidden="true">
        <i class="fa-solid fa-lock"></i>
        <span>{{ url }}</span>
      </div>

      <img v-if="!missing" class="phone-page" :src="src" :alt="alt" loading="lazy" @error="missing = true" />
      <div v-else class="phone-page phone-missing">Screenshot coming soon</div>

      <div class="phone-toolbar" aria-hidden="true">
        <i class="fa-solid fa-chevron-left"></i>
        <i class="fa-solid fa-chevron-right faded"></i>
        <i class="fa-solid fa-arrow-up-from-bracket"></i>
        <i class="fa-solid fa-book-open"></i>
        <i class="fa-regular fa-clone"></i>
      </div>
      <span class="phone-home" aria-hidden="true"></span>
    </div>
  </div>
</template>

<style scoped>
/* Size is set by --phone-height on the phone (or any parent). Everything inside scales with it. */
.phone {
  --h: var(--phone-height, 520px);
  --u: calc(var(--h) / 852); /* 1 "point" on a 393 × 852 iPhone screen */
  position: relative;
  width: calc(var(--h) * 0.4613);
  height: var(--h);
  flex: 0 0 auto;
  padding: calc(var(--u) * 11);
  border-radius: calc(var(--u) * 66);
  background: #111;
  box-shadow:
    inset 0 0 0 calc(var(--u) * 2) #3a3a3c,
    0 calc(var(--u) * 18) calc(var(--u) * 40) rgba(25, 20, 38, 0.16);
  transition: transform 260ms cubic-bezier(.22,.8,.24,1), box-shadow 260ms ease;
}

.phone-screen {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: calc(var(--u) * 55);
  background: #f2f2f4;
  color: #111;
  font-family: -apple-system, 'SF Pro Text', 'DM Sans', sans-serif;
}

.phone-status {
  position: relative;
  display: flex;
  height: calc(var(--u) * 54);
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--u) * 6) calc(var(--u) * 30) 0 calc(var(--u) * 40);
  font-size: calc(var(--u) * 16);
  font-weight: 600;
}

.phone-island {
  position: absolute;
  top: calc(var(--u) * 17);
  left: 50%;
  width: calc(var(--u) * 88);
  height: calc(var(--u) * 19);
  transform: translateX(-50%);
  border-radius: 999px;
  background: #000;
}

.phone-icons { display: flex; gap: calc(var(--u) * 6); font-size: calc(var(--u) * 13); }

.phone-address {
  display: flex;
  height: calc(var(--u) * 38);
  flex: 0 0 auto;
  margin: 0 calc(var(--u) * 12) calc(var(--u) * 6);
  align-items: center;
  justify-content: center;
  gap: calc(var(--u) * 6);
  border-radius: calc(var(--u) * 12);
  background: #e3e3e8;
  font-size: calc(var(--u) * 14);
  white-space: nowrap;
}

.phone-address i { font-size: calc(var(--u) * 11); }

.phone-page {
  display: block;
  width: 100%;
  min-height: 0;
  flex: 1 1 auto;
  object-fit: cover;
  object-position: top center;
  background: #fff;
}

.phone-missing {
  display: grid;
  place-items: center;
  background: linear-gradient(160deg, #efe5ff, #f7f5ef);
  color: #7437ff;
  font-size: calc(var(--u) * 15);
  font-weight: 700;
}

.phone-toolbar {
  display: flex;
  height: calc(var(--u) * 78);
  flex: 0 0 auto;
  align-items: flex-start;
  justify-content: space-around;
  padding-top: calc(var(--u) * 14);
  color: #0a7aff;
  font-size: calc(var(--u) * 20);
}

.phone-toolbar .faded { color: #b8b8be; }

.phone-home {
  position: absolute;
  bottom: calc(var(--u) * 8);
  left: 50%;
  width: calc(var(--u) * 134);
  height: calc(var(--u) * 5);
  transform: translateX(-50%);
  border-radius: 999px;
  background: #111;
}
</style>
