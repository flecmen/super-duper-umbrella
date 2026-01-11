<script setup lang="ts">
import type { PageHeaderProps } from './types/page-header-props.type'

const props = defineProps<PageHeaderProps>()
</script>

<template>
  <div class="flex gap-2 items-start">
    <Button
      v-if="backTo"
      icon="pi pi-arrow-left"
      variant="text"
      @click="navigateTo(backTo)"
    />

    <div v-if="isLoading">
      <Skeleton width="12rem" height="2rem" class="mb-2" />
      <Skeleton width="20rem" height="1rem" />
    </div>

    <div v-else>
      <h1 class="text-3xl font-bold text-gray-900">
        {{ title }}
      </h1>

      <p class="mt-1 text-gray-500">
        {{ description }}
      </p>
    </div>
  </div>
</template>
