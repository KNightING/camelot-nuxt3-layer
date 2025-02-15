<template>
  <AppInput
    ref="target"
    v-model:is-open="isOpen"
    :selected-value="selected?.value"
    :model-value="selected?.name"
    mode="only-select"
    :label="label"
    :options="options"
    :required="required"
    :placeholder="placeholder"
    :size="size"
    :disabled="disabled"
    :border="border"
    @option-selected="onOptionSelected"
  >
    <template #after>
      <i-ic-round-keyboard-arrow-down
        class="transition-transform duration-300 text-lg group-hover:text-primary"
        :class="{
          'rotate-180': isOpen,
          '!text-app-disabled-text': disabled }"
      />
    </template>
  </AppInput>
</template>

<script setup lang="ts" generic="T">
import type { SelectOptions } from '../../models/selectOptions'

const props = withDefaults(defineProps<{
  options?: SelectOptions<T>
  disabled?: boolean
  label?: string
  border?: boolean
  size?: 'small' | 'basic'
  required?: boolean
  placeholder?: string
}>(), {
  border: true,
  size: 'basic',
})

const emit = defineEmits<{
  changed: [data?: T]
}>()

const model = defineModel<string | number>()

const isOpen = defineModel<boolean>('isOpen', { default: false })

const selected = computed(() => props.options?.find(option => option.value === model.value))

const placeholder = computed(() => {
  if (props.placeholder) {
    return props.placeholder
  }
  if (props.label) {
    return `請選擇${props.label}`
  }
  return ''
})

const onOptionSelected = (option: SelectOption<T>) => {
  model.value = option.value
  isOpen.value = false
  emit('changed', option.data)
}
</script>

<style scoped>

</style>
