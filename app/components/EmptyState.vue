<script setup lang="ts">
type Props = {
  title?: string
  description?: string
  noBtn?: boolean
}
defineProps<Props>()

const emit = defineEmits<{
  'btn-click': []
}>()
</script>

<template>
  <div class="flex flex-col items-center bg-white py-12 ">
    <h2
      v-if="title"
      class="text-lg font-medium mb-2"
    >
      {{ title }}
    </h2>

    <p
      v-if="description"
      class="text-sm max-w-md text-center text-gray-500 mb-6"
    >
      {{ description }}
    </p>

    <Button
      v-if="!noBtn"
      :label="$t('general.create')"
      @click="emit('btn-click')"
    />
  </div>
</template>
