<script setup lang="ts">
import type { Task } from '~~/server/types/task.type'

import TaskStatusChip from '~/libs/Task/TaskStatusChip.vue'
import { Skeleton } from 'primevue'

type Props = {
  task?: Task
  isLoading?: boolean
}
const props = defineProps<Props>()
</script>

<template>
  <div v-if="isLoading">
    <Skeleton class="mb-2" />
    <Skeleton
      width="10rem"
      class="mb-2"
    />
  </div>

  <div
    v-else-if="task"
    class="w-full rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
  >
    <div class="flex items-center justify-between">
      <p class="font-medium text-gray-900">
        {{ task.title }}
      </p>

      <TaskStatusChip :status="task.status" />
    </div>
  </div>
</template>
