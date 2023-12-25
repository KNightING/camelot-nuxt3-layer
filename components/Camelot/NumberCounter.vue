<template>
  <div
    class="container "
    :class="{
      'container-focus': isFocus
    }"
  >
    <button
      type="button"
      @click="onMinusClick"
    >
      <slot name="minus">
        <CamelotRippleEffect class="controller">
          -
        </CamelotRippleEffect>
      </slot>
    </button>

    <input
      ref="input"
      v-model="value"
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
        <CamelotRippleEffect class="controller">
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
  /**
   * 是否使用目前value的最小單位當成step, 如果有設定step會優先此設定
   * 例如目前值為0.2, step則會使用0.1
   * 例如目前值為0.03, step則會使用0.01
   **/
  minStepByValue?: boolean;
  /**
   * 是否使用曾經value的最小單位當成step, minStepByValue需為true
   * 例如曾經step為0.01, 現在值為0.2, step不會更新成0.1, 會繼續使用0.01
   **/
  usedMinStepByValue?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value?: number];
}>();

const selfValue = ref(props.modelValue ?? 0);

watch(props, (nV) => {
  if (nV.modelValue) {
    selfValue.value = nV.modelValue;
  }
})

const value = computed({
  get: () => selfValue.value,
  set: (value) => {
    selfValue.value = value;
    emit("update:modelValue", selfValue.value);
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
      if (props.usedMinStepByValue && usedStep && calcStep > usedStep) {
        return usedStep;
      } else {
        return calcStep;
      }
    } else if (props.usedMinStepByValue && usedStep) {
      return usedStep;
    }
  }
  return 1;
});

const calc = (value: number, isPlus: boolean) => {
  const step = absStep.value;
  const plusStep = isPlus ? step : step * -1;
  return useFloat().plus(value, plusStep).value;
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
.container {
  display: flex;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  align-items: center;
  border-radius: 9999px;
  border-width: 1px;
  min-width: fit-content;
  background-color: #ffffff;
}

.container:active {
  border-color: rgba(var(--material3-primary), 1);
}

.container-focus {
  border-color: rgba(var(--material3-primary), 1);
}

input {
  margin: 0;
  flex: 1 1 0%;
  outline-style: none;
  text-align: center;
  background-color: transparent;
  appearance: none;
  min-width: 4ch;
}


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

.controller {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  user-select: none;
}
</style>
