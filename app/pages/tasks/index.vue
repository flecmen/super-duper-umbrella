<script setup lang="ts">
import { useTasks } from '~/libs/Task/functions/useTasks'
import TasksList from '~/libs/Task/List/TasksList.vue'
import TaskStatusMultiSelect from '~/libs/Task/Detail/chip/TaskStatusMultiSelect.vue'

const { filteredTasks, status, selectedStatuses } = await useTasks()
</script>

<template>
  <PageWrapper
    :header-props="{
      title: $t('task.self', 2),
      description: $t('task.header.description'),
    }"
  >
    <div class="flex flex-col gap-4">
      <TaskStatusMultiSelect v-model="selectedStatuses" />

      <TasksList
        :tasks="filteredTasks"
        :is-loading="status === 'pending'"
      />
    </div>
  </PageWrapper>
</template>
