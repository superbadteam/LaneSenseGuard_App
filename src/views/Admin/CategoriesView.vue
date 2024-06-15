<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '../../components/Breadcrumbs/BreadcrumbDefault.vue'
import TableCategory from '../../components/Category/TableCategory.vue';
const pageTitle = ref('Category manager')
</script>

<template>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-10">
        <TableCategory />
    </div>
</template>
