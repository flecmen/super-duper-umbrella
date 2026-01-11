<script setup lang="ts">
import { useTaskDetailStore } from '~/stores/useTaskDetailStore'
import TaskDetail from '~/libs/Task/TaskDetail.vue'

definePageMeta({
  middleware: ['validate-task-id'],
})

const route = useRoute()
const id = computed(() => Number(route.params.id))

// Initialize task detail store with the current task ID
const store = useTaskDetailStore()
const { task, fetchError } = storeToRefs(store)
const { updateTask } = store

// Initialize useAsyncData through the store
store.initializeTask(id.value)

// Redirect to 404 only if task fetch fails (not found)
watch(fetchError, err => {
  if (err) {
    navigateTo('/404', { replace: true })
  }
}, { immediate: true })

// Reset store when leaving the page
onUnmounted(() => {
  store.$reset()
})
</script>

<template>
  <PageWrapper
    :header-props="{
      title: task?.title,
      backTo: '/tasks',
      editable: true,
      editFn: (newTitle: string) => updateTask(id, { title: newTitle }),
    }"
  >
    <TaskDetail />
  </PageWrapper>
</template>
