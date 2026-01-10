<script setup lang="ts">
import type { Task } from '~~/server/types/task.type'
import TaskStatusChip from './TaskStatusChip.vue'
import { Skeleton } from 'primevue'

type Props = {
  task?: Task | null
  isLoading?: boolean
}
const props = defineProps<Props>()
</script>

<template>
  <!-- Loading State -->
  <div
    v-if="isLoading"
    class="flex flex-col gap-4"
  >
    <Skeleton
      width="60%"
      height="2rem"
    />
    <Skeleton width="8rem" />
  </div>

  <!-- Task Content -->
  <div
    v-else-if="task"
    class="flex flex-col gap-4"
  >
    <h1 class="text-2xl font-semibold text-gray-900">
      {{ task.title }}
    </h1>

    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-500">{{ $t('task.detail.status') }}:</span>
      <TaskStatusChip :status="task.status" />
    </div>
  </div>
</template>
