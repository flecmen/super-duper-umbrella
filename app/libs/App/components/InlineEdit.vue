<script setup lang="ts">
import EditButton from '~/libs/App/components/EditButton.vue'

type Props = {
  value?: unknown
  isLoading?: boolean
  noEdit?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  save: [value: unknown]
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
      <slot name="value">
        <p>{{ value ?? '' }}</p>
      </slot>

      <EditButton
        v-if="!noEdit"
        @click="startEditing"
      />
    </div>

    <div
      v-else
      class="flex items-center gap-2"
    >
      <slot
        name="input"
        :edit-value
        :update-value="(v: unknown) => editValue = v"
        :save
        :cancel
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
