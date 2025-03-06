<template>
  <div
    ref="targetRef"
    class="w-fit relative"
  >
    <div @click="() => open=true">
      <slot />
    </div>

    <div
      class="absolute left-0 min-w-full w-fit z-30"
      :class="{
        'bottom-[110%]': isBottom,
        'top-[110%]': !isBottom,
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

onUpdated(() => {
  if (props.disabled) {
    open.value = false
  }
})
</script>

<style scoped>

</style>
