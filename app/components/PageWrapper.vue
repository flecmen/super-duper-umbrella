<script setup lang="ts">
import type { PageHeaderProps } from './types/page-header-props.type'

type Props = {
  headerProps?: PageHeaderProps
  isLoading?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
    <div class="mx-auto max-w-4xl px-6 py-16">
      <!-- Header Section -->
      <PageHeader
        v-bind="headerProps"
        :is-loading
        class="mb-8"
      />

      <!-- Content Card -->
      <div class="rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-lg shadow-gray-200/50 ring-1 ring-gray-200/60">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
