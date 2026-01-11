<script setup lang="ts">
import type { TaskStatus } from '~~/server/types/task-status.enum'
import TaskStatusSelect from './TaskStatusSelect.vue'
import type { TaskStatusChipProps } from './types/task-status-chip-props'
import TaskStatusChip from './TaskStatusChip.vue'

type Props = TaskStatusChipProps & {
  isLoading?: boolean
  isEditing?: boolean
}
defineProps<Props>()

const emit = defineEmits<{
  save: [value: TaskStatus]
  cancel: []
}>()

const isEditing = defineModel<boolean>('isEditing', { default: false })
</script>

<template>
  <InlineEdit
    v-model:is-editing="isEditing"
    :value="status"
    :is-loading="isLoading"
    @save="emit('save', $event as TaskStatus)"
    @cancel="emit('cancel')"
  >
    <template #value>
      <TaskStatusChip :status />
    </template>

    <template #input="{ editValue, updateValue }">
      <TaskStatusSelect
        :model-value="editValue as TaskStatus"
        autofocus
        @update:model-value="updateValue"
      />
    </template>
  </InlineEdit>
</template>
