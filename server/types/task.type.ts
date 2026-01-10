import type { TaskStatus } from './task-status.enum'

export type Task = {
  id: number
  title: string
  status: TaskStatus
}
