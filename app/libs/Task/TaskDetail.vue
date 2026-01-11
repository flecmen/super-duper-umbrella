<script setup lang="ts">
import { useTaskDetailStore } from '~/stores/useTaskDetailStore'
import TaskStatusChip from './TaskStatusChip.vue'
import { Skeleton } from 'primevue'

const store = useTaskDetailStore()
const { task, isLoading, isSaving } = storeToRefs(store)

const isEditing = ref(false)

async function saveTitle(newTitle: string) {
  if (!task.value)
    return

  const success = await store.updateTask(task.value.id, { title: newTitle })
  if (success) {
    isEditing.value = false
  }
}
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
    <InlineTextEdit
      v-model:is-editing="isEditing"
      :value="task.title"
      :is-loading="isSaving"
      @save="saveTitle"
      @cancel="isEditing = false"
    >
      <h1 class="text-2xl font-semibold text-gray-900">
        {{ task?.title }}
      </h1>
    </InlineTextEdit>

    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-500">{{ $t('task.detail.status') }}:</span>
      <TaskStatusChip :status="task?.status" />
    </div>
  </div>
</template>
