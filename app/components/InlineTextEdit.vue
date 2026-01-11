<script setup lang="ts">
type Props = {
  value?: string
  isLoading?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  save: [value: string]
  cancel: []
}>()

const model = defineModel<boolean>('isEditing', { default: false })

const editValue = ref(props.value)

watch(model, newValue => {
  if (newValue) {
    editValue.value = props.value
  }
})

function startEditing() {
  model.value = true
}

function save() {
  emit('save', editValue.value ?? '')
}

function cancel() {
  emit('cancel')
  model.value = false
}
</script>

<template>
  <div>
    <div
      v-if="!model"
      @click="startEditing"
    >
      <slot>
        <p>{{ value ?? '' }}</p>
      </slot>
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

<style lang="scss" scoped>
</style>
