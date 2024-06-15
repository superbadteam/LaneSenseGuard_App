<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import { getActivitiesByUser, getActivities } from '@/services/activities';
import VueApexCharts from 'vue3-apexcharts'
import { useUserStore } from '@/stores';
import { useLoadingStore } from '@/stores/loading';
import { notify } from '@/utils/notify';
const route = useRoute()
const userStore = useUserStore()
const loadingStore = useLoadingStore();
onBeforeMount(() => {
  // getActivities().then((data) => {
  //   console.log(data);
  //   activities.value = data;
  // });
  loadingStore.setIsLoading(true)
  getActivities().then((data) => {
    activities.value = data;
    loadingStore.setIsLoading(false)
  }).catch((e) => {
    notify(e.message, { type: "error"})
    loadingStore.setIsLoading(false)
  })
})

interface Activity {
  _id: string;
  domain?: string;
  time_limit?: number;
  time_start: number;
  time_total: number;
  page_views: number;
  user: string;
  is_blocked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  report_date?: string;
  web_activities?: string[];
}
const activities = ref<Activity[]>([])
const chartData = {
  series: [65, 34, 45, 12],
  labels: ['Desktop', 'Tablet', 'Mobile', 'Unknown']
}

const chartDataComputed = computed(() => {
  const series = activities.value.map((activity) => activity.time_total);
  const labels = activities.value.map((activity) => activity.domain || 'Unknown');
  return { series, labels };
})

const chart = ref(null)

const apexOptions = computed(() => ({
  chart: {
    type: 'donut',
    width: 380
  },
  colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF', '#F3F4F6', '#20B2AA', '#FF6347', '#FFD700', '#FF69B4', '#FF4500', '#FF1493'],
  labels: chartDataComputed.value.labels,
  legend: {
    show: false,
    position: 'bottom'
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent'
      }
    }
  },
  dataLabels: {
    enabled: true
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200
        }
      }
    }
  ]
}))
// Colors for the chart’s series. When all colors of the array are used, it starts from the beginning
const colorOfLabelFormChartOptions = computed(() => {
  // const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF'];
  const labels = chartDataComputed.value.labels;
  return labels.map((label, index) => ({
    label,
    color: apexOptions.value.colors[index % apexOptions.value.colors.length]
  }));
})
</script>

<template>
  <div
    class="col-span-12 rounded-xl border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5"
  >
    <div class="mb-3 justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-xl font-bold text-black dark:text-white">Activity Analytics</h4>
      </div>
      <div>
        <!-- <div class="relative z-20 inline-block">
          <select
            name=""
            id=""
            class="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
          >
            <option value="">Monthly</option>
            <option value="">Yearly</option>
          </select>
          <span class="absolute top-1/2 right-3 z-10 -translate-y-1/2">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                fill="#637381"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                fill="#637381"
              />
            </svg>
          </span>
        </div> -->
      </div>
    </div>
    <div class="mb-2">
      <div id="chartThree" class="mx-auto flex justify-center">
        <p v-if="activities.length === 0">
        Không có dữ liệu
      </p>
        <VueApexCharts
          v-else
          type="donut"
          width="340"
          :options="apexOptions"
          :series="chartDataComputed.series"
          ref="chart"
        />
      </div>
      
    </div>
    <div class="flex w-full ">
        <div class="grid grid-cols-2 gap-x-10 gap-y-3 w-full items-center" >
          <div class="flex items-center" v-for="(item, index) in colorOfLabelFormChartOptions" :key="index">
            <span class="mr-2 block h-3 w-full max-w-3 rounded-full"
            :style="{ backgroundColor: item.color }"
          ></span>
          <p class="flex w-full justify-between text-sm font-medium text-black dark:text-white">
            <span> {{ item.label }} </span>
            <span> 
              <!-- % -->
              {{ chartDataComputed.series[chartDataComputed.labels.indexOf(item.label)] }} hours
            </span>
          </p>
          </div>
        </div>
    </div>
  </div>
</template>
