<template>
  <CamelotPopup v-model:open="open" :width-with-target="true" :z-index="zIndex">
    <slot :selected-data="selectedData" />
    <template #popup>
      <div
        ref="optionsContainerEl"
        class="options-container"
        :style="[ `max-height:${optionsContainerMaxHeight}px;`]"
      >
        <template v-for="(d,index) in data" :key="index">
          <button type="button" @click="value = d.value">
            <slot name="option" :index="index" :data="d" :is-selected="value === d.value">
              <div class="option">
                <span class="w-5 text-primary">{{ value === d.value ? '✓' :'' }} </span>
                <span
                  :class="{
                    'text-primary':value === d.value
                  }"
                  :style="[
                    'margin-top: 0.25rem;margin-bottom: 0.25rem;font-size: 1rem;line-height: 1.5rem; user-select:none;'
                  ]"
                >{{ d.label }}</span>
              </div>
            </slot>
          </button>
        </template>
      </div>
    </template>
  </CamelotPopup>
</template>

<script setup lang="ts" generic="T">
import type { SelectOption } from '../../types/selectOption'

const props = withDefaults(defineProps<{
  data:SelectOption<T>[]
  optionsContainerMaxHeight?:number,
  optionsContainerBackgroundColor?:string,
  initSelectedKey?:string,
  zIndex?:number,
}>(), {
  optionsContainerMaxHeight: 160
})

const open = defineModel('open', { default: false })

const value = defineModel<string|null>({ default: null })

value.value = props.data.length > 0 ? props.data[0].value : null

const selectedData = computed(() => {
  return props.data.find(d => d.value === value.value)
})

const optionsContainerEl = ref<HTMLElement | null>(null)

const optionsContainerBackgroundColorVar = useElCssVar('--c-select-background', optionsContainerEl, { inherit: false })

watch([optionsContainerEl, props], ([el, props]) => {
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

</script>

<style scoped>
.options-container {
  --c-select-background: var(--material3-background);
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
