// Types
import type { Task } from '~~/server/types/task.type'

// Functions
import { useNuxtApp } from '#app'

export const useTaskDetailStore = defineStore('taskDetail', () => {
  // State
  const taskId = ref<number | null>(null)
  const updateError = ref<Error | null>(null)

  const hasValidTaskId = computed(() => taskId.value !== null && taskId.value > 0)

  const asyncDataKey = computed(() => `task-detail-${taskId.value}`)

  const {
    data: task,
    status,
    error: fetchError,
    refresh: refetchTask,
  } = useAsyncData(
    asyncDataKey,
    () => {
      if (!hasValidTaskId.value) {
        return Promise.resolve(null)
      }

      return $fetch<Task>(`/api/tasks/${taskId.value}`)
    },
    {
      watch: [taskId],
      immediate: true,
    },
  )

  const isLoading = computed(() => status.value === 'pending')

  async function updateTask(id: number, data: Partial<Task>) {
    updateError.value = null

    try {
      await $fetch<Task>(`/api/tasks/${id}`, {
        method: 'PUT',
        body: data,
      })

      await refetchTask()

      return true
    } catch (e) {
      updateError.value = e as Error

      const { $i18n, $toast } = useNuxtApp()

      $toast?.add({
        severity: 'error',
        summary: $i18n.t('general.error.title'),
        detail: $i18n.t('general.error.update'),
        life: 5000,
      })

      return false
    }
  }

  function $reset() {
    taskId.value = null
    updateError.value = null
  }

  return {
    // State
    taskId,
    task,
    status,
    fetchError,
    updateError,
    isLoading,

    // Actions
    updateTask,
    $reset,
  }
})
