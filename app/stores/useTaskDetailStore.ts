import type { Task } from '~~/server/types/task.type'
import type { AsyncDataRequestStatus } from '#app'
import { useNuxtApp } from '#app'

export const useTaskDetailStore = defineStore('taskDetail', () => {
  // State
  const taskId = ref<number | null>(null)
  const task = ref<Task | null>(null)
  const status = ref<AsyncDataRequestStatus>('idle')
  const fetchError = ref<Error | null>(null)
  const updateError = ref<Error | null>(null)
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
        fetchError.value = newError as Error
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
    updateError.value = null

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
      updateError.value = e as Error

      // Show error toast
      const { $i18n } = useNuxtApp()
      useNuxtApp().$toast?.add({
        severity: 'error',
        summary: $i18n.t('general.error.title'),
        detail: $i18n.t('general.error.update'),
        life: 5000,
      })

      return false
    } finally {
      isSaving.value = false
    }
  }

  /**
   * Clear update error
   */
  function clearUpdateError() {
    updateError.value = null
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
    fetchError.value = null
    updateError.value = null
    isSaving.value = false
    _refresh = null
  }

  return {
    // State
    taskId,
    task,
    status,
    fetchError,
    updateError,
    isSaving,
    // Computed
    isLoading,
    // Actions
    initializeTask,
    updateTask,
    refreshTask,
    clearUpdateError,
    $reset,
  }
})
