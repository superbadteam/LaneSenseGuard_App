<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import SettingsCard from '@/components/SettingsCard.vue'
import SettingUser from '@/components/Users/SettingUser.vue'

const pageTitle = ref('Settings Account')
</script>

<template>
    <div class="mx-auto">
      <!-- Breadcrumb Start -->
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Breadcrumb End -->
      <SettingUser />
    </div>
</template>
