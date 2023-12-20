<template>
  <div
    class="border rounded-full px-1 flex items-center group min-w-fit active:border-primary"
    :class="{
      'border-primary': isFocus
    }"
  >
    <button
      type="button"
      @click="onMinusClick"
    >
      <slot name="minus">
        <CamelotRippleEffect
          class="w-4 h-4 rounded-full flex items-center justify-center text-base select-none font-bold"
        >
          -
        </CamelotRippleEffect>
      </slot>
    </button>

    <input
      ref="input"
      v-model="value"
      class="flex-1 text-center outline-none appearance-none m-0 min-w-[4ch]"
      type="number"
      :placeholder="placeholder"
      :step="step"
      :min="min"
      :max="max"
      @blur="isFocus = false"
      @focus="isFocus = true"
    >

    <button
      type="button"
      @click="onPlusClick"
    >
      <slot name="plus">
        <CamelotRippleEffect
          class="w-4 h-4 rounded-full flex items-center justify-center text-base select-none font-bold"
        >
          +
        </CamelotRippleEffect>
      </slot>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: number;
  step?: number;
  min?: number;
  max?: number;
  placeholder?: string;
  minStepByValue?: boolean;
  usedMinStepByValue?:boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value?: number];
}>();

const selfValue = ref(props.modelValue ?? 0);

const value = computed({
  get: () => selfValue.value,
  set: (value) => {
    selfValue.value = value;
    emit("update:modelValue", value);
  },
});

const input = ref<HTMLInputElement>();

const isFocus = ref(false);

const absStep = computed(() => {
  if (props.step) {
    return Math.abs(props.step)
  }

  if (props.minStepByValue) {
    const value = Math.abs(selfValue.value);
    const stepString = value.toString();
    const dotIndex = stepString.indexOf(".");
    const usedStep = absStep.value as number;
    if (dotIndex > 0) {
      const calcStep = 1 / Math.pow(10, stepString.length - dotIndex - 1);
      if(props.usedMinStepByValue && usedStep && calcStep > usedStep){
        return usedStep;
      }else{
       return calcStep;
      }
    }else if(props.usedMinStepByValue && usedStep){
      return usedStep;
    }
  }
  return 1;
});

const checkFixed = computed(() => {
  const step = absStep.value;
  const stepString = step.toString();
  const dotIndex = stepString.indexOf(".");
  let fixed = 1;
  if (dotIndex > 0) {
    fixed = Math.pow(10, stepString.length - dotIndex);
  }
  return fixed;
});

const calc = (value: number, isPlus: boolean) => {
  const step = absStep.value;
  const fixed = checkFixed.value;
  const plusStep = isPlus ? step : step * -1;
  return Math.round((value * fixed + plusStep * fixed)) / fixed;
}

const onMinusClick = () => {
  let calcValue = calc(value.value, false);
  if (props.min != undefined && calcValue <= props.min) {
    calcValue = props.min;
  }
  value.value = calcValue;
  input.value?.focus();
};

const onPlusClick = () => {
  let calcValue = calc(value.value, true);
  if (props.max != undefined && calcValue >= props.max) {
    calcValue = props.max;
  }
  value.value = calcValue;
  input.value?.focus();
};

</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
