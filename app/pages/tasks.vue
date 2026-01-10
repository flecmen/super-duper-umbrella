<script setup lang="ts">
import { useTasks } from '~/libs/Task/functions/useTasks'
import TaskStatusChip from '~/libs/Task/TaskStatusChip.vue'
import { TaskStatus } from '~~/server/types/task-status.enum'

const { filteredTasks, status, selectedStatuses, statusOptions, taskCounts } = await useTasks()

const statusStyles: Record<TaskStatus, string> = {
  [TaskStatus.Todo]: 'bg-gray-100 text-gray-700',
  [TaskStatus.InProgress]: 'bg-blue-100 text-blue-700',
  [TaskStatus.Done]: 'bg-green-100 text-green-700',
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-3xl px-4">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Tasks
        </h1>
        <p class="mt-1 text-gray-500">
          Manage and track your tasks
        </p>
      </div>

      <!-- Status Filter Dropdown -->
      <MultiSelect
        v-model="selectedStatuses"
        :options="statusOptions"
        option-label="label"
        option-value="value"
        placeholder="Filter by status"
        class="w-full max-w-xs"
      />

      <!-- Loading State -->
      <div
        v-if="status === 'pending'"
        class="space-y-3"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="animate-pulse rounded-lg bg-white p-4 shadow-sm"
        >
          <div class="h-5 w-3/4 rounded bg-gray-200" />
          <div class="mt-2 h-4 w-1/4 rounded bg-gray-100" />
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="filteredTasks.length === 0"
        class="rounded-lg bg-white py-12 text-center shadow-sm"
      >
        <svg
          class="mx-auto h-12 w-12 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">
          No tasks found
        </h3>
        <p class="mt-1 text-gray-500">
          {{ selectedStatuses.length === 0 ? 'Get started by creating a new task.' : `No tasks matching the selected filters.` }}
        </p>
      </div>

      <!-- Task List -->
      <ul
        v-else
        class="space-y-3"
      >
        <li
          v-for="task in filteredTasks"
          :key="task.id"
          class="rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-900">{{ task.title }}</span>

            <TaskStatusChip :status="task.status" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
