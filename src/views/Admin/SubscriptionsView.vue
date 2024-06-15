<script setup lang="ts">
import { getSubscriptions, updateSubscription, createSubscription } from '@/services/subscription';
import type { ISubscription } from '@/types/subscription';
import PricingItem from '@/components/Base/Pricing/PricingItem.vue';
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue';
import SubscriptionModal from '@/components/Base/Modal/SubscriptionModal.vue';
import { notify } from '@/utils/notify';

const subscriptions = ref<ISubscription[]>([]);

onBeforeMount(() => {
    getSubscriptions().then((data) => {
        console.log(data);
        subscriptions.value = data;
    });
})

const currentSubscription = ref({
    name: '',
    price: '',
    discount: '',
    description: '',
    title: 'Tạo gói mới',
    isShow: false,
    _id : ''
});

const onEdit = (subscription: ISubscription) => {
    currentSubscription.value = {
        name: subscription.name,
        price: subscription.price.toString(),
        discount: subscription.discount.toString(),
        description: subscription.description,
        title: 'Chỉnh sửa gói',
        isShow: true,
        _id: subscription._id
    }
}

const onClose = () => {
    currentSubscription.value.isShow = false;
    // reset
    currentSubscription.value = {
        name: '',
        price: '',
        discount: '',
        description: '',
        title: 'Tạo gói mới',
        isShow: false,
        _id: ''
    }
}

const onSave = () => {
    const data = {
        name: currentSubscription.value.name,
        price: Number(currentSubscription.value.price),
        discount: Number(currentSubscription.value.discount),
        description: currentSubscription.value.description,
    }
    console.log('Save', currentSubscription.value);
    if (currentSubscription.value.title === 'Tạo gói mới') {
        // create
        createSubscription(data).then(() => {
            getSubscriptions().then((data) => {
                subscriptions.value = data;
            });
            notify('Tạo gói thành công', { type: 'success'});
        }).catch((err) => {
            notify(err.message, { type: 'error'});
        }).finally(() => {
            currentSubscription.value.isShow = false;
            // reset
            currentSubscription.value = {
                name: '',
                price: '',
                discount: '',
                description: '',
                title: 'Tạo gói mới',
                isShow: false,
                _id: ''
            }
        })
    } else {
        // update
        updateSubscription(currentSubscription.value._id, data).then(() => {
            getSubscriptions().then((data) => {
                subscriptions.value = data;
            });
            
            notify('Cập nhật gói thành công', { type: 'success'});
        }).catch((err) => {
            notify(err.message, { type: 'error'});
        }).finally(() => {
            currentSubscription.value.isShow = false;
            // reset
            currentSubscription.value = {
                name: '',
                price: '',
                discount: '',
                description: '',
                title: 'Tạo gói mới',
                isShow: false,
                _id: ''
            }
        })
    }
    
}

const openCreateModal = () => {
    currentSubscription.value.isShow = true;
}
</script>
<template>
    <div>
        <BreadcrumbDefault :pageTitle="'Subscriptions'" />
        <SubscriptionModal 
            @close="onClose"
            @save="onSave"
            v-if="currentSubscription.isShow"
            :title="currentSubscription.title"
            v-model:name="currentSubscription.name"
            v-model:price="currentSubscription.price"
            v-model:discount="currentSubscription.discount"
            v-model:description="currentSubscription.description"
            />
        <button
            @click="openCreateModal"
            class="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit">
            Tạo gói mới
        </button>
        <div class="mt-5 flex justify-center gap-5 text-slate-700 w-full max-w-screen-xl">
                <PricingItem v-for="subscription in subscriptions" :key="subscription._id" :subscription="subscription" :allowEdit="true" @edit="onEdit"/>
        </div>
    </div>
</template>