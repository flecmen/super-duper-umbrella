// Types
import type { TaskStatus } from '~~/server/types/task-status.enum'

export function useTasks() {
  const selectedStatuses = useState<TaskStatus[]>('selectedStatuses', () => [])

  const { data: tasks, status, refresh } = useAsyncData(
    'tasks-list',
    () => $fetch('/api/tasks'),
  )

  const filteredTasks = computed(() => {
    if (!tasks.value)
      return []
    if (selectedStatuses.value.length === 0)
      return tasks.value
    return tasks.value.filter(task => selectedStatuses.value.includes(task.status))
  })

  return {
    tasks,
    filteredTasks,
    status,
    refresh,
    selectedStatuses,
  }
}
