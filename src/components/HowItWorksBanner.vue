<script setup>
const steps = [
  { icon: 'fa-solid fa-qrcode', title: 'Share', text: 'Put your QR code on the tables or send guests the link.' },
  { icon: 'fa-solid fa-camera', title: 'Snap', text: 'Guests take up to 25 photos each, straight from their phone.' },
  { icon: 'fa-solid fa-images', title: 'Reveal', text: 'Your private gallery opens when you choose, ready to download.' },
]
</script>

<template>
  <section id="how-it-works" class="how">
    <div class="wrapper how-grid">
      <div class="how-intro">
        <p class="section-kicker">HOW IT WORKS</p>
        <h2>Simple for you.<br />Even simpler for your guests.</h2>
      </div>

      <ol class="how-steps">
        <li v-for="(step, index) in steps" :key="step.title">
          <div class="how-icon">
            <i :class="step.icon" aria-hidden="true"></i>
            <span>{{ index + 1 }}</span>
          </div>
          <div>
            <strong>{{ step.title }}</strong>
            <p>{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.how { border-block: 1px solid rgba(16, 16, 16, .1); background: rgba(255, 255, 255, .45); padding: 52px 0; }

.how-grid {
  display: grid;
  grid-template-columns: minmax(0, .8fr) minmax(0, 2fr);
  align-items: center;
  gap: 56px;
}

.how-intro .section-kicker { margin-bottom: 10px; }

.how-intro h2 {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: clamp(28px, 2.6vw, 38px);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.05em;
}

.how-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: none;
}

.how-steps li { display: flex; align-items: flex-start; gap: 16px; min-width: 0; }

.how-icon {
  position: relative;
  display: grid;
  width: 56px;
  height: 56px;
  flex: 0 0 56px;
  place-items: center;
  border: 1px solid rgba(16, 16, 16, .1);
  border-radius: 18px;
  background: #fff;
  font-size: 22px;
}

.how-icon span {
  position: absolute;
  top: -8px;
  right: -8px;
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 50%;
  background: #7437ff;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
}

.how-steps strong { display: block; font-family: 'Manrope', sans-serif; font-size: 20px; font-weight: 800; letter-spacing: -0.03em; }
.how-steps p { margin: 4px 0 0; color: #68645f; font-size: 14px; line-height: 1.5; }

@media (max-width: 1000px) {
  .how-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; }
}

@media (max-width: 700px) {
  .how { padding: 44px 0; }
  .how-steps { grid-template-columns: minmax(0, 1fr); gap: 24px; }
}
</style>
