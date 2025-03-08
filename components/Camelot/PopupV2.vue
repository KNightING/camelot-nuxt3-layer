<template>
  <div
    ref="targetRef"
    class="w-fit relative"
  >
    <div @click="onTargetClick">
      <slot />
    </div>

    <div
      class="absolute left-0 min-w-full w-fit"
      :class="{
        'bottom-[105%]': isBottom,
        'top-[105%]': !isBottom,
        'drop-shadow': !disabledShadow,
      }"
      :style="{
        zIndex: props.zIndex || 10,
      }"
    >
      <CamelotExpanded
        ref="popupRef"
        :expanded="open"
      >
        <slot name="popup" />
      </CamelotExpanded>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isClient } from '@vueuse/core'
import type { CamelotExpanded } from '#components'

const props = defineProps<{
  zIndex?: number
  disabled?: boolean
  disabledShadow?: boolean
}>()

const open = defineModel<boolean>('open', { default: false })

const targetRef = useTemplateRef('targetRef')
onClickOutside(targetRef, event => open.value = false)

const popupRef = useTemplateRef<InstanceType<typeof CamelotExpanded>>('popupRef')

const { bottom } = useElementBounding(targetRef)

const isBottom = computed(() => {
  if (isClient) {
    return bottom.value + (popupRef.value?.contentHeight ?? 0) > window.innerHeight
  }
  return false
})

const onTargetClick = () => {
  if (!props.disabled) {
    open.value = !open.value
  }
}

onUpdated(() => {
  if (props.disabled) {
    open.value = false
  }
})
</script>

<style scoped>

</style>
