<script setup lang="ts">
import type { PageHeaderProps } from './types/page-header-props.type'

const props = defineProps<PageHeaderProps>()
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900">
      {{ title }}
    </h1>
    <p class="mt-1 text-gray-500">
      {{ description }}
    </p>
  </div>
</template>
