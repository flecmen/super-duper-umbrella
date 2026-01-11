<script setup lang="ts">
import { start } from 'node:repl'

type Props = {
  value?: string
  isLoading?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  save: [value: string]
  cancel: []
}>()

const isEditing = defineModel<boolean>('isEditing', { default: false })

const editValue = ref(props.value)

watch(isEditing, newValue => {
  if (newValue) {
    editValue.value = props.value
  }
})

function startEditing() {
  isEditing.value = true
}

function save() {
  emit('save', editValue.value ?? '')
}

function cancel() {
  emit('cancel')
  isEditing.value = false
}
</script>

<template>
  <div>
    <div
      v-if="!isEditing"
      class="flex gap-4 items-center"
    >
      <slot>
        <p>{{ value ?? '' }}</p>
      </slot>

      <Button
        icon="pi pi-pencil"
        variant="text"
        severity="secondary"
        @click="startEditing"
      />
    </div>

    <div
      v-else
      class="flex items-center gap-2"
    >
      <InputText
        v-model="editValue"
        type="text"
        autofocus
        @keyup.enter="save"
        @keyup.escape="cancel"
      />

      <Button
        icon="pi pi-check"
        variant="text"
        severity="success"
        :loading="isLoading"
        @click="save"
      />

      <Button
        :disabled="isLoading"
        icon="pi pi-times"
        variant="text"
        severity="danger"
        @click="cancel"
      />
    </div>
  </div>
</template>
