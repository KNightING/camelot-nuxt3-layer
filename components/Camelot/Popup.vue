<template>
  <div ref="el" class="w-fit" @click="onContainerClick">
    <slot />
    <Teleport to="body">
      <CamelotCustomColorSchemeProvider>
        <Transition>
          <div
            v-if="open"
            class="background"
            :style="[
              `z-index:${zIndex ?? 9990};`
            ]"
            @click="onBackgroundClick"
          >
            <div
              ref="popupEl"
              class="popup"
              :style="[
                `height:min-content;transform:translate(${popupContainerX}px,${popupContainerY}px);`,
                disableWidthWithTarget?'width:min-content;':`width:${width}px;`,
              ]"
              @click="(e)=>{e.stopPropagation()}"
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
  popupBackgroundColor?:string,
  zIndex?:number,
  disableOpenByTarget?:boolean,
  disableWidthWithTarget?:boolean,
}>()

const open = defineModel('open', { default: false })

const el = ref<HTMLElement | null>(null)

const popupEl = ref<HTMLElement | null>(null)

const selectEl = ref<HTMLElement | null>(null)

watch(el, (nV) => {
  if (nV && nV.children.length > 0) {
    selectEl.value = nV.children[0] as HTMLElement
  }
})

const { x, y, top, right, bottom, left, width, height } =
        useElementBounding(selectEl)

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

const popupContainerX = computed(() => {
  const popupContainerClientWidth = popupEl.value?.clientWidth ?? 0
  if (left.value + popupContainerClientWidth > windowWidth.value) {
    return windowWidth.value - popupContainerClientWidth
  }
  return left.value
})

const popupContainerY = computed(() => {
  const popupContainerClientHeight = popupEl.value?.clientHeight ?? 0

  if (bottom.value + popupContainerClientHeight > windowHeight.value) {
    return top.value - popupContainerClientHeight
  }
  return bottom.value
})

const onContainerClick = (e:Event) => {
  if (!props.disableOpenByTarget) {
    open.value = true
  }
}

const onBackgroundClick = (e:Event) => {
  open.value = false
  e.stopPropagation()
}

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
  --c-popup-background: var(--material3-background);
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: relative;
  top: 0;
  left: 0;
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

<!-- .popup {
  --c-popup-background: var(--material3-background);
  background: rgba(var(--c-popup-background),1);
  display: flex;
  overflow: auto;
  position: relative;
  top: 0;
  left: 0;
  flex-direction: column;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06));
} -->
