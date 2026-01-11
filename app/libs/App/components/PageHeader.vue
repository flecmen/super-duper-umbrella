<script setup lang="ts">
// Types
import type { PageHeaderProps } from '~/libs/App/components/types/page-header-props.type'

// Components
import InlineTextEdit from '~/libs/App/components/InlineTextEdit.vue'

const props = defineProps<PageHeaderProps>()

const titleComponent = computed(() => {
  return props.editable && props.editFn ? InlineTextEdit : 'div'
})

// Editing state
const isEditing = ref(false)
const isUpdateLoading = ref(false)

async function handleEdit(newTitle: string) {
  if (props.editFn) {
    isUpdateLoading.value = true

    await props.editFn(newTitle)

    isUpdateLoading.value = false
    isEditing.value = false
  }
}
</script>

<template>
  <div class="flex gap-2 items-start">
    <Button
      v-if="backTo"
      icon="pi pi-arrow-left"
      variant="text"
      @click="navigateTo(backTo)"
    />

    <div v-if="isLoading">
      <Skeleton
        width="12rem"
        height="2rem"
        class="mb-2"
      />
      <Skeleton
        width="20rem"
        height="1rem"
      />
    </div>

    <div v-else>
      <component
        :is="titleComponent"
        v-model:is-editing="isEditing"
        :is-loading="isUpdateLoading"
        :value="title"
        @save="handleEdit"
      >
        <h1 class="text-3xl font-bold text-gray-900">
          {{ title }}
        </h1>
      </component>

      <p class="mt-1 text-gray-500">
        {{ description }}
      </p>
    </div>
  </div>
</template>
