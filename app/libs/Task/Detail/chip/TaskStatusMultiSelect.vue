<script setup lang="ts">
// Enums
import { TaskStatus } from '~~/server/types/task-status.enum'

type Props = {
  modelValue: TaskStatus[]
  placeholder?: string
}
defineProps<Props>()

const selectedStatuses = defineModel<Props['modelValue']>()

const statusOptions = Object.values(TaskStatus)
</script>

<template>
  <MultiSelect
    v-model="selectedStatuses"
    :options="statusOptions"
    :option-label="(option: TaskStatus) => $t(`task.status.${option}`)"
    :placeholder="placeholder ?? $t('task.status.filterBy')"
    class="w-full max-w-xs"
  />
</template>
