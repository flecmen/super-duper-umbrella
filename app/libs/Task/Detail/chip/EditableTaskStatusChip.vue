<script setup lang="ts">
// Types
import type { TaskStatus } from '~~/server/types/task-status.enum'
import type { TaskStatusChipProps } from '~/libs/Task/Detail/chip/types/task-status-chip-props'

// Components
import TaskStatusSelect from '~/libs/Task/Detail/chip/TaskStatusSelect.vue'
import TaskStatusChip from '~/libs/Task/Detail/chip/TaskStatusChip.vue'
import InlineEdit from '~/libs/App/components/InlineEdit.vue'

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
