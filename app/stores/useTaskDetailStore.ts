import type { Task } from '~~/server/types/task.type'

export const useTaskDetailStore = defineStore('taskDetail', () => {
  const task = ref<Task | null>(null)
  const isLoading = ref(false)
  const isSaving = ref(false)
  const error = ref<Error | null>(null)

  async function fetchTask(id: number) {
    isLoading.value = true
    error.value = null
    try {
      task.value = await $fetch<Task>(`/api/tasks/${id}`)
    } catch (e) {
      error.value = e as Error
      task.value = null
    } finally {
      isLoading.value = false
    }
  }

  async function updateTask(id: number, data: Partial<Task>) {
    isSaving.value = true
    try {
      const updated = await $fetch<Task>(`/api/tasks/${id}`, {
        method: 'PUT',
        body: data,
      })
      // Use the returned data directly instead of refetching
      task.value = updated
      return true
    } catch (e) {
      error.value = e as Error
      return false
    } finally {
      isSaving.value = false
    }
  }

  function $reset() {
    task.value = null
    isLoading.value = false
    isSaving.value = false
    error.value = null
  }

  return {
    task,
    isLoading,
    isSaving,
    error,
    fetchTask,
    updateTask,
    $reset,
  }
})
