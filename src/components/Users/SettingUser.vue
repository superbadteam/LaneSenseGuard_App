<script setup lang="ts">
import { updateUser, getInforApi } from '@/services/user';
import { upload } from '@/services/media';
const userStore = useUserStore()
const loadingStore = useLoadingStore()
import { notify } from '@/utils/notify';

const formData = ref({
  fullName: userStore.user?.name,
  phoneNumber: userStore.user?.phone,
  emailAddress: userStore.user?.email,
  birthDay: userStore.user?.date_of_birth?.split("T")[0],
  gender: userStore.user?.gender,
})

import { useUserStore } from '@/stores';
import { useLoadingStore } from '@/stores/loading';

const handleSubmit = async () => {
  loadingStore.setLoading(true)
  try {
    await updateUser({
      date_of_birth: formData.value.birthDay,
      email: formData.value.emailAddress,
      name: formData.value.fullName,
      gender: formData.value.gender,
      phone: formData.value.phoneNumber,
    })
    notify('User information updated successfully', { type: 'success'})
    const res = await getInforApi()
    userStore.setUser(res)
  } catch (error) {
    console.error(error)
    notify('Failed to update user information', { type: 'error'})
  }
  loadingStore.setLoading(false)
}

const handleCancel = () => {
  // Handle cancel action for personal information
}

const handlePhotoSubmit = () => {
  const fd = new FormData()
  fd.append('file', imgPreview.value.raw)
  upload(fd)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
}

const convertToPreviewImage = (file: File) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    imgPreview.value.preview = reader.result as string
  }
}

const imgPreview = ref({
  preview: '/assets/img/avatar_03.png',
  raw: ''
})
const handleFileChange = (event: Event) => {
  imgPreview.value.raw = event.target.files[0]
  convertToPreviewImage(imgPreview.value.raw)
  // Handle file change for user photo
}

const handlePhotoCancel = () => {
  // Handle cancel action for user photo
}

const deletePhoto = () => {
  // Handle delete action for user photo
}

const updatePhoto = () => {
  // Handle update action for user photo
}
</script>

<template>
  <div class="grid grid-cols-5 gap-8">
    <!-- Personal Information Section -->
    <div class="col-span-5 xl:col-span-3">
      <div
        class="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <div class="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 class="font-medium text-black dark:text-white">Personal Information</h3>
        </div>
        <div class="p-7">
          <form @submit.prevent="handleSubmit">
            <!-- Full Name Section -->
            <div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div class="w-full sm:w-1/2">
                <label
                  class="mb-3 block text-sm font-medium text-black dark:text-white"
                  for="fullName"
                  >Full Name</label
                >
                <div class="relative">
                  <span class="absolute left-4.5 top-4">
                    <ISvg icon="solar:user-linear" class="text-xl"/>
                  </span>
                  <input
                    v-model="formData.fullName"
                    class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-normal text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Devid Jhon"
                  />
                </div>
              </div>

              <!-- Phone Number Section -->
              <div class="w-full sm:w-1/2">
                <label
                  class="mb-3 block text-sm font-medium text-black dark:text-white"
                  for="phoneNumber"
                  >Phone Number</label
                >
                <input
                  v-model="formData.phoneNumber"
                  class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-normal text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="+990 3343 7865"
                />
              </div>
            </div>

            <!-- Email Address Section -->
            <div class="mb-5.5">
              <label
                class="mb-3 block text-sm font-medium text-black dark:text-white"
                for="emailAddress"
                >Email Address</label
              >
              <div class="relative">
                <span class="absolute left-4.5 top-4">
                  <svg
                    class="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                        fill=""
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                        fill=""
                      />
                    </g>
                  </svg>
                </span>
                <input
                  v-model="formData.emailAddress"
                  class="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 font-normal text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="email"
                  name="emailAddress"
                  id="emailAddress"
                  placeholder="devidjond45@gmail.com"
                />
              </div>
            </div>

            <!-- Username Section -->
            <div class="mb-5.5 flex items-center gap-3">
              <label
                class="block text-sm font-medium text-black dark:text-white"
                for="gender"
                >Male</label
              >
              <input
                v-model="formData.gender"
                class="block"
                type="radio"
                id="male"
                :value="true"
              />
              <label
                class="block text-sm font-medium text-black dark:text-white"
                for="gender"
                >Female</label
              >
              <input
                v-model="formData.gender"
                class="block"
                type="radio"
                :value="false"
                id="female"
              />
            </div>

            <!-- Birthday Section -->
            <div class="mb-5.5">
              <label
                class="mb-3 block text-sm font-medium text-black dark:text-white"
                for="Username"
                >Birthday</label
              >
              <input
                v-model="formData.birthDay"
                class="w-full rounded border border-stroke bg-gray py-3 px-4.5 font-normal text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="date"
                name="Birthday"
                id="birthday"
              />
            </div>


            <!-- Save and Cancel Buttons -->
            <div class="flex justify-end gap-4.5">
              <!-- <button
                class="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="button"
                @click="handleCancel"
              >
                Cancel
              </button> -->
              <button
                class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Your Photo Section -->
    <div class="col-span-5 xl:col-span-2">
      <div
        class="rounded-xl h-full border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <div class="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 class="font-medium text-black dark:text-white">Your Photo</h3>
        </div>
        <div class="p-7">
          <form @submit.prevent="handlePhotoSubmit">
            <!-- User Photo Section -->
            <div class="mb-4 flex items-center gap-3">
              <div class="h-14 w-14 rounded-full">
                <img class="w-14 h-14 object-cover rounded-full min-w-14" :src="imgPreview.preview" alt="User" />
              </div>
              <div>
                <span class="mb-1.5 font-medium text-black dark:text-white">Edit your photo</span>
              </div>
            </div>

            <!-- File Upload Section -->
            <div
              id="FileUpload"
              class="relative h-[262px] mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
            >
              <input
                type="file"
                accept="image/*"
                class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                @change="handleFileChange"
              />
              <div class="flex flex-col items-center justify-center space-y-3">
                <span
                  class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                      fill="#3C50E0"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                      fill="#3C50E0"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                      fill="#3C50E0"
                    />
                  </svg>
                </span>
                <p class="text-sm font-medium">
                  <span class="text-primary">Click to upload</span> or drag and drop
                </p>
                <p class="mt-1.5 text-sm font-medium">SVG, PNG, JPG or GIF</p>
                <p class="text-sm font-medium">(max, 800 X 800px)</p>
              </div>
            </div>

            <!-- Save and Cancel Buttons for Photo Section -->
            <div class="flex justify-end gap-4.5">
              <!-- <button
                class="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="button"
                @click="handlePhotoCancel"
              >
                Cancel
              </button> -->
              <button
                class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
