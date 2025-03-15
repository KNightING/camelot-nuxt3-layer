<template>
  <div
    ref="targetRef"
    class="w-fit"
  >
    <div @click="onTargetClick">
      <slot />
    </div>

    <Teleport
      to="body"
    >
      <div
        class="fixed pointer-events-none"
        :style="{
          zIndex: zIndex || 10,
          width: `${width}px`,
          height: `${height}px`,
          top: `${y}px`,
          left: `${x}px`,
        }"
      >
        <div
          class="absolute min-w-full w-fit pointer-events-auto"
          :class="{
            'mx-1': !disabledAutoSpace && (x === 0 || isRight),
            'right-0': isRight,
            'left-0': !isRight,
            'bottom-[100%]': isBottom,
            'top-[100%]': !isBottom,
            'drop-shadow': !disabledShadow,
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
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { isClient } from '@vueuse/core'
import type { CamelotExpanded } from '#components'

const props = defineProps<{
  zIndex?: number
  disabled?: boolean

  /**
   * 關閉陰影
   */
  disabledShadow?: boolean

  /**
   * 關閉window滑動時 自動關閉popup
   */
  disabledCloseWhenScrolling?: boolean

  /**
   * 自動調節左右空間
   */
  disabledAutoSpace?: boolean

  /**
   * 手動控制開啟關閉
   */
  manual?: boolean
}>()

const open = defineModel<boolean>('open', { default: false })

const targetRef = useTemplateRef('targetRef')

const popupRef = useTemplateRef<InstanceType<typeof CamelotExpanded>>('popupRef')

onClickOutside(targetRef, event => open.value = false, {
  ignore: () => {
    return [popupRef.value?.$el]
  },
})

const { x, y, width, height, bottom, update } = useElementBounding(targetRef)

const { height: windowHeight, width: windowWidth } = useWindowSize()

useWindowScroll({
  onScroll(e) {
    if (!props.disabledCloseWhenScrolling) {
      open.value = false
    }
  },
})

const isBottom = computed(() => {
  if (isClient) {
    return bottom.value + (popupRef.value?.contentHeight ?? 0) > windowHeight.value
  }
  return false
})

const isRight = computed(() => {
  if (isClient) {
    return x.value + (popupRef.value?.contentWidth ?? 0) > windowWidth.value
  }
  return false
})

const onTargetClick = () => {
  if (props.manual) {
    return
  }

  if (!props.disabled) {
    open.value = !open.value
  }
}

onUpdated(() => {
  if (props.disabled) {
    open.value = false
  }
  update()
})

const updateOnRequestAnimationFrame = () => {
  requestAnimationFrame(() => {
    update()
    updateOnRequestAnimationFrame()
  })
}

onMounted(() => {
  updateOnRequestAnimationFrame()
})
</script>

<style scoped>

</style>
