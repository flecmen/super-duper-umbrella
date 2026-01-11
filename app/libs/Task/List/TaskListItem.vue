<script setup lang="ts">
import type { Task } from '~~/server/types/task.type'

import TaskStatusChip from '~/libs/Task/Detail/chip/TaskStatusChip.vue'
import { Skeleton } from 'primevue'

type Props = {
  task?: Task
  isLoading?: boolean
}
const props = defineProps<Props>()

function handleClick() {
  if (props.task) {
    navigateTo(`/tasks/${props.task.id}`)
  }
}
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
    class="w-full rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
    @click="handleClick"
  >
    <div class="flex items-center justify-between">
      <p class="font-medium text-gray-900">
        {{ task.title }}
      </p>

      <TaskStatusChip :status="task.status" />
    </div>
  </div>
</template>
