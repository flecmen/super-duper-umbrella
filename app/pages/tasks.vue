<script setup lang="ts">
import { useTasks } from '~/libs/Task/functions/useTasks'
import TasksList from '~/libs/Task/List/TasksList.vue'
import TaskStatusChip from '~/libs/Task/TaskStatusChip.vue'
import TaskStatusMultiSelect from '~/libs/Task/TaskStatusMultiSelect.vue'

const { filteredTasks, status, selectedStatuses } = await useTasks()
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
      <TaskStatusMultiSelect v-model="selectedStatuses" />

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

      <EmptyState
        :title="$t('general.emptyState.title', { model: $t('task.self', 2).toLowerCase() })"
        description="asfsanflaisnflas"
      />

      <TasksList
        :tasks="filteredTasks"
        class="h-150 bg-pinkk"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
