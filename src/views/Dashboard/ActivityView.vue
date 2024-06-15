<script setup lang="ts">
import DataStatsActivity from '@/components/Dashboard/DataStatsActivity.vue';
import ActivityChart from '@/components/Dashboard/ActivityChart.vue'
import { getDailyActivities } from '@/services/activities';
import { useLoadingStore } from '@/stores/loading';
import SwitchFour from '@/components/Forms/Switchers/SwitchFour.vue'
import { useMasterStore } from '@/stores/master';
import { useSocketStore } from '@/stores/ws';

const loadingStore = useLoadingStore();
onBeforeMount(async () => {
  try {
    loadingStore.setIsLoading(true);
    const data = await getDailyActivities();
    activities.value = data;
    loadingStore.setIsLoading(false);
  } catch (error) {
    
  }
});
const activities = ref<Activity[]>([])
interface Activity {
  _id: string;
  user: string;
  report_date: string;
  web_activities: Webactivity[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Webactivity {
  _id: string;
  domain: string;
  time_limit: number;
  time_start: number;
  time_total: number;
  page_views: number;
  user: string;
  is_blocked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const chartActivities = computed(() => {
  const seriesDomain: string[] = []
  activities.value.forEach((activity) => {
    activity.web_activities.forEach((webActivity) => {
      if (!seriesDomain.includes(webActivity.domain)) {
        seriesDomain.push(webActivity.domain)
      }
    })
  })
  const activitiesData = seriesDomain.map((domain) => {
    const data = activities.value.map((activity) => {
      const webActivity = activity.web_activities.find((webActivity) => webActivity.domain === domain)
      return webActivity ? webActivity.time_total : 0
    })
    return {
      name: domain,
      data
    }
  })
  console.log(activitiesData)
  return {
    series: activitiesData,
    labels: activities.value.map((activity) => activity.createdAt.split('T')[0])
  }
})

const socketStore = useSocketStore();
const systemStatus = ref(false)
const onChangeSystem = (value: boolean) => {
  socketStore.sendMessage({
    system_status: value ? 1 : 0,
  })
}

const volume = ref(0)

const masterStore = useMasterStore()

watch(masterStore,
  (val) => {
    volume.value = val.buzzer_volume,
    systemStatus.value = Boolean(val.system_status)
    volume.value = val.buzzer_volume
  }
)

const onChangeVolume = (value: number) => {
  clearTimeout(timeoutVolume.value)
  timeoutVolume.value = setTimeout(() => {
    socketStore.sendMessage({
      buzzer_volume: value
    })
  }, 500)
}

const timeoutVolume = ref<any>(null)
</script>

<template>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <!-- <DataStatsActivity v-if="chartActivities" :chart-activities="chartActivities"/> -->
    </div>

      <div class="mt-4  gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div
      class="rounded-xl border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div class="flex w-full justify-between">
        <div
            class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"
          >
          <ISvg icon="solar:airbuds-case-charge-broken" class="text-xl"/>
        </div>
        <span>Độ trễ: {{ masterStore.getDelay }}ms</span>
      </div>

      <div class="mt-4 grid grid-cols-2 max-md:grid-cols-1 gap-3">
        <!-- left -->
        <div class="grid grid-cols-2 gap-3">
          <h4 class="text-base font-base text-black dark:text-white">Chế độ cảnh báo</h4>
          <SwitchFour @change="onChangeSystem" v-model="systemStatus"/>
          <h4 class="text-base font-base text-black dark:text-white">Còi</h4>
          <SwitchFour @update:modelValue="onChangeSystem" :disabled="true" v-model="masterStore.buzzer"/>
        </div>

        <!-- right -->
        <div class="grid grid-cols-2 gap-3">
          <h4 class="text-base font-base text-black dark:text-white">Xi nhan trái</h4>
          <SwitchFour @update:modelValue="onChangeSystem" :disabled="true" v-model="masterStore.led_left"/>
          <h4 class="text-base font-base text-black dark:text-white">Xi nhan phải</h4>
          <SwitchFour @update:modelValue="onChangeSystem" :disabled="true" v-model="masterStore.led_right"/>
        </div>
      </div>

      <hr class="text-slate-200 my-8">
      <!-- range -->
      <div class="h-fit rounded w-full">
          <h4 class="text-base font-base text-black dark:text-white">Âm lượng còi: {{ masterStore.buzzer_volume }}</h4>
          <div class="flex w-full gap-5">
            <span class="text-base font-base text-black dark:text-white"
            >0</span>
            <vue-slider class="flex-1" v-model="volume" @change="onChangeVolume"></vue-slider>
            <span class="text-base font-base text-black dark:text-white"
            >100</span>
          </div>
      </div>
    </div>
      <!-- ====== Chart One Start -->
      <!-- ====== Chart One End -->

      <!-- ====== Chart Two Start -->
      <!-- <ActivityChart :chart-activities="chartActivities"/> -->
      <!-- ====== Chart Two End -->

      <!-- ====== Chart Three Start -->
      <!-- <ChartThree /> -->
      <!-- ====== Chart Three End -->

      <!-- ====== Map One Start -->
      <!-- ====== Map One End -->

      <!-- ====== Table One Start -->
      <div class="col-span-12 xl:col-span-8">
      </div>
      <!-- ====== Table One End -->

      <!-- ====== Chat Card Start -->
      <!-- ====== Chat Card End -->
    </div>
</template>
