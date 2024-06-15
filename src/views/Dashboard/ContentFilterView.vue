<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TableUser from '@/components/Users/TableUser.vue';
import BDropdown from '@/components/Base/Dropdown/BDropdown.vue';
import FilterMutilSelect from '@/components/Dashboard/FilterMutiSelect.vue';
import { getFilters, updateFilters, createNewFilter } from '@/services/filter';
import { notify } from '@/utils/notify';
import { useLoadingStore } from '@/stores/loading';
import { getCategories } from '@/services/category';

onBeforeMount(async () => {
    const res = await getFilters()
    currentFilter.value = res[0]
    console.log(currentFilter.value)

    getCategories().then((res) => {
        console.log(res)
        categoriesApi.value = res
    })
})

const categoriesApi = ref([])
const loadingStore = useLoadingStore()
const update = async () => {
    loadingStore.setLoading(true)
    try {
        console.log('update filter')
        if (currentFilter.value && currentFilter.value._id) {
            await updateFilters(currentFilter.value._id, {
            level: filterRange.value,
            white_list: whiteList.value.split(',').map((item) => item.trim()),
            categories: categories.value
        })
        const res = await getFilters()
        currentFilter.value = res[0]
        } else {
            await createNewFilter({
                level: filterRange.value,
                white_list: whiteList.value.split(',').map((item) => item.trim()),
                categories: categories.value
            })
        }
        notify("Update filter success", { type: 'success' })
    } catch (error) {
        console.log(error)
        notify("Update filter failed", { type: 'error' })
    }
    loadingStore.setLoading(false)
}
const currentFilter = ref()
const categories = ref([])
const pageTitle = ref('Content filter')
const value = ref(50)

const filterRange = ref(50)

const whiteList = ref('')

const step = ref(1)

const isShowUpdate = ref(false)

