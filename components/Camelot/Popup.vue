<template>
  <div
    ref="el"
    class="w-fit"
    @click="onContainerClick"
  >
    <slot />
    <Teleport to="body">
      <CamelotCustomColorSchemeProvider>
        <Transition>
          <div
            v-if="open"
            class="background"
            :style="[
              `z-index:${zIndex ?? 900};`,
            ]"
            @click="onBackgroundClick"
          >
            <div
              ref="popupEl"
              class="popup"
              :style="[
                `height:min-content;`,
                `top:${popupContainerY}px;left:${popupContainerX}px`,
                disableWidthWithTarget?'width:min-content;':`width:${width}px;`,
              ]"
              @click="(e) => { e.stopPropagation() }"
            >
              <slot name="popup" />
            </div>
          </div>
        </Transition>
      </CamelotCustomColorSchemeProvider>
    </Teleport>
  </div>
</template>

<script setup lang="ts" generic="T">
const props = defineProps<{
  popupBackgroundColor?: string
  zIndex?: number
  disableOpenByTarget?: boolean
  disableWidthWithTarget?: boolean
  disabled?: boolean
}>()

const open = defineModel<boolean>('open', { default: false })

const el = ref<HTMLElement>()

/**
 * popup 元素
 */
const popupEl = ref<HTMLElement>()

/**
 * 目標元素
 */
const selectEl = ref<HTMLElement>()

watch(el, (nV) => {
  if (nV && nV.children.length > 0) {
    selectEl.value = nV.children[0] as HTMLElement
  }
})

const { x, y, top, right, bottom, left, width, height }
       = useElementBounding(selectEl)

const { top: popupElTop, left: popupElLeft, width: popupElWidth, height: popupElHeight }
        = useElementBounding(popupEl)

// const optionsContainerBackgroundColorVar = useElCssVar('--c-popup-background', popupEl, { inherit: false })

// watch([popupEl, props], ([el, props]) => {
//   if (el && props) {
//     const optionsContainerBackgroundColor = props.popupBackgroundColor
//     if (optionsContainerBackgroundColor) {
//       const rgba = useColor().hexToRgbaArray(optionsContainerBackgroundColor)
//       if (rgba) {
//         optionsContainerBackgroundColorVar.value = `${rgba[0]},${rgba[1]},${rgba[2]}`
//       }
//     }
//   }
// })

const { height: windowHeight, width: windowWidth } = useWindowSize()

const popupContainerX = ref(0)
const popupContainerY = ref(0)

watch([
  () => open.value,
  () => x.value,
  () => left.value,
  () => y.value,
  () => bottom.value,
  () => popupElWidth.value,
  () => popupElHeight.value,
  () => windowWidth.value,
  () => windowHeight.value],
([open, x, left, y, bottom, popupElWidth, popupElHeight, windowWidth, windowHeight]) => {
  if (open && popupElWidth && popupElHeight && windowWidth && windowHeight) {
    const popupContainerClientWidth = popupElWidth ?? 0
    if (left + popupContainerClientWidth > windowWidth) {
      popupContainerX.value = windowWidth - popupContainerClientWidth
    } else {
      popupContainerX.value = left
    }

    const popupContainerClientHeight = popupElHeight ?? 0
    if (bottom + popupContainerClientHeight > windowHeight) {
      popupContainerY.value = y - popupContainerClientHeight
    } else {
      popupContainerY.value = bottom
    }
  }
})

// const popupContainerX = computed(() => {
//   const popupContainerClientWidth = popupElWidth.value ?? 0
//   if (left.value + popupContainerClientWidth > windowWidth.value) {
//     return windowWidth.value - popupContainerClientWidth
//   }
//   return left.value
// })

// const popupContainerY = computed(() => {
//   const popupContainerClientHeight = popupElHeight.value ?? 0
//   if (bottom.value + popupContainerClientHeight > windowHeight.value) {
//     return top.value - popupContainerClientHeight
//   }
//   return bottom.value
// })

const onContainerClick = (e: Event) => {
  if (props.disabled) {
    return
  }

  if (!props.disableOpenByTarget) {
    open.value = true
  }
}

const onBackgroundClick = (e: Event) => {
  open.value = false
  e.stopPropagation()
}

onUpdated(() => {
  if (props.disabled) {
    open.value = false
  }
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
}
.popup {
  --c-popup-background: var(--material3-surface);
  background: transparent;
  display: fixed;
  flex-direction: column;
  overflow: auto;
  position: relative;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06));
}

.v-enter-active {
  transition: all 0.4s ease;
}

.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
