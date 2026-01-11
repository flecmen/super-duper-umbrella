<script setup lang="ts">
import { useTaskDetailStore } from '~/stores/useTaskDetailStore'
import { Skeleton } from 'primevue'
import EditableTaskStatusChip from './chip/EditableTaskStatusChip.vue'
import type { TaskStatus } from '~~/server/types/task-status.enum'

const store = useTaskDetailStore()
const { task } = storeToRefs(store)
const { updateTask } = store

const isUpdateLoading = ref(false)
const isEditingStatus = ref(false)

async function handleUpdateStatus(newStatus: TaskStatus) {
  if (!task.value || newStatus === task.value.status) {
    return
  }

  isUpdateLoading.value = true

  await updateTask(task.value.id, { status: newStatus })

  isUpdateLoading.value = false
  isEditingStatus.value = false
}
</script>

<template>
  <div
    v-if="task"
    class="flex flex-col gap-4"
  >
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-500">{{ $t('task.detail.status') }}:</span>

      <EditableTaskStatusChip
        v-model:is-editing="isEditingStatus"
        :status="task?.status"
        :is-loading="isUpdateLoading"
        editable
        @save="handleUpdateStatus"
      />
    </div>
  </div>
</template>
