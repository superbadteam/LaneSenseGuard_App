<script setup lang="ts">
import { ref } from 'vue'

const switcherToggle = ref<boolean>(false)
const model = defineModel({ default: false})
defineProps(['disabled'])
defineEmits(['change'])
</script>

<template>
  <div
    class="inline-block w-fit"
    :class="disabled && 'opacity-50 pointer-events-none cursor-not-allowed'"
  >
    <label for="toggle4" class="flex cursor-pointer select-none items-center">
      <div class="relative">
        <input
          type="checkbox"
          id="toggle4"
          class="sr-only"
          @change="$emit('change', !model)"
        />
        <div
          :class="model && '!bg-primary'"
          class="block h-8 w-14 rounded-full bg-slate-300"
        ></div>
        <div
          :class="model && '!right-1 !translate-x-full'"
          class="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition"
        ></div>
      </div>
    </label>
  </div>
</template>
