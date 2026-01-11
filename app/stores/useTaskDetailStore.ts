import type { Task } from '~~/server/types/task.type'
import type { AsyncDataRequestStatus } from '#app'

export const useTaskDetailStore = defineStore('taskDetail', () => {
  // State
  const taskId = ref<number | null>(null)
  const task = ref<Task | null>(null)
  const status = ref<AsyncDataRequestStatus>('idle')
  const error = ref<Error | null>(null)
  const isSaving = ref(false)

  // Private refresh function - set by initializeTask
  let _refresh: (() => Promise<void>) | null = null

  // Computed
  const isLoading = computed(() => status.value === 'pending')

  /**
   * Initialize the store with a task ID and set up useAsyncData.
   * Call this in the page component's setup.
   */
  function initializeTask(id: number) {
    taskId.value = id

    const asyncData = useAsyncData(
      `task-detail-${id}`,
      () => $fetch<Task>(`/api/tasks/${id}`),
      { watch: [() => taskId.value] },
    )

    // Sync async data state with store
    watch(asyncData.data, newTask => {
      task.value = newTask ?? null
    }, { immediate: true })

    watch(asyncData.status, newStatus => {
      status.value = newStatus
    }, { immediate: true })

    watch(asyncData.error, newError => {
      if (newError) {
        error.value = newError as Error
      }
    }, { immediate: true })

    // Store refresh function for later use
    _refresh = async () => {
      await asyncData.refresh()
    }

    return asyncData
  }

  /**
   * Update task and refetch on success
   */
  async function updateTask(id: number, data: Partial<Task>) {
    isSaving.value = true
    error.value = null

    try {
      await $fetch<Task>(`/api/tasks/${id}`, {
        method: 'PUT',
        body: data,
      })

      // Refetch task data after successful update
      if (_refresh) {
        await _refresh()
      }

      return true
    } catch (e) {
      error.value = e as Error
      return false
    } finally {
      isSaving.value = false
    }
  }

  /**
   * Manually refresh task data
   */
  async function refreshTask() {
    if (_refresh) {
      await _refresh()
    }
  }

  function $reset() {
    taskId.value = null
    task.value = null
    status.value = 'idle'
    error.value = null
    isSaving.value = false
    _refresh = null
  }

  return {
    // State
    taskId,
    task,
    status,
    error,
    isSaving,
    // Computed
    isLoading,
    // Actions
    initializeTask,
    updateTask,
    refreshTask,
    $reset,
  }
})
