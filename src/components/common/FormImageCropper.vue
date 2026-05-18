<script setup>
/**
 * FormImageCropper — image upload + crop field
 *
 * Props:
 *   modelValue  — v-model (File | null)
 *   label       — label teks
 *   error       — pesan error dari vee-validate / yup
 *
 * Contoh pakai (sama persis kayak FormField):
 *
 *   // di script setup
 *   const [image] = defineField('image')
 *
 *   // di template
 *   <FormImageCropper v-model="image" label="Foto Profil" :error="errors.image" />
 */

import { ref, computed, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: { default: null },
  label:      { type: String, default: 'Image' },
  error:      { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

// ── Aspect ratio presets ────────────────────────────────────────────────────
const ASPECT_PRESETS = [
  { label: 'Free',      value: null,   icon: '⊞' },
  { label: 'Square',    value: 1,      icon: '□' },
  { label: 'Landscape', value: 16 / 9, icon: '▬' },
  { label: 'Portrait',  value: 9 / 16, icon: '▮' },
  { label: '4:3',       value: 4 / 3,  icon: '⬜' },
  { label: '3:4',       value: 3 / 4,  icon: '▯' },
]

const HANDLES = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']

// ── State ───────────────────────────────────────────────────────────────────
const imgSrc         = ref(null)
const preview        = ref(null)
const imgRef         = ref(null)
const selectedPreset = ref(ASPECT_PRESETS[0])
const crop           = ref({ x: 0, y: 0, width: 0, height: 0 })

// ── Computed overlay style ──────────────────────────────────────────────────
const overlayStyle = computed(() => ({
  left:   crop.value.x      + 'px',
  top:    crop.value.y      + 'px',
  width:  crop.value.width  + 'px',
  height: crop.value.height + 'px',
}))

// ── File input ──────────────────────────────────────────────────────────────
function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  preview.value = null
  const reader = new FileReader()
  reader.onload = () => { imgSrc.value = reader.result }
  reader.readAsDataURL(file)
}

// ── Image load → set initial crop ──────────────────────────────────────────
function onImageLoad() {
  applyCrop(selectedPreset.value.value)
}

function applyCrop(aspect) {
  const img = imgRef.value
  if (!img) return
  const w = img.clientWidth
  const h = img.clientHeight

  if (!aspect) {
    crop.value = { x: w * 0.1, y: h * 0.1, width: w * 0.8, height: h * 0.8 }
    return
  }
  let cw = w * 0.8
  let ch = cw / aspect
  if (ch > h * 0.8) { ch = h * 0.8; cw = ch * aspect }
  crop.value = { x: (w - cw) / 2, y: (h - ch) / 2, width: cw, height: ch }
}

function handlePresetChange(preset) {
  selectedPreset.value = preset
  applyCrop(preset.value)
}

// ── Drag to move ────────────────────────────────────────────────────────────
let dragStart = null

function startDrag(e) {
  dragStart = { mx: e.clientX, my: e.clientY, cx: crop.value.x, cy: crop.value.y }
  window.addEventListener('mousemove', onDragMove)
  window.addEventListener('mouseup',   stopDrag)
}
function startDragTouch(e) {
  const t = e.touches[0]
  dragStart = { mx: t.clientX, my: t.clientY, cx: crop.value.x, cy: crop.value.y }
  window.addEventListener('touchmove', onDragMoveTouch, { passive: false })
  window.addEventListener('touchend',  stopDrag)
}
function onDragMove(e) {
  if (!dragStart || !imgRef.value) return
  const img = imgRef.value
  const dx = e.clientX - dragStart.mx
  const dy = e.clientY - dragStart.my
  crop.value = {
    ...crop.value,
    x: Math.min(Math.max(dragStart.cx + dx, 0), img.clientWidth  - crop.value.width),
    y: Math.min(Math.max(dragStart.cy + dy, 0), img.clientHeight - crop.value.height),
  }
}
function onDragMoveTouch(e) { e.preventDefault(); onDragMove(e.touches[0]) }
function stopDrag() {
  dragStart = null
  window.removeEventListener('mousemove', onDragMove)
  window.removeEventListener('mouseup',   stopDrag)
  window.removeEventListener('touchmove', onDragMoveTouch)
  window.removeEventListener('touchend',  stopDrag)
}

// ── Resize handles ──────────────────────────────────────────────────────────
let resizeState = null

function startResize(handle, e) {
  resizeState = { handle, mx: e.clientX, my: e.clientY, crop: { ...crop.value } }
  window.addEventListener('mousemove', onResizeMove)
  window.addEventListener('mouseup',   stopResize)
}
function startResizeTouch(handle, e) {
  const t = e.touches[0]
  resizeState = { handle, mx: t.clientX, my: t.clientY, crop: { ...crop.value } }
  window.addEventListener('touchmove', onResizeMoveTouch, { passive: false })
  window.addEventListener('touchend',  stopResize)
}
function onResizeMove(e) {
  if (!resizeState || !imgRef.value) return
  const img = imgRef.value
  const { handle, mx, my, crop: sc } = resizeState
  const dx = e.clientX - mx
  const dy = e.clientY - my
  const MIN = 30
  let { x, y, width, height } = sc
  const aspect = selectedPreset.value.value

  if (handle.includes('e'))  width  = Math.max(MIN, sc.width  + dx)
  if (handle.includes('s'))  height = Math.max(MIN, sc.height + dy)
  if (handle.includes('w')) { width  = Math.max(MIN, sc.width  - dx); x = sc.x + sc.width  - width  }
  if (handle.includes('n')) { height = Math.max(MIN, sc.height - dy); y = sc.y + sc.height - height }

  if (aspect) {
    if (handle.includes('e') || handle.includes('w')) height = width  / aspect
    else                                               width  = height * aspect
  }

  x      = Math.max(0, Math.min(x,      img.clientWidth  - MIN))
  y      = Math.max(0, Math.min(y,      img.clientHeight - MIN))
  width  = Math.min(width,  img.clientWidth  - x)
  height = Math.min(height, img.clientHeight - y)

  crop.value = { x, y, width, height }
}
function onResizeMoveTouch(e) { e.preventDefault(); onResizeMove(e.touches[0]) }
function stopResize() {
  resizeState = null
  window.removeEventListener('mousemove', onResizeMove)
  window.removeEventListener('mouseup',   stopResize)
  window.removeEventListener('touchmove', onResizeMoveTouch)
  window.removeEventListener('touchend',  stopResize)
}

// ── Confirm → canvas → File → emit v-model ─────────────────────────────────
async function handleConfirm() {
  const img = imgRef.value
  if (!img || !crop.value.width) return

  const scaleX = img.naturalWidth  / img.clientWidth
  const scaleY = img.naturalHeight / img.clientHeight

  const canvas = document.createElement('canvas')
  canvas.width  = crop.value.width  * scaleX
  canvas.height = crop.value.height * scaleY

  const ctx = canvas.getContext('2d')
  ctx.drawImage(
      img,
      crop.value.x * scaleX, crop.value.y * scaleY,
      crop.value.width * scaleX, crop.value.height * scaleY,
      0, 0, canvas.width, canvas.height,
  )

  const blob = await new Promise((resolve, reject) =>
      canvas.toBlob(b => b ? resolve(b) : reject('Canvas empty'), 'image/jpeg', 0.9)
  )

  const file    = new File([blob], 'image.jpg', { type: 'image/jpeg' })
  preview.value = URL.createObjectURL(blob)
  imgSrc.value  = null

  emit('update:modelValue', file)   // ← sama seperti FormField
}

function handleReset() {
  if (preview.value) URL.revokeObjectURL(preview.value)
  preview.value        = null
  imgSrc.value         = null
  selectedPreset.value = ASPECT_PRESETS[0]
  emit('update:modelValue', null)   // ← sama seperti FormField
}

onBeforeUnmount(() => {
  if (preview.value) URL.revokeObjectURL(preview.value)
})
</script>

<template>
  <div class="grid gap-[var(--xxs)] w-full max-w-[500px]">

    <!-- Label -->
    <label class="capitalize font-medium text-[length:var(--s)] text-text">
      {{ label }}
    </label>

    <!-- ── Preview setelah crop ── -->
    <div v-if="preview" class="flex items-center gap-3">
      <img
          :src="preview"
          alt="preview"
          class="max-w-[120px] max-h-[120px] object-cover rounded-[var(--radius-s)] border border-line"
      />
      <button
          type="button"
          class="text-[length:var(--s)] text-danger underline cursor-pointer bg-transparent border-none p-0"
          @click="handleReset"
      >
        ↺ Ganti foto
      </button>
    </div>

    <!-- ── Input file ── -->
    <label
        v-else-if="!imgSrc"
        class="flex flex-col items-center justify-center gap-1 border-2 border-dashed rounded-[var(--radius-s)] p-8 cursor-pointer transition-colors duration-200"
        :class="error
        ? 'border-danger'
        : 'border-line hover:border-primary hover:bg-surface'"
    >
      <span class="text-2xl">⬆</span>
      <span class="text-[length:var(--s)] font-medium text-text">Klik untuk pilih foto</span>
      <span class="text-[length:var(--xs)] text-link italic">JPG, PNG, WEBP</span>
      <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
    </label>

    <!-- ── Crop UI ── -->
    <div v-else class="grid gap-2">

      <!-- Aspect ratio selector -->
      <div class="flex flex-wrap gap-1">
        <button
            v-for="preset in ASPECT_PRESETS"
            :key="preset.label"
            type="button"
            class="flex items-center gap-1 px-2 py-1 text-[length:var(--xs)] rounded border cursor-pointer transition-colors duration-150"
            :class="selectedPreset.label === preset.label
            ? 'bg-primary text-white border-primary'
            : 'border-line text-text hover:bg-surface'"
            @click="handlePresetChange(preset)"
        >
          <span>{{ preset.icon }}</span>
          <span>{{ preset.label }}</span>
        </button>
      </div>

      <!-- Canvas crop area -->
      <div
          class="relative overflow-hidden rounded-[var(--radius-s)] bg-black select-none leading-[0]"
      >
        <img
            ref="imgRef"
            :src="imgSrc"
            class="block max-h-[300px] w-full object-contain opacity-50"
            draggable="false"
            @load="onImageLoad"
        />

        <!-- Overlay -->
        <div
            class="crop-overlay"
            :style="overlayStyle"
            @mousedown.prevent="startDrag"
            @touchstart.prevent="startDragTouch"
        >
          <!-- Resize handles -->
          <span
              v-for="handle in HANDLES"
              :key="handle"
              class="crop-handle"
              :class="`crop-handle--${handle}`"
              @mousedown.prevent.stop="startResize(handle, $event)"
              @touchstart.prevent.stop="startResizeTouch(handle, $event)"
          />
          <!-- Rule-of-thirds grid -->
          <span class="crop-grid" style="top:33.33%;left:0;width:100%;height:1px" />
          <span class="crop-grid" style="top:66.66%;left:0;width:100%;height:1px" />
          <span class="crop-grid" style="left:33.33%;top:0;height:100%;width:1px" />
          <span class="crop-grid" style="left:66.66%;top:0;height:100%;width:1px" />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <button
            type="button"
            class="flex-1 py-2 text-[length:var(--s)] font-medium rounded-[var(--radius-s)] bg-primary text-white cursor-pointer transition-opacity duration-150 hover:opacity-85 active:scale-[.97]"
            @click="handleConfirm"
        >
          ✓ Konfirmasi
        </button>
        <button
            type="button"
            class="flex-1 py-2 text-[length:var(--s)] font-medium rounded-[var(--radius-s)] border border-line text-text bg-transparent cursor-pointer hover:bg-surface active:scale-[.97]"
            @click="handleReset"
        >
          ✕ Batal
        </button>
      </div>
    </div>

    <!-- Error — sama persis strukturnya kayak FormField -->
    <p v-if="error" class="text-danger text-[length:var(--xs)] italic">
      {{ error }}
    </p>

  </div>
</template>

<style scoped>
.crop-overlay {
  position: absolute;
  border: 2px solid #fff;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.45);
  cursor: move;
  box-sizing: border-box;
}
.crop-grid {
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  pointer-events: none;
}
.crop-handle {
  position: absolute;
  width: 10px; height: 10px;
  background: #fff;
  border: 2px solid rgba(0,0,0,0.35);
  border-radius: 2px;
  box-sizing: border-box;
}
.crop-handle--nw { top:-5px;  left:-5px;              cursor: nw-resize }
.crop-handle--n  { top:-5px;  left:calc(50% - 5px);   cursor: n-resize  }
.crop-handle--ne { top:-5px;  right:-5px;              cursor: ne-resize }
.crop-handle--e  { top:calc(50% - 5px); right:-5px;   cursor: e-resize  }
.crop-handle--se { bottom:-5px; right:-5px;            cursor: se-resize }
.crop-handle--s  { bottom:-5px; left:calc(50% - 5px); cursor: s-resize  }
.crop-handle--sw { bottom:-5px; left:-5px;             cursor: sw-resize }
.crop-handle--w  { top:calc(50% - 5px); left:-5px;    cursor: w-resize  }
</style>
