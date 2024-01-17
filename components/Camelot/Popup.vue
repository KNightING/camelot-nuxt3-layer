<template>
  <div ref="el" @click="onContainerClick">
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
                `height:min-content;transform:translate(${x}px,${popupContainerY}px);`,
                widthWithTarget?`width:${width}px;`:'width:min-content;',
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

const props = withDefaults(defineProps<{
  widthWithTarget?:boolean,
  popupBackgroundColor?:string,
  zIndex?:number,
  openByTarget?:boolean,
}>(), {
  widthWithTarget: false,
  openByTarget: true
})

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

const { height: windowHeight } = useWindowSize()

const popupContainerY = computed(() => {
  const popupContainerY = popupEl.value?.clientHeight ?? 0

  if (bottom.value + popupContainerY > windowHeight.value) {
    return top.value - popupContainerY
  }
  return bottom.value
})

const onContainerClick = (e:Event) => {
  if (props.openByTarget) {
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
