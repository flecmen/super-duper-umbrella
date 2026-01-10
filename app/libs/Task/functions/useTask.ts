import type { Task } from '~~/server/types/task.type'

export function useTask(id: number) {
  const {
    data: task,
    status,
    error,
    refresh,
  } = useAsyncData(`task-${id}`, () => $fetch<Task>(`/api/tasks/${id}`))

  return {
    task,
    status,
    error,
    refresh,
  }
}
