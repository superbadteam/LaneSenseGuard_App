<script setup lang="ts">
defineProps<{
    title: string;
}>();

const name = defineModel('name', { required: true, default: '' });
const price = defineModel('price', { required: true, default: '' });
const discount = defineModel('discount', { required: true, default: '' });
const description = defineModel('description', { required: true, default: '' });

const emit = defineEmits(['close', 'save']);
</script>
<template>
    <div @click="emit('close')" class="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
        style="">
        <div @click.stop class="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 text-center dark:bg-boxdark md:py-15 md:px-17.5">
            <h3 class="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                {{ title }}
            </h3>
            <span class="mx-auto inline-block h-1 w-22.5 rounded bg-primary"></span>


            <!-- Tên -->
            <div class="w-full flex flex-col items-start mt-5">
                <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="phoneNumber">Tên</label>
                <input v-model="name"
                    class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-normal text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text" name="phoneNumber" id="phoneNumber" placeholder="Tên" />
            </div>


            <div class="flex gap-5">
                <!-- Giá: -->
                <div class="w-full flex flex-col items-start mt-5">
                    <label class="mb-3 block text-sm font-medium text-black dark:text-white"
                        for="phoneNumber">Giá:</label>
                    <input
                        v-model="price"
                        class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-normal text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text" name="phoneNumber" id="phoneNumber" placeholder="Giá: 200000" />
                </div>

                <!-- Giảm giá: -->
                <div class="w-full flex flex-col items-start mt-5">
                    <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="phoneNumber">Giảm
                        giá:</label>
                    <input
                        v-model="discount"
                        class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-normal text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text" name="phoneNumber" id="phoneNumber" placeholder="Giảm giá: 10" />
                </div>
            </div>


            <!-- mô tả -->
            <div class="w-full flex flex-col items-start mt-5">
                <label class="mb-3 block text-sm font-medium text-black dark:text-white" for="phoneNumber">Mô tả</label>
                <textarea
                  v-model="description"
                  class="w-full rounded border border-stroke bg-gray p-3 font-normal text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="bio"
                  id="bio"
                  rows="6"
                  placeholder="Description..."
                ></textarea>
            </div>


            <div class="-mx-3 mt-10 flex flex-wrap gap-y-4">
                <div class="w-full px-3 2xsm:w-1/2">
                    <button
                        class="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
                        Cancel
                    </button>
                </div>
                <div class="w-full px-3 2xsm:w-1/2">
                    <button
                        @click="emit('save')"
                        class="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>