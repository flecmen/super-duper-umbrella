<script setup lang="ts">
// Types
import type { Task } from '~~/server/types/task.type'

// Components
import TaskListItem from '~/libs/Task/List/TaskListItem.vue'
import EmptyState from '~/libs/App/components/EmptyState.vue'

type Props = {
  tasks: Task[]
  isLoading?: boolean
}
const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Loading -->
    <template v-if="isLoading">
      <div
        v-for="i in 3"
        :key="i"
      >
        <TaskListItem :is-loading />
      </div>
    </template>

    <!-- Tasks -->
    <template v-else-if="tasks.length > 0">
      <TaskListItem
        v-for="task in props.tasks"
        :key="task.id"
        :task="task"
      />
    </template>

    <!-- Empty state -->
    <template v-else>
      <EmptyState
        :title="$t('general.emptyState.title', { model: $t('task.self', 2).toLowerCase() })"
        no-btn
      />
    </template>
  </div>
</template>
