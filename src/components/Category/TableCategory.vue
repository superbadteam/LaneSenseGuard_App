<script setup lang="ts">
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '@/services/category';
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
  const data = await getCategories();
  users.value = data;
  loadingStore.setLoading(false);
});

const users = ref<IUser[]>([])

const updateCate = async (id: string) => {
  try {
    loadingStore.setLoading(true);
    const data = await getCategory(id);
    if (data) {
      // form.value = data;
      // modalUpdateCategory.value = true;
    }
  } catch (error) {
    notify('Get category failed', {
        type: 'error',
      }
    );
  }
  loadingStore.setLoading(false);
}

const deleteCate = async (id: string) => {
  try {
    loadingStore.setLoading(true);
    await deleteCategory(id);
    const data = await getCategories();
    users.value = data;
    notify('Delete category successfully', {
        type: 'success',
      }
    );
  } catch (error) {
    notify('Delete category failed', {
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
              Created at
            </th>
            <th class="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in usersComputed" :key="index" class="hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" @click="toDetailUser(item._id)">
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ item.name }}</p>
            </td>
            <td class="py-5 px-4">
              <p class="text-black dark:text-white">{{ item.createdAt }}</p>
            </td>
            <td class="py-5 px-4">
              <div class="flex items-center space-x-3.5 text-4xl">
                <ISvg @click.stop="updateCate(item._id)" icon="material-symbols:edit" class="cursor-pointer text-primary" />
                <ISvg @click.stop="deleteCate(item._id)" icon="material-symbols:delete" class="cursor-pointer text-primary" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
