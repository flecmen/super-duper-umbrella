<script setup lang="ts">
import type { Task } from '~~/server/types/task.type'
import TaskListItem from './TaskListItem.vue'

type Props = {
  tasks: Task[]
}
const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <TaskListItem
      v-for="task in props.tasks"
      :key="task.id"
      :task="task"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>
