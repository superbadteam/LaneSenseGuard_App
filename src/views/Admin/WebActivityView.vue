<script setup lang="ts">
import UserChart from "./UserChart.vue";
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue";
import { getUsers } from "@/services/user";
import { useLoadingStore } from "@/stores/loading";
import type { IUser } from "@/types/user";
import WebActivity from "@/components/Dashboard/WebActivity.vue";
onBeforeMount(async () => {
    // loadingStore.setLoading(true);
    // const data = await getUsers();
    // users.value = data;
    // loadingStore.setLoading(false);
});

const loadingStore = useLoadingStore();
const users = ref<IUser[]>([]);

const cardItems = computed(() => {
    return [
        {
            icon: "user",
            total: users.value.length,
            title: "Total Users",
        },
        {
            icon: "activity",
            // user has membership == 2
            total: users.value.filter((user) => user.membership === 2).length, 
            title: "Total membership",
        },
        {
            icon: "activity",
            total: users.value.filter((user) => !user.is_active).length,
            title: "Total user deactivated",
        },
        {
            icon: "activity",
            total: 0,
            title: "Total Unblocked Activities",
        },
    ];
});
</script>
<template>
    <div>
        <BreadcrumbDefault :pageTitle="'Analyst'" />
        <!-- <div class="grid grid-cols-4 gap-4 mb-4">
            <div
                v-for="(item, index) in cardItems"
                :key="index"
                class="rounded-xl border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
            >
                <div
                class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4"
                >
                <ISvg :icon="item.icon" class="text-xl"/>
            </div>

                <div class="mt-4 flex items-end justify-between">
                <div>
                    <h4 class="text-title-md font-bold text-black dark:text-white">{{ item.total }}</h4>
                    <span class="text-sm font-medium">{{ item.title }}</span>
                </div>
                </div>
            </div>
        </div> -->
        <WebActivity />
    </div>
</template>