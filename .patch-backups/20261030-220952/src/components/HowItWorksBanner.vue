<template>
  <section id="how-it-works" class="how-banner border-y border-black/10 bg-white/45">
    <div class="wrapper py-12">
      <div class="flex items-center justify-between gap-12 max-[900px]:flex-col max-[900px]:items-start">
        <div class="how-banner-copy">
          <p class="section-kicker">HOW IT WORKS</p>
          <h2>Simple for you.<br />Even simpler for your guests.</h2>
        </div>

        <div class="how-steps">
          <div class="how-step">
            <span class="how-step-number">1</span>
            <div class="icon">
              <i class="fa-light fa-qrcode how-arrow" aria-hidden="true"></i>
            </div>
            <div class="content">
              <strong>Share</strong>
            </div>
            <div class="text">
              <p>Give your guests the event link or QR code.</p>
            </div>
          </div>
          <i class="fa-light fa-chevron-right how-arrow" aria-hidden="true"></i>
          <div class="how-step">
            <span class="how-step-number">2</span>
            <div class="icon">
              <i class="fa-regular fa-camera" aria-hidden="true"></i>
            </div>
            <div class="content">
              <strong>Snap</strong>
            </div>
            <div class="text">
              <p>They take their photos<br />(25 as standard).</p>
            </div>
          </div>
          <i class="fa-light fa-chevron-right how-arrow" aria-hidden="true"></i>
          <div class="how-step">
            <div class="icon">
              <i class="fa-regular fa-image" aria-hidden="true"></i>
            </div>
            <span class="how-step-number">3</span>
            <div class="content">
              <strong>Reveal</strong>
            </div>
            <div class="text">
              <p>You get a private gallery<br />to relive all the moments.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.how-banner-copy {
  flex: 0 0 auto;
  max-width: 440px;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(30px, 3vw, 42px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
}
.how-steps {
  width: 100%;
}

.how-step {
  position: relative;
  .icon {
    svg {
      font-size: 50px;
    }
  }
  .content {
    strong {
      font-size: 25px;
    }
  }
  .text {
    p {
      font-size: 14px;
    }
  }
}
.how-step-number {
  position: absolute;
  top: -20px;
  left: -20px;
}
</style>
