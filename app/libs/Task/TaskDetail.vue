<script setup lang="ts">
import { useTaskDetailStore } from '~/stores/useTaskDetailStore'
import TaskStatusChip from './TaskStatusChip.vue'
import { Skeleton } from 'primevue'

const store = useTaskDetailStore()
const { task, isLoading } = storeToRefs(store)
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
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-500">{{ $t('task.detail.status') }}:</span>
      <TaskStatusChip :status="task?.status" />
    </div>
  </div>
</template>
