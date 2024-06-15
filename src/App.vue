<script setup lang="ts">
import { RouterView } from 'vue-router'

import { computed } from 'vue';
import { useSocketStore } from './stores/ws';
import { useMasterStore } from './stores/master';
const route = useRoute();
const layout = computed(() => {
  return route.meta.layout ? route.meta.layout + '-layout' : 'default-layout';
});

// Chuỗi thời gian đầu vào
function calculateDelay (val) {
  // Chuyển đổi chuỗi thời gian nhập vào thành định dạng ISO 8601
    
    // Chuyển đổi timestamp đầu vào thành đối tượng Date
    const inputTime: any = new Date(val * 1000); // nhân với 1000 để chuyển từ giây sang mili giây

    // Lấy thời gian hiện tại
    const currentTime: any = new Date();

    // Tính độ lệch thời gian giữa hai đối tượng Date bằng mili giây
    const timeDifferenceInMilliseconds = currentTime - inputTime;

  return timeDifferenceInMilliseconds;
}

const socketStore = useSocketStore();
const isLoading = ref(true);
onBeforeMount(() => {
  socketStore.connect(() => {
    isLoading.value = false;
  });
})

const masterStore = useMasterStore()
const messageSocket = computed(() => socketStore.message);
watch(() => messageSocket.value,
(val) => {
  socketStore.setDelay(calculateDelay(val.time))
  console.log('messageSocket', calculateDelay(val.time))
  if (val.time) {
    masterStore.setSystemStatus(val.system_status)
    masterStore.setLedLeft(val.led_left)
    masterStore.setLedRight(val.led_right)
    masterStore.setBuzzer(val.buzzer)
    masterStore.setBuzzerVolume(val.buzzer_volume)
    masterStore.setDelay(Math.abs(calculateDelay(val.time)))
  }
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
