<template>
  <ul
    class="flex flex-row flex-nowrap w-full transition-all px-2 gap-5 items-start overflow-x-auto text-base font-medium"
  >
    <li
      v-for="(v, index) in data"
      ref="tabsElRefs"
      :key="index"
      @click="onSelected(index, v)"
    >
      <slot
        :data="v"
        :index="index"
        :is-selected="isSelected(index)"
      >
        <GeneralRippleEffect
          class="h-full whitespace-nowrap py-1.5 px-4 rounded-full border border-outline bg-surface text-on-surface select-none transition-all"
          :class="{
            '!bg-primary-container !text-on-primary-container !border-primary-container':
              isSelected(index),
          }"
        >
          {{ getDisplayLabel(v) }}
        </GeneralRippleEffect>
      </slot>
    </li>
  </ul>
</template>

<script setup lang="ts" generic="T">
const props = withDefaults(
  defineProps<{
    data?: T[];
    displayKey?:string;
    modelValue?: number;
    scrollSmooth?: boolean;
  }>(),
  {
    scrollSmooth: true,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value?: number];
  changedWithClick: [value: number];
}>();

const isValidKey = (
  key: string | number | symbol,
  object: object
): key is keyof typeof object => {
  return key in object;
};

const getDisplayLabel = (data?:T)=>{
  if(data && props.displayKey && typeof data === 'object' && isValidKey(props.displayKey, data as object)){
    return data[props.displayKey];
  }else{
    return data;
  }
}

const isSelected = (index:number)=>{
  return index === selectedIndex.value;
}

const selectedIndex = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const tabsElRefs = ref<HTMLElement[]>([]);

const onSelected = (index: number, data: T) => {
  if (selectedIndex.value === index) return;
  selectedIndex.value = index;
  emit("changedWithClick", index);
};

watch(selectedIndex, (nV) => {
  if (nV === undefined) return;
  const tabEl = tabsElRefs.value[nV];
  const parentEl = tabEl.parentElement;
  if (!parentEl) return;

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

  const parentWidth = parentEl.clientWidth;

  const tabWidth = tabEl.clientWidth;

  let scrollLeft = tabEl.offsetLeft - (parentWidth - tabWidth) / 2;

  if (scrollLeft < 0) {
    scrollLeft = 0;
  } else if (scrollLeft > parentEl.scrollWidth) {
    scrollLeft = parentEl.scrollWidth;
  }

  parentEl.scrollTo({
    left: scrollLeft,
    behavior: props.scrollSmooth ? "smooth" : "auto",
  });
});
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>