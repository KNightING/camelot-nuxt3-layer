<template>
  <CamelotSkeleton v-if="isLoading" />
  <div v-else-if="error">
    <slot name="error" />
  </div>
  <img v-else :src="src">
</template>

<script setup lang="ts">
import { useImage, type UseImageOptions } from '@vueuse/core'

const props = defineProps<{ src: string, options?:UseImageOptions} >()

const { isLoading, error, isReady } = useImage({ ...props.options, src: props.src })

defineExpose({ isLoading, error, isReady })
</script>

<style scoped></style>
