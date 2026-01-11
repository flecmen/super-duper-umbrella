<script setup lang="ts">
import TaskDetail from '~/libs/Task/TaskDetail.vue'
import { useTaskDetailStore } from '~/stores/useTaskDetailStore'

definePageMeta({
  middleware: ['validate-task-id'],
})

const route = useRoute()
const id = computed(() => Number(route.params.id))

const store = useTaskDetailStore()
const { task, isLoading, error } = storeToRefs(store)

// Fetch task on mount
onMounted(() => {
  store.fetchTask(id.value)
})

// Refetch if id changes
watch(id, newId => {
  store.fetchTask(newId)
})

// Redirect to 404 if task not found
watch(error, err => {
  if (err) {
    navigateTo('/404', { replace: true })
  }
}, { immediate: true })

// Reset store on unmount
onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <PageWrapper
    :header-props="{
      title: task?.title ?? $t('task.self', 1),
      description: $t('task.detail.description'),
      backTo: '/tasks',
    }"
    :is-loading
  >
    <TaskDetail />
  </PageWrapper>
</template>
