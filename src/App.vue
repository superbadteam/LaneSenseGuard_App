<script setup lang="ts">
import { RouterView } from 'vue-router'

import { computed } from 'vue';
import { useSocketStore } from './stores/ws';
const route = useRoute();
const layout = computed(() => {
  return route.meta.layout ? route.meta.layout + '-layout' : 'default-layout';
});

const socketStore = useSocketStore();
const isLoading = ref(true);
onBeforeMount(() => {
  socketStore.connect(() => {
    isLoading.value = false;
  });
})
</script>

<template>
  <component :is="layout">
    <div v-if="isLoading" class="fixed z-[9999] top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-[#717171a1]">
      <ISvg icon="svg-spinners:ring-resize" class="text-white text-4xl" />
      <p class="text-white">Đang kết nối websocket...</p>
    </div>
    <RouterView />
  </component>
</template>