const saveStep = (st: number) => {
    if (st === 1) {
        step.value = 2
    }
    if (st === 2) {
        step.value = 3
    }
    if (st === 3) {
        step.value = 4
    }
    if (st === 4) {
        isShowUpdate.value = false
        step.value = 1
        update()
    }
}
</script>
<template>
    <div class="w-full px-5">
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div class="flex w-full gap-30 flex-row-reverse justify-end">
            <div class="w-full justify-center max-w-142.5">
                <div class="rounded-xl border bg-white border-stroke shadow-default dark:border-strokedark p-5">
                    <h2 class="text-lg font-medium">Current config</h2>
                    <hr class="text-stroke my-4">
                    <p>Filter stressness: {{ currentFilter?.level }}</p>
                    <!-- <vue-slider v-if="currentFilter.level" v-model="currentFilter.level"></vue-slider> -->
                    <div class="mt-5">
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            Hiệu ứng lọc
                        </label>
                        <div class="border-stroke border px-4 py-4 rounded-md">
                            Làm mờ
                        </div>
                    </div>
                    <div class="mt-5">
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            Model train
                        </label>
                        <div class="border-stroke border px-4 py-4 rounded-md">
                            MobileNet v1.2
                        </div>
                    </div>
                    <div class="mt-5">
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            Loại cần lọc
                        </label>
                        <div class="border-stroke border px-4 py-4 rounded-md flex flex-wrap gap-3">
                            <div v-for="item in categoriesApi" :key="item._id">
                                <div v-if="currentFilter.categories.includes(item._id)" class="bg-stroke w-fit px-2 py-1 rounded-md">
                                    {{ item.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5">
                        <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                            White list
                        </label>
                        <div class="border-stroke border px-4 py-4 rounded-md flex flex-wrap gap-3">
                            <div v-for="item in currentFilter?.white_list" :key="item" class="bg-stroke w-fit px-2 py-1 rounded-md">
                                {{ item }}
                            </div>
                        </div>
                    </div>
                    <div class="mt-5">
                        <!-- <BDropdown label="Lựa chọn train model" placeholder="Chọn model" :options="modelTrainOptions" v-model="modelTrain"/> -->
                    </div>
                    <div class="mt-5">
                        <!-- <FilterMutilSelect /> -->
                    </div>
                    <button
                        v-if="!isShowUpdate"
                        @click="isShowUpdate = true"
                        class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type="submit">
                        Update
                    </button>
                    <button
                        v-else
                        class="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="button"
                        @click="isShowUpdate = false"
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <div v-if="isShowUpdate">
                <div class="flex gap-5 items-stretch relative">
                    <div class="w-[2px] bg-stroke absolute left-[5px] h-full"></div>
                    <div class="relative z-10 py-10 flex flex-col gap-12">
                        <!-- item step -->
                        <div class="flex gap-5">
                            <div class="w-3 h-3 mt-3 border-slate-700 border-2 rounded-full bg-white"></div>
                            <div>
                                <label class="flex items-center gap-2 text-xl font-medium text-black dark:text-white">
                                    Choose filter category
                                    <ISvg v-if="step > 1" icon="material-symbols:check-circle" class=" text-green-600" />
                                </label>
                                <div class="text-base">
                                    Select category you want to filter, select multiple
                                </div>
                                <div 
                                    v-motion
                                    :initial="{opacity: 0, scale: 0}"
                                    :enter="{opacity: 1, scale: 1}"
                                    class="mt-2" 
                                    v-if="step === 1">
                                    <div class="bg-white h-fit rounded-xl">
                                        <FilterMutilSelect v-model="categories"/>
                                    </div>
                                    <button
                                        @click="saveStep(1)"
                                        class="mt-5 flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                        type="submit">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- item step -->
                        <div class="flex gap-5 mt-10">
                            <div class="w-3 h-3 mt-3 border-slate-700 border-2 rounded-full bg-white"></div>
                            <div>
                                <label class="flex items-center gap-1 text-xl font-medium text-black dark:text-white">
                                    Filter stressness
                                    <ISvg v-if="step > 2" icon="material-symbols:check-circle" class=" text-green-600" />
                                </label>
                                <div class="text-base">
                                    You can choose the filtering level; the higher the level,<br> the more thorough the AI will filter.
                                </div>
                                <div 
                                    v-motion
                                    :initial="{opacity: 0, scale: 0}"
                                    :enter="{opacity: 1, scale: 1}"
                                    class="mt-2" 
                                    v-if="step === 2">
                                    <div class="h-fit rounded w-[300px]">
                                        <vue-slider v-model="filterRange"></vue-slider>
                                    </div>
                                    <button
                                        @click="saveStep(2)"
                                        class="mt-5 flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                        type="submit">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>


                        <!-- item step -->
                        <div class="flex gap-5 mt-10">
                            <div class="w-3 h-3 mt-3 border-slate-700 border-2 rounded-full bg-white"></div>
                            <div>
                                <label class="flex items-center gap-1 text-xl font-medium text-black dark:text-white">
                                    White list
                                    <ISvg v-if="step > 3" icon="material-symbols:check-circle" class=" text-green-600" />
                                </label>
                                <div class="text-base">
                                    You can add a whitelist to allow certain content to <br> pass through the
                                </div>
                                <div 
                                    v-motion
                                    :initial="{opacity: 0, scale: 0}"
                                    :enter="{opacity: 1, scale: 1}"
                                    class="mt-2" 
                                    v-if="step === 3">
                                    <div class="h-fit rounded w-[350px]">
                                        <input
                                            v-model="whiteList"
                                            type="text"
                                            placeholder="Example: facebook.com, youtube.com"
                                            class="w-full rounded-lg border-[1.5px] text-black border-primary bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:bg-form-input"
                                        />
                                    </div>
                                    <button
                                        @click="saveStep(3)"
                                        class="mt-5 flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                        type="submit">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>

                         <!-- item step -->
                         <div class="flex gap-5 mt-10">
                            <div class="w-3 h-3 mt-3 border-slate-700 border-2 rounded-full bg-white"></div>
                            <div>
                                <label class="flex items-center gap-1 text-xl font-medium text-black dark:text-white">
                                    All done, let's go
                                    <ISvg v-if="step > 4" icon="material-symbols:check-circle" class=" text-green-600" />
                                </label>
                                <div class="text-base">
                                    <div>Click OK to finish</div>
                                </div>
                                <div 
                                    v-motion
                                    :initial="{opacity: 0, scale: 0}"
                                    :enter="{opacity: 1, scale: 1}"
                                    class="mt-2" 
                                    v-if="step === 4">
                                    <div class="h-fit rounded w-[300px]">
                                    </div>
                                    <button
                                        @click="saveStep(4)"
                                        class="mt-5 flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                        type="submit">
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>