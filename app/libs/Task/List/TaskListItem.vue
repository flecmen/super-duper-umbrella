<script setup lang="ts">
import type { Task } from '~~/server/types/task.type'

import TaskStatusChip from '~/libs/Task/TaskStatusChip.vue'

type Props = {
  task: Task
}
const props = defineProps<Props>()
</script>

<template>
  <div class="w-full rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
    <div class="flex items-center justify-between">
      <span class="font-medium text-gray-900">{{ task.title }}</span>

      <TaskStatusChip :status="task.status" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
