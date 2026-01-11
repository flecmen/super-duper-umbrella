<script setup lang="ts">
// Enums
import { TaskStatus } from '~~/server/types/task-status.enum'

// Types
import type { TaskStatusChipProps } from '~/libs/Task/Detail/chip/types/task-status-chip-props'

defineProps<TaskStatusChipProps>()

const statusStyles: Record<TaskStatus, string> = {
  [TaskStatus.Todo]: 'bg-gray-100 text-gray-700',
  [TaskStatus.InProgress]: 'bg-blue-100 text-blue-700',
  [TaskStatus.Done]: 'bg-green-100 text-green-700',
}
</script>

<template>
  <Chip
    class="h-6.5"
    :class="statusStyles[status]"
    :label="$t(`task.status.${status}`)"
  />
</template>
