// import '../public/assets/css/satoshi.css'
import './assets/css/style.css'
import 'jsvectormap/dist/css/jsvectormap.min.css'
import 'flatpickr/dist/flatpickr.min.css'

import { MotionPlugin } from '@vueuse/motion'

// global component
import DefaultLayout from './layouts/DefaultLayout.vue';
import GuestLayout from './layouts/GuestLayout.vue';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

import { initAuthStore } from './stores'
import { Icon } from '@iconify/vue';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { vueImage } from './plugins/vue-image'
import App from './App.vue'
import router from './router'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

(async () => {
    const app = createApp(App)
    app.use(MotionPlugin)

    app.use(createPinia())
    try {
        await initAuthStore()
    } catch (e) {}
    app.use(router)
    app.component('VueSlider', VueSlider)
    app.component('default-layout', DefaultLayout)
    app.component('guest-layout', GuestLayout)
    app.use(VueApexCharts)
    app.component('ISvg', Icon)
    app.use(vueImage)
    app.use(Vue3Toastify, {
        autoClose: 3000,
        hideProgressBar: true,
        theme: 'colored',
    } as ToastContainerOptions);

    router.isReady().then(() => {
        app.mount('#app')
    })
})()
