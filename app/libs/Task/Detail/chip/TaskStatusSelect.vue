<script setup lang="ts">
// Enums
import { TaskStatus } from '~~/server/types/task-status.enum'

type Props = {
  modelValue: TaskStatus
  placeholder?: string
}
defineProps<Props>()

const selectedStatus = defineModel<Props['modelValue']>()

const statusOptions = Object.values(TaskStatus)
</script>

<template>
  <Select
    v-model="selectedStatus"
    :options="statusOptions"
    :option-label="(option: TaskStatus) => $t(`task.status.${option}`)"
    :placeholder="placeholder ?? $t('task.status.select')"
    class="w-full max-w-xs"
  />
</template>
