<script setup lang="ts">
// Components
import InlineEdit from '~/libs/App/components/InlineEdit.vue'

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
    @save="emit('save', $event as string)"
    @cancel="emit('cancel')"
  >
    <template #value>
      <slot />
    </template>

    <template #input="{ editValue, updateValue, save, cancel }">
      <InputText
        :model-value="editValue as string"
        type="text"
        autofocus
        @update:model-value="updateValue"
        @keyup.enter="save"
        @keyup.escape="cancel"
      />
    </template>
  </InlineEdit>
</template>
