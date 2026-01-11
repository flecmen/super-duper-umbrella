<script setup lang="ts">
import EditButton from './EditButton.vue'
import InlineEdit from './InlineEdit.vue'

type Props = {
  value?: string
  isLoading?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  save: [value: string]
  cancel: []
}>()
</script>

<template>
  <InlineEdit
    v-bind="props"
    @save="emit('save', $event)"
    @cancel="emit('cancel')"
  >
    <template #value>
      <slot />
    </template>

    <template #input="{ editValue, updateValue, save, cancel }">
      <InputText
        :model-value="editValue"
        type="text"
        autofocus
        @update:model-value="updateValue"
        @keyup.enter="save"
        @keyup.escape="cancel"
      />
    </template>
  </InlineEdit>
</template>
