<script setup>
import brandLogo from '@/assets/brand/logo-long.png'
import brandIcon from '@/assets/brand/icon.png'
</script>

<template>
  <main class="coming-soon-page">
    <div class="coming-soon-shell">
      <img class="coming-soon-logo" :src="brandLogo" alt="Online Disposable Camera" />

      <div class="coming-soon-copy">
        <p class="coming-soon-kicker">THE SITE IS NEARLY READY</p>
        <h1 style="padding-bottom: 24px;">Disposable camera vibes, straight from your phone.</h1>
        <p>
          A simple disposable-camera experience for weddings, parties, hen dos and events.
          <b>No app download required.</b>
        </p>

        <a class="coming-soon-cta" href="mailto:hello@onlinedisposablecamera.co.uk">
          Get in touch
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </a>
      </div>

      <div class="coming-soon-note">
        <img :src="brandIcon" alt="" aria-hidden="true" />
        <span>Full website coming soon.</span>
      </div>
    </div>
  </main>
</template>

<style scoped>
.coming-soon-page {
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 32px;
  background: #f7f5ef;
  color: #101010;
}

.coming-soon-shell {
  width: min(100%, 1080px);
  min-height: min(760px, calc(100svh - 64px));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(16, 16, 16, 0.1);
  border-radius: 32px;
  padding: 42px;
  background: rgba(255, 255, 255, 0.42);
}

.coming-soon-logo {
  width: min(320px, 72vw);
  height: auto;
}

.coming-soon-copy {
  max-width: 820px;
  padding: 72px 0;
}

.coming-soon-kicker {
  margin: 0 0 18px;
  color: #7437ff;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 4px;
}

.coming-soon-copy h1 {
  margin: 0;
  max-width: 900px;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(54px, 8vw, 110px);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -6px;
}

.coming-soon-copy > p:not(.coming-soon-kicker) {
  max-width: 680px;
  margin: 28px 0 0;
  color: #68645f;
  font-size: 19px;
  line-height: 1.6;
}

.coming-soon-cta {
  width: max-content;
  min-height: 58px;
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-top: 34px;
  border-radius: 999px;
  padding: 0 26px;
  background: #7437ff;
  color: #fff;
  font-weight: 700;
  transition: transform 180ms ease, background 180ms ease;
}

.coming-soon-cta:hover {
  transform: translateY(-2px);
  background: #6128ec;
}

.coming-soon-note {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #68645f;
  font-size: 13px;
  font-weight: 700;
}

.coming-soon-note img {
  width: 34px;
  height: 34px;
}

@media (max-width: 620px) {
  .coming-soon-page {
    padding: 14px;
  }

  .coming-soon-shell {
    min-height: calc(100svh - 28px);
    border-radius: 24px;
    padding: 24px;
  }

  .coming-soon-copy {
    padding: 48px 0;
  }

  .coming-soon-copy h1 {
    font-size: clamp(48px, 15vw, 72px);
    letter-spacing: -4px;
  }

  .coming-soon-copy > p:not(.coming-soon-kicker) {
    font-size: 17px;
  }
}
</style>
