<template>
  <div class="container">
    <template v-for="(value, index) in steps" :key="index">
      <div class="step" @click="onStepClick(index)">
        <div class="step-icon-line-group">
          <div
            v-if="index < steps.length - 1"
            class="step-line"
            :class="{
              'step-line-complete': index < step,
            }"
          />
          <div class="step-dot-container">
            <slot
              name="dot"
              :value="value"
              :index="index"
              :is-complete="isComplete(index)"
              :is-working="isDoing(index)"
            >
              <div
                class="step-dot"
                :class="{
                  'step-dot-doing': isDoing(index),
                  'step-dot-complete': isComplete(index),
                }"
              >
                <span v-if="isComplete(index)" class="step-dot-text-complete">✓</span>
                <span
                  v-else
                  class="step-dot-text"
                  :class="{
                    'step-dot-text-doing': isDoing(index),
                  }"
                >{{ index + 1 }}</span>
              </div>
            </slot>
          </div>
        </div>
        <slot
          name="content"
          :value="value"
          :index="index"
          :is-complete="isComplete(index)"
          :is-working="isDoing(index)"
        >
          <span
            class="step-content"
            :class="{
              'step-content-complete': isComplete(index) || isDoing(index),
            }"
          >{{ value }}</span>
        </slot>
      </div>
    </template>
  </div>

  <!-- <div class="w-full flex items-start">
    <template v-for="(value,index) in steps" :key="index">
      <div class="flex flex-col flex-1 items-center gap-1" @click="step=index">
        <div class="relative w-full">
          <div
            v-if="index < steps.length - 1"
            class="transition-colors absolute bg-black-500 w-full h-0.5 left-[50%] top-[50%] -translate-y-[50%]"
            :class="{
              '!bg-primary-500': index < step
            }"
          />
          <div
            class="transition-colors relative left-[50%] -translate-x-[50%] w-6 rounded-full border-2 border-black-500 bg-white aspect-square flex justify-center"
            :class="{
              '!border-primary-500 ': isComplete(index) || isWorking(index),
              '!bg-primary-500':isComplete(index)
            }"
          >
            <span v-if="isComplete(index)" class="text-white">✓</span>
            <span
              v-else
              class="text-black-500"
              :class="{
                '!text-primary-500': isComplete(index) || isWorking(index)
              }"
            >{{ index + 1 }}</span>
          </div>
        </div>
        <span
          class="transition-colors text-black-500"
          :class="{
            '!text-primary-500': isComplete(index) || isWorking(index)
          }"
        >{{ value }}</span>
      </div>
    </template>
  </div> -->
</template>

<script setup lang="ts">
const props = defineProps<{
  steps: string[];
}>()

const step = defineModel<number>({ default: 0 })

const onStepClick = (index:number) => {
  step.value = index
}

const isDoing = (index: number) => {
  return index === step.value
}

const isComplete = (index: number) => {
  return index < step.value
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.step {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  gap: 0.25rem;
  align-items: center;
}

.step-icon-line-group {
  position: relative;
  width: 100%;
}

.step-line {
  position: absolute;
  width: 100%;
  height: 0.125rem;
  background-color: #9ca3af;
  transition-property: color, background-color, border-color, text-decoration-color, fill,
    stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  left: 50%;
  top: 50%;
  transform: translate(0, -50%);
}

.step-line-complete {
  background-color: rgba(var(--material3-primary), 1) !important;
}

.step-dot-container {
  left: 50%;
  position: relative;
  width: max-content;
  transform: translate(-50%, 0%);
}

.step-dot {
  aspect-ratio: 1 / 1;
  display: flex;
  position: relative;
  justify-content: center;
  border-radius: 9999px;
  border-width: 2px;
  border-color: #9ca3af;
  width: 1.5rem;
  transition-property: color, background-color, border-color, text-decoration-color, fill,
    stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  background-color: rgba(var(--material3-surface), 1);
}

.step-dot-doing {
  border-color: rgba(var(--material3-primary), 1) !important;
}

.step-dot-complete {
  border-color: rgba(var(--material3-primary), 1) !important;
  background-color: rgba(var(--material3-primary), 1) !important;
}

.step-dot-text {
  user-select: none;
  color: rgb(156 163 175 / 1);
}

.step-dot-text-doing {
  color: rgba(var(--material3-primary), 1) !important;
}

.step-dot-text-complete {
  user-select: none;
  color: rgba(var(--material3-on-primary), 1);
}

.step-content {
  color: #9ca3af;
  transition-property: color, background-color, border-color, text-decoration-color, fill,
    stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.step-content-complete {
  color: rgba(var(--material3-primary), 1) !important;
}
</style>
