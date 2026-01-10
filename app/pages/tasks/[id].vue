<script setup lang="ts">
import { useTask } from '~/libs/Task/functions/useTask'
import TaskDetail from '~/libs/Task/TaskDetail.vue'

definePageMeta({
  middleware: ['validate-task-id'],
})

const route = useRoute()
const id = computed(() => Number(route.params.id))

const { task, status, error } = useTask(id.value)

// Redirect to 404 if task not found
watch(error, err => {
  if (err) {
    navigateTo('/404', { replace: true })
  }
}, { immediate: true })
</script>

<template>
  <PageWrapper
    :header-props="{
      title: task?.title ?? $t('task.self', 1),
      description: $t('task.detail.description'),
      backTo: '/tasks',
    }"
  >
    <TaskDetail
      :task="task"
      :is-loading="status === 'pending'"
    />
  </PageWrapper>
</template>
