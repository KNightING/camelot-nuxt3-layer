import { toValue } from '@vueuse/shared';
<template>
  <ul>
    <li
      v-for="(item, index) in data"
      ref="tabsElRefs"
      :key="index"
      @click="onSelected(index, item)"
    >
      <slot
        :item="item"
        :index="index"
        :is-selected="isSelected(index)"
      >
        <CamelotRippleEffect
          class="tab"
          :class="{
            'tab-selected':
              isSelected(index),
          }"
        >
          {{ getDisplayLabel(item) }}
        </CamelotRippleEffect>
      </slot>
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T">
const props = withDefaults(
  defineProps<{
    data?: T[]
    displayKey?: string
    scrollSmooth?: boolean
  }>(),
  {
    scrollSmooth: true,
  },
)

const emit = defineEmits<{
  changedWithClick: [value: number]
}>()

const isValidKey = (
  key: string | number | symbol,
  object: object,
): key is keyof typeof object => {
  return key in object
}

const getDisplayLabel = (data?: T) => {
  if (data && props.displayKey && typeof data === 'object' && isValidKey(props.displayKey, data as object)) {
    return data[props.displayKey]
  } else {
    return data
  }
}

const isSelected = (index: number) => {
  return index === selectedIndex.value
}

const selectedIndex = defineModel<number>()

const tabsElRefs = ref<HTMLElement[]>([])

const onSelected = (index: number, data: T) => {
  if (selectedIndex.value === index) {
    return
  }
  selectedIndex.value = index
  emit('changedWithClick', index)
}

const scrollToTab = () => {
  const index = toValue(selectedIndex)
  if (index === undefined || props.data === undefined || index > props.data.length) {
    return
  }

  const tabEl = tabsElRefs.value[index]
  if (!tabEl) {
    return
  }
  const parentEl = tabEl.parentElement
  if (!parentEl) {
    return
  }

  // if (!props.selectedCenter) {
  //   let tabLeft = tabEl.getBoundingClientRect().left - 15;
  //   const tabRight = tabEl.getBoundingClientRect().right + 15;
  //   const parentWidth = parentEl.clientWidth;

  //   const toRight = Math.abs(tabRight - parentWidth);

  //   if (toRight < tabLeft) {
  //     tabLeft = toRight;
  //   }

  //   parentEl.scrollBy({
  //     left: tabLeft,
  //     behavior: props.scrollSmooth ? "smooth" : "auto",
  //   });
  //   return;
  // }

  const parentWidth = parentEl.clientWidth

  const tabWidth = tabEl.clientWidth

  let scrollLeft = tabEl.offsetLeft - (parentWidth - tabWidth) / 2

  if (scrollLeft < 0) {
    scrollLeft = 0
  } else if (scrollLeft > parentEl.scrollWidth) {
    scrollLeft = parentEl.scrollWidth
  }

  parentEl.scrollTo({
    left: scrollLeft,
    behavior: props.scrollSmooth ? 'smooth' : 'auto',
  })
}

watch([() => props.data, () => selectedIndex.value, () => tabsElRefs.value], ([data, selectedIndex, tabsElRefs]) => {
  if (data === undefined || selectedIndex === undefined || tabsElRefs === undefined) {
    return
  }
  scrollToTab()
}, { immediate: true })

onMounted(() => {
  scrollToTab()
})
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

ul {
  display: flex;
  overflow-x: auto;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1.25rem;
  align-items: flex-start;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.tab {
  padding-top: 0.375rem !important;
  padding-bottom: 0.375rem !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  border-radius: 9999px;
  border-width: 1px;
  height: 100%;
  white-space: nowrap;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  user-select: none;
  background-color: rgba(var(--cml-m3-surface), 1);
  color: rgba(var(--cml-m3-on-surface), 1);
}

.tab-selected {
  background-color: rgba(var(--cml-m3-primary-container), 1) !important;
  color: rgba(var(--cml-m3-on-primary-container), 1) !important;
  border-color: rgba(var(--cml-m3-primary-container), 1) !important;
}
</style>
