<script setup lang="ts">
import type { ISubscription } from '@/types/subscription';

defineProps<{
    subscription: ISubscription;
    allowEdit?: boolean;
}>();

</script>
<template>
    <div class="relative w-[350px] rounded-xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark md:p-9 xl:p-11.5"
        style="
    /* display: none; */
"><span 
v-if="subscription.discount"
class="absolute top-3.5 -right-1"><svg width="109" height="34" viewBox="0 0 109 34" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M24 0L106 0C107.657 0 109 1.34315 109 3V30L24 30L24 0Z" fill="#3C50E0">
                </path>
                <foreignObject x="24" y="0" width="81" height="30">
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <div class="text-white font-satoshi font-medium text-sm text-center mt-1">
                            {{ subscription.discount}}%</div>
                    </div>
                </foreignObject>
                <path d="M0 0H24V30H0L19 15L0 0Z" fill="#3C50E0"></path>
                <path d="M105 34L109 30H105V34Z" fill="#2539C8"></path>
            </svg>
        </span>
        <div class="flex flex-col justify-between h-full">
            <div>
                <span class="mb-2.5 block text-title-sm2 font-bold text-black dark:text-white">
                    {{ subscription.name }}
                </span>
                <h3>
                    <span class="text-xl font-medium text-black dark:text-white"></span>
                    <span class="text-title-xxl2 font-bold text-black dark:text-white">
                        {{ subscription.price }}đ</span>
                    <span class="font-medium"> Mỗi tháng
                    </span>
                </h3>
                <h4 class="mt-7.5 mb-5 text-lg font-medium text-black dark:text-white">Mô tả</h4>
                <!-- <ul class="flex flex-col gap-3.5">
            <li class="font-medium">Get Figma Source File</li>
            <li class="font-medium">Use on Unlimited Projects</li>
            <li class="font-medium">Personal &amp; Commercial Use</li>
            <li class="font-medium">Downloadable Offline Files</li>
            <li class="font-medium">Lifetime Free Updates</li>
        </ul> -->
                <!-- description -->
                <div class="flex flex-col gap-3.5">
                    <div class="flex gap-2.5 items-center">
                        <span class="font-medium">{{ subscription.description }}</span>
                    </div>
                </div>
            </div>
            <button
                v-if="allowEdit"
                @click="$emit('edit', subscription)"
                class="mt-9 flex justify-center rounded-md border border-primary py-3 px-9 font-medium text-primary hover:bg-primary hover:text-white">
                Chỉnh sửa
            </button>
            <button
                v-else
                @click="$emit('buy', subscription)"
                class="mt-9 flex justify-center rounded-md border border-primary py-3 px-9 font-medium text-primary hover:bg-primary hover:text-white">
                Mua ngay
            </button>
        </div>
    </div>
</template>