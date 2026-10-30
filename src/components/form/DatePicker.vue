<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

// A styled date picker. The value is stored as "YYYY-MM-DD", the same as a native date input.
const props = defineProps({
  modelValue: { type: String, default: '' },
  labelledby: { type: String, default: '' },
  placeholder: { type: String, default: 'Pick a date' },
})
const emit = defineEmits(['update:modelValue'])

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const root = ref(null)
const grid = ref(null)
const open = ref(false)

function startOfToday() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function toIso(date) {
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${m}-${d}`
}

function fromIso(value) {
  const [y, m, d] = String(value || '').split('-').map(Number)
  return y && m && d ? new Date(y, m - 1, d) : null
}

const today = startOfToday()
const selected = computed(() => fromIso(props.modelValue))
const focused = ref(selected.value || today) // the day keyboard focus sits on
const view = ref(new Date((selected.value || today).getFullYear(), (selected.value || today).getMonth(), 1))

const label = computed(() => {
  if (!selected.value) return ''
  return selected.value.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
})

const monthTitle = computed(() => `${MONTHS[view.value.getMonth()]} ${view.value.getFullYear()}`)
const canGoBack = computed(() => view.value > new Date(today.getFullYear(), today.getMonth(), 1))

// Six rows of seven days, starting on the Monday on or before the 1st.
const days = computed(() => {
  const first = view.value
  const offset = (first.getDay() + 6) % 7
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset)
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    return {
      date,
      iso: toIso(date),
      inMonth: date.getMonth() === first.getMonth(),
      past: date < today,
      isToday: date.getTime() === today.getTime(),
      isSelected: selected.value && date.getTime() === selected.value.getTime(),
      isFocused: date.getTime() === focused.value.getTime(),
    }
  })
})

function changeMonth(step) {
  view.value = new Date(view.value.getFullYear(), view.value.getMonth() + step, 1)
}

async function focusDay() {
  await nextTick()
  grid.value?.querySelector('[data-focused="true"]')?.focus()
}

async function show() {
  focused.value = selected.value || today
  view.value = new Date(focused.value.getFullYear(), focused.value.getMonth(), 1)
  open.value = true
  focusDay()
}

function hide(focusTrigger = true) {
  open.value = false
  if (focusTrigger) root.value?.querySelector('.trigger')?.focus()
}

function choose(day) {
  if (day.past) return
  emit('update:modelValue', day.iso)
  hide()
}

function clear() {
  emit('update:modelValue', '')
  hide()
}

function moveFocus(daysToMove) {
  const next = new Date(focused.value.getFullYear(), focused.value.getMonth(), focused.value.getDate() + daysToMove)
  if (next < today) return
  focused.value = next
  if (next.getMonth() !== view.value.getMonth() || next.getFullYear() !== view.value.getFullYear()) {
    view.value = new Date(next.getFullYear(), next.getMonth(), 1)
  }
  focusDay()
}

function onGridKey(event) {
  const moves = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }
  if (moves[event.key]) {
    event.preventDefault()
    moveFocus(moves[event.key])
  } else if (event.key === 'Escape') {
    hide()
  }
}

function onDocumentDown(event) {
  if (open.value && root.value && !root.value.contains(event.target)) hide(false)
}

onMounted(() => document.addEventListener('mousedown', onDocumentDown))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocumentDown))
</script>

<template>
  <div ref="root" class="picker" :class="{ open }">
    <button
      class="trigger"
      type="button"
      aria-haspopup="dialog"
      :aria-expanded="open"
      :aria-labelledby="labelledby || undefined"
      @click="open ? hide() : show()"
    >
      <span :class="{ placeholder: !label }">{{ label || placeholder }}</span>
      <i class="fa-regular fa-calendar" aria-hidden="true"></i>
    </button>

    <Transition name="pop">
      <div v-if="open" class="panel" role="dialog" aria-label="Choose your event date" @keydown.esc="hide()">
        <div class="head">
          <button class="nav" type="button" :disabled="!canGoBack" aria-label="Previous month" @click="changeMonth(-1)">
            <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </button>
          <strong aria-live="polite">{{ monthTitle }}</strong>
          <button class="nav" type="button" aria-label="Next month" @click="changeMonth(1)">
            <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>

        <div class="weekdays" aria-hidden="true">
          <span v-for="day in WEEKDAYS" :key="day">{{ day.slice(0, 2) }}</span>
        </div>

        <div ref="grid" class="days" role="grid" @keydown="onGridKey">
          <button
            v-for="day in days"
            :key="day.iso"
            type="button"
            class="day"
            :class="{ outside: !day.inMonth, past: day.past, today: day.isToday, selected: day.isSelected }"
            :disabled="day.past"
            :tabindex="day.isFocused ? 0 : -1"
            :data-focused="day.isFocused"
            :aria-pressed="!!day.isSelected"
            :aria-label="day.date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })"
            @click="choose(day)"
          >{{ day.date.getDate() }}</button>
        </div>

        <div class="foot">
          <button type="button" @click="clear">Not sure yet</button>
          <button type="button" class="close" @click="hide()">Done</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.picker { position: relative; }

.trigger {
  display: flex;
  width: 100%;
  height: 52px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid #dcd8d0;
  border-radius: 14px;
  background: #faf9f6;
  padding: 0 16px;
  color: #101010;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

.trigger > span { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.trigger .placeholder { color: #a29d95; }
.trigger i { flex: 0 0 auto; color: #68645f; font-size: 15px; }
.trigger:hover { border-color: #b9b3a8; }
.trigger:focus-visible,
.open .trigger { border-color: #7437ff; background: #fff; box-shadow: 0 0 0 4px rgba(116, 55, 255, .14); outline: 0; }

.panel {
  position: absolute;
  z-index: 40;
  top: calc(100% + 8px);
  left: 0;
  width: 320px;
  max-width: calc(100vw - 40px);
  border: 1px solid #e6e2da;
  border-radius: 20px;
  background: #fff;
  padding: 16px;
  box-shadow: 0 18px 50px rgba(30, 20, 60, .18);
}

.head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.head strong { font-family: 'Manrope', sans-serif; font-size: 17px; font-weight: 800; letter-spacing: -0.02em; }

.nav {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid #e6e2da;
  border-radius: 50%;
  background: #fff;
  color: #101010;
  font-size: 12px;
  transition: background 160ms ease, border-color 160ms ease;
}
.nav:hover:not(:disabled) { border-color: #7437ff; background: #f3eeff; }
.nav:disabled { cursor: default; opacity: .3; }

.weekdays, .days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
.weekdays span { padding: 6px 0; color: #8a857e; font-size: 12px; font-weight: 700; text-align: center; }

.day {
  aspect-ratio: 1;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #101010;
  font-size: 14px;
  font-weight: 500;
  transition: background 120ms ease, color 120ms ease;
}

.day:hover:not(:disabled) { background: #f3eeff; }
.day:focus-visible { outline: 2px solid #7437ff; outline-offset: 1px; }
.day.outside { color: #bdb8b0; }
.day.past { color: #d4d0c9; cursor: default; }
.day.today { box-shadow: inset 0 0 0 1.5px #7437ff; color: #7437ff; font-weight: 700; }
.day.selected { background: #7437ff; box-shadow: none; color: #fff; font-weight: 700; }

.foot { display: flex; justify-content: space-between; margin-top: 12px; border-top: 1px solid #efece6; padding-top: 12px; }
.foot button { border: 0; background: transparent; padding: 6px 4px; color: #68645f; font-size: 14px; font-weight: 600; }
.foot button:hover { color: #101010; }
.foot .close { color: #7437ff; font-weight: 700; }

.pop-enter-active, .pop-leave-active { transition: opacity 140ms ease, transform 140ms ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
