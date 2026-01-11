<script setup lang="ts">
import { useTaskDetailStore } from '~/stores/useTaskDetailStore'
import TaskDetail from '~/libs/Task/Detail/TaskDetail.vue'

definePageMeta({
  middleware: ['validate-task-id'],
})

const route = useRoute()
const id = computed(() => Number(route.params.taskId))

// Initialize task detail store with the current task ID
const store = useTaskDetailStore()
const { task, fetchError, taskId } = storeToRefs(store)

const { updateTask } = store

watch(
  id,
  newId => {
    taskId.value = newId
  },
  { immediate: true },
)

watch(fetchError, err => {
  if (err) {
    navigateTo('/404', { replace: true })
  }
}, { immediate: true })

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
