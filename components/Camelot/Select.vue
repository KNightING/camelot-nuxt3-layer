<template>
  <div ref="el" class="container">
    <div class="container" @click="open = true">
      <slot :selected-data="selectedData" />
    </div>

    <Transition>
      <div v-if="open" class="background" @click="onBackgroundClick">
        <div
          ref="optionsContainerEl"
          class="options-container"
          :style="`width:${width}px;max-height:${optionsContainerMaxHeight}px;transform:translate(${x}px, ${optionContainerY}px);`"
        >
          <template v-for="(d,index) in data" :key="index">
            <button type="button" @click="value = d.value">
              <slot name="option" :index="index" :data="d" :is-selected="value === d.value">
                <div class="option">
                  <span style="width: 1.5rem">{{ value === d.value ? '✓' :'' }} </span>
                  <span
                    style="margin-top: 0.25rem;
                  margin-bottom: 0.25rem;
                  font-size: 1rem;
                  line-height: 1.5rem; "
                  >{{ d.label }}</span>
                </div>
              </slot>
            </button>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts" generic="T">
import type { SelectOption } from '../../types/selectOption'

const props = withDefaults(defineProps<{
  data:SelectOption<T>[]
  optionsContainerMaxHeight?:number,
  optionsContainerBackgroundColor?:string,
  initSelectedKey?:string,
}>(), {
  optionsContainerMaxHeight: 160
})

const open = defineModel('open', { default: false })

const value = defineModel<string|null>({ default: null })

value.value = props.data.length > 0 ? props.data[0].value : null

const selectedData = computed(() => {
  return props.data.find(d => d.value === value.value)
})

const el = ref<HTMLElement | null>(null)

const optionsContainerEl = ref<HTMLElement | null>(null)

const selectEl = ref<HTMLElement | null>(null)

watch(el, (nV) => {
  if (nV && nV.children.length > 0) {
    selectEl.value = nV.children[0] as HTMLElement
  }
})

const { x, y, top, right, bottom, left, width, height } =
        useElementBounding(selectEl)

const optionsContainerBackgroundColorVar = useElCssVar('--c-select-background', el, { inherit: false })

watch([el, props], ([el, props]) => {
  if (el && props) {
    const optionsContainerBackgroundColor = props.optionsContainerBackgroundColor
    if (optionsContainerBackgroundColor) {
      const rgba = useColor().hexToRgbaArray(optionsContainerBackgroundColor)
      if (rgba) {
        optionsContainerBackgroundColorVar.value = `${rgba[0]},${rgba[1]},${rgba[2]}`
      }
    }
  }
})

const { height: windowHeight } = useWindowSize()

const optionContainerY = computed(() => {
  const optionsContainerHeight = optionsContainerEl.value?.clientHeight ?? 0

  if (bottom.value + optionsContainerHeight > windowHeight.value) {
    return top.value - optionsContainerHeight
  }
  return bottom.value
})

const onBackgroundClick = (e:Event) => {
  open.value = false
}

</script>

<style scoped>

.container {
  --c-select-background: var(--material3-background);
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
  z-index: 20;
  width: 100%;
  height: 100%;
}

.options-container {
  background: rgba(var(--c-select-background),1);
  display: flex;
  overflow: auto;
  position: relative;
  top: 0;
  left: 0;
  padding: 0.5rem;
  flex-direction: column;
  border-radius: 0.5rem;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06));
}

.option {
  display: flex;
  align-items: center;
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
