<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

// A styled dropdown that behaves like a native <select>, including keyboard use.
const props = defineProps({
  modelValue: { type: String, default: '' },
  options: { type: Array, required: true },
  labelledby: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

const root = ref(null)
const list = ref(null)
const open = ref(false)
const active = ref(0)
const uid = `select-${Math.random().toString(36).slice(2, 8)}`

const selectedIndex = computed(() => Math.max(0, props.options.indexOf(props.modelValue)))

async function show() {
  open.value = true
  active.value = selectedIndex.value
  await nextTick()
  list.value?.focus()
  scrollActiveIntoView()
}

function hide(focusTrigger = true) {
  open.value = false
  if (focusTrigger) root.value?.querySelector('.trigger')?.focus()
}

function choose(index) {
  emit('update:modelValue', props.options[index])
  hide()
}

function scrollActiveIntoView() {
  list.value?.querySelector(`[data-index="${active.value}"]`)?.scrollIntoView({ block: 'nearest' })
}

function onTriggerKey(event) {
  if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
    event.preventDefault()
    show()
  }
}

function onListKey(event) {
  const last = props.options.length - 1
  if (event.key === 'ArrowDown') active.value = Math.min(last, active.value + 1)
  else if (event.key === 'ArrowUp') active.value = Math.max(0, active.value - 1)
  else if (event.key === 'Home') active.value = 0
  else if (event.key === 'End') active.value = last
  else if (event.key === 'Enter' || event.key === ' ') return (event.preventDefault(), choose(active.value))
  else if (event.key === 'Escape' || event.key === 'Tab') return hide(event.key === 'Escape')
  else return
  event.preventDefault()
  scrollActiveIntoView()
}

function onDocumentDown(event) {
  if (open.value && root.value && !root.value.contains(event.target)) hide(false)
}

onMounted(() => document.addEventListener('mousedown', onDocumentDown))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocumentDown))
</script>

<template>
  <div ref="root" class="select" :class="{ open }">
    <button
      class="trigger"
      type="button"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-labelledby="labelledby ? `${labelledby} ${uid}-value` : undefined"
      @click="open ? hide() : show()"
      @keydown="onTriggerKey"
    >
      <span :id="`${uid}-value`">{{ modelValue || options[0] }}</span>
      <i class="fa-solid fa-chevron-down chevron" aria-hidden="true"></i>
    </button>

    <Transition name="pop">
      <ul
        v-if="open"
        ref="list"
        class="menu"
        role="listbox"
        tabindex="-1"
        :aria-labelledby="labelledby || undefined"
        :aria-activedescendant="`${uid}-opt-${active}`"
        @keydown="onListKey"
      >
        <li
          v-for="(option, index) in options"
          :id="`${uid}-opt-${index}`"
          :key="option"
          :data-index="index"
          role="option"
          :aria-selected="option === modelValue"
          :class="{ active: index === active, selected: option === modelValue }"
          @mouseenter="active = index"
          @click="choose(index)"
        >
          <span>{{ option }}</span>
          <i v-if="option === modelValue" class="fa-solid fa-check" aria-hidden="true"></i>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.select { position: relative; }

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
.trigger:hover { border-color: #b9b3a8; }
.trigger:focus-visible,
.open .trigger { border-color: #7437ff; background: #fff; box-shadow: 0 0 0 4px rgba(116, 55, 255, .14); outline: 0; }

.chevron { flex: 0 0 auto; color: #68645f; font-size: 12px; transition: transform 200ms ease; }
.open .chevron { transform: rotate(180deg); }

.menu {
  position: absolute;
  z-index: 40;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  min-width: 220px;
  max-height: 300px;
  margin: 0;
  overflow-y: auto;
  border: 1px solid #e6e2da;
  border-radius: 16px;
  background: #fff;
  padding: 6px;
  list-style: none;
  box-shadow: 0 18px 50px rgba(30, 20, 60, .18);
  outline: 0;
}

.menu li {
  display: flex;
  min-height: 42px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-radius: 10px;
  padding: 0 12px;
  color: #3d3a36;
  font-size: 15px;
  cursor: pointer;
}

.menu li.active { background: #f3eeff; color: #101010; }
.menu li.selected { color: #7437ff; font-weight: 700; }
.menu li i { font-size: 12px; }

.pop-enter-active, .pop-leave-active { transition: opacity 140ms ease, transform 140ms ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
