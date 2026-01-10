<script setup lang="ts">
import type { PageHeaderProps } from './types/page-header-props.type'

type Props = {
  headerProps?: PageHeaderProps
}

const props = defineProps<Props>()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="mx-auto max-w-3xl px-4 py-12">
      <!-- Header Section -->
      <PageHeader
        v-bind="headerProps"
        class="mb-6"
      />

      <!-- Content Card -->
      <div class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
