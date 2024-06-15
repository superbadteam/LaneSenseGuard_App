<script setup lang="ts">
import { buyPack } from '@/services/payment';
import { getSubscriptions, createSubscription } from '@/services/subscription';
import PricingItem from '@/components/Base/Pricing/PricingItem.vue';
import { useUserStore } from '@/stores';
import type { ISubscription } from '@/types/subscription';
import { notify } from '@/utils/notify';
const userStore = useUserStore();
onBeforeMount(() => {
    getSubscriptions().then((data) => {
        console.log(data);
        subscriptions.value = data;
    });
})

const subscriptions = ref<ISubscription[]>([]);
const router = useRouter();
const handleClickPremium = () => {
    console.log('Click premium');
    if (userStore.user) {
        isShowConfirm.value = true;
        console.log('User:', userStore.user);
    } else {
        console.log('User not found');
        router.push('/auth/signin');
    }
}

const onConfirm = () => {
    console.log('Confirm');
    buyPack({
        subscription: currentSubscription.value!._id,
    }).then((data) => {
        console.log(data);
        const url = data.url;
        // open new tab
        if (url) {
            window.open(url, '_blank');
        }
        isShowConfirm.value = false;
        notify('Đăng ký gói Premium thành công', { type: 'success' });
    }).catch((e) => {
        console.log(e);
        notify(e.message, { type: 'error' });
        isShowConfirm.value = false;
    }).finally(() => {
        console.log('Finally');
        currentSubscription.value = null;
    });
}
const isShowConfirm = ref(false);

const currentSubscription = ref<ISubscription | null>(null);
const buy = (sub: ISubscription) => {
    currentSubscription.value = sub;
    isShowConfirm.value = true;
}
</script>
<template>
    <div class="flex flex-col items-center text-slate-700 w-full max-w-screen-xl">
        <div v-if="isShowConfirm && currentSubscription" @click="isShowConfirm = false" class="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5"
        style="">
        <div @click.stop class="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 text-center dark:bg-boxdark md:py-15 md:px-17.5">
            <h3 class="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">Bạn có chắc chắn muốn đăng ký gói {{ currentSubscription.name }} không?
            </h3><span class="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
            <p class="mb-10 font-medium">
                Bạn sẽ được hưởng nhiều ưu đãi hấp dẫn khi đăng ký gói {{ currentSubscription.name }} của chúng tôi.
            </p>
            <div class="-mx-3 flex flex-wrap gap-y-4">
                <div class="w-full px-3 2xsm:w-1/2"><button
                        @click="isShowConfirm = false"
                        class="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
                        Đóng </button></div>
                <div class="w-full px-3 2xsm:w-1/2"><button
                        @click="onConfirm"
                        class="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90">
                        Đăng ký </button></div>
            </div>
        </div>
    </div>
        <section class="text-center py-20 flex-col flex items-center">
            <div class="logo">
                <img width="47" height="47" src="/assets/img/logo.png" alt="Logo" />
                <div>
                    <span class="text1 text-slate-700">Safe</span>
                    <span class="text2">Surf</span>
                </div>
            </div>
            
            <h1 class=" font-extrabold text-5xl mt-5">Bắt đầu duyệt web an toàn với SafeSurf</h1>
            <h2 class="text-xl mt-5">
                Bắt đầu với <strong>ba bước</strong> đơn giản sau để bắt đầu bảo vệ thiết bị của bạn và <br> giám sát hoạt động trực tuyến ngay lập tức.
            </h2>
            <div class="flex gap-5 mt-8">
                <a href="#section1" class="border-2 border-stroke py-2 px-5 rounded-3xl cursor-pointer hover:bg-slate-100">1. Tạo tài khoản</a>
                <a href="#section2" class="border-2 border-stroke py-2 px-5 rounded-3xl cursor-pointer hover:bg-slate-100">2. Cài đặt safesuft</a>
                <a href="#section3" class="border-2 border-stroke py-2 px-5 rounded-3xl cursor-pointer hover:bg-slate-100">3. Bắt đầu duyệt web an toàn</a>
            </div>
        </section>

        <!-- section2 -->
         <section class="w-full" id="section1">
            <div class="w-full rounded-xl bg-slate-100 p-10 flex justify-between items-center">
                <div class="w-[70%] flex gap-5">
                    <div class="w-10 h-10 rounded-full bg-green-500 flex justify-center items-center font-extrabold text-white">
                        <p>1</p>
                    </div>
                    <div>
                        <h2 class="text-3xl font-extrabold ">Tạo tài khoản</h2>
                        <p class=" mt-5">
                            Đăng ký tài khoản SafeSuft miễn phí của bạn và sau đó quyết định xem <br> bạn có muốn nâng cấp lên một gói Premium phù hợp với gia đình của bạn hay không.
                        </p>
                    </div>    
                </div>
                <img class="w-[40%]" src="https://static.qustodio.com/public-site/uploads/2023/11/23143028/createacoount-image%402x.png" alt="">
            </div>
         </section>


          <!-- section3 -->
          <section class="w-full mt-10" id="section2">
            <div class="w-full rounded-xl p-10 flex justify-between items-center">
                <img class="w-[40%]" src="https://static.qustodio.com/public-site/uploads/2023/11/23150606/installqustodio-image%402x.png" alt="">
                <div class="w-[70%] flex gap-5">
                    <div class="w-10 h-10 rounded-full bg-green-500 flex justify-center items-center font-extrabold text-white">
                        <p>2</p>
                    </div>
                    <div>
                        <h2 class="text-3xl font-extrabold ">
                            Cài đặt SafeSurf vào trình duyệt của bạn
                        </h2>
                        <p class=" mt-5">
                            Hãy tải xuống SafeSurf cho trình duyệt của bạn và bắt đầu bảo vệ thiết bị của bạn ngay lập tức.
                        </p>
                        <div class="flex mt-5 gap-5">
                            <!-- <button
                                @click="handleClickPremium"
                                class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                type="submit">
                                Đăng ký premium
                            </button> -->
                            <button
                                class="flex justify-center h-fit rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="button"
                            >
                                Tải miễn phí
                            </button>
                        </div>
                    </div>    
                </div>
            </div>
         </section>

         <!-- subscriptions -->
            <section class="w-full mt-12">
                <div class="flex w-full justify-center flex-wrap gap-6">
                    <PricingItem 
                    v-for="subscription in subscriptions" 
                    :key="subscription._id"
                    @buy="buy"
                    :subscription="subscription" />
                </div>
            </section>


         <!-- section2 -->
         <section class="w-full mt-12" id="section3">
            <div class="w-full rounded-xl bg-slate-100 p-10 flex justify-between items-center">
                <div class="w-[70%] flex gap-5">
                    <div class="w-10 h-10 rounded-full bg-green-500 flex justify-center items-center font-extrabold text-white">
                        <p>3</p>
                    </div>
                    <div>
                        <h2 class="text-3xl font-extrabold ">
                            Bắt đầu duyệt web an toàn
                        </h2>
                        <p class=" mt-5">
                            Bắt đầu giám sát hoạt động trực tuyến của gia đình bạn ngay lập tức <br> và bảo vệ thiết bị của bạn khỏi các trang web không an toàn.
                        </p>
                    </div>    
                </div>
                <img class="w-[40%]" src="https://static.qustodio.com/public-site/uploads/2023/11/23170259/startsupervising-image%402x.png" alt="">
            </div>
         </section>
    </div>
</template>