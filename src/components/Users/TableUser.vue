<script setup lang="ts">
import { getUsers, activeUser, deactiveUser } from '@/services/user';
import { useLoadingStore } from '@/stores/loading';
import type { IUser } from '@/types/user';
import { notify } from '@/utils/notify';
const loadingStore = useLoadingStore()
const router = useRouter();
const route = useRoute();

const querySearch = computed(() => route.query.q as string);

const usersComputed = computed(() => {
  return users.value.filter((user) => {
    if (!querySearch.value) return true;
    return user.name.toLowerCase().includes(querySearch.value.toLowerCase());
  });
});

onBeforeMount(async () => {
  loadingStore.setLoading(true);
  const data = await getUsers();
  users.value = data;
  loadingStore.setLoading(false);
});

const users = ref<IUser[]>([])

const active = async (id: string) => {
  try {
    loadingStore.setLoading(true);
    await activeUser(id);
    const data = await getUsers();
    users.value = data;
    notify('Activate user successfully', {
        type: 'success',
      }
    );
  } catch (error) {
    notify('Activate user failed', {
        type: 'error',
      }
    );
  }
  loadingStore.setLoading(false);
}

const deactive = async (id: string) => {
  loadingStore.setLoading(true);
  try {
    await deactiveUser(id);
    const data = await getUsers();
    users.value = data;
    notify('Deactivate user successfully', {
        type: 'success',
      }
    );
  } catch (error) {
    notify('Deactivate user failed', {
        type: 'error',
      }
    );
  }
  loadingStore.setLoading(false);
}

const toDetailUser = (id: string) => {
  console.log(id);
  router.push(`/admin/users/${id}`);
}
</script>

<template>
  <div
    class="rounded-xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="max-w-full overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr class="bg-gray-2 text-left dark:bg-meta-4">
            <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Name
            </th>
            <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Email
            </th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Phone</th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Gender</th>
            <th class="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in usersComputed" :key="index" class="hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" @click="toDetailUser(item._id)">
            <td class="py-5 px-4 pl-5 xl:pl-11">
              <div class="flex gap-2 items-center">
                <div class="relative">
                  <img class="w-12 h-12 object-cover rounded-full" v-image="item.avatar" alt="">
                </div>
                <div class="flex flex-col">
                  <h5 class="font-medium text-black dark:text-white">{{ item.name }}</h5>
                  <div class="bg-white w-fit -left-3 rounded-full  -bottom-2 ">
                      <div class="flex items-center bg-opacity-10 rounded-full  py-0 px-2 text-xs font-medium" :class="{
                      'bg-danger text-danger': item.membership === 2,
                      'bg-primary text-primary': item.membership === 1
                      }">
                        {{ item.membership === 1 ? 'Standard' : 'Premium' }}
                      <ISvg icon="fluent:premium-20-filled" v-if="item.membership === 2"/>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ item.email }}</p>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ item.phone }}</p>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ item.gender ? 'Male' : 'Female' }}</p>
            </td>
            <td class="py-5 px-4">
              <p class="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium" :class="{
                'bg-warning text-warning': item.role === 2,
                'bg-success text-success': item.role === 1
              }">
                {{ item.role === 1 ? 'Admin' : 'user' }}
              </p>
            </td>
            <td class="py-5 px-4">
              <div class="flex items-center space-x-3.5 text-4xl">
                <ISvg v-if="!item.is_active" @click.stop="active(item._id)" icon="material-symbols:toggle-off-outline"
                  class="cursor-pointer text-primary" />
                <ISvg v-else @click.stop="deactive(item._id)" icon="material-symbols:toggle-on" class="cursor-pointer text-primary" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
