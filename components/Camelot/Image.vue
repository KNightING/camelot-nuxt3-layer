<template>
  <div ref="target">
    <CamelotSkeleton v-if="isLoading" />
    <div v-else-if="isError">
      <slot name="error" />
    </div>
    <img v-else :src="src">
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
     src: string,
     immediate?:boolean
    } >(), {
    immediate: false
  })

const { isLoading, isError, isReady, load } = useLazyImage({
  src: props.src
})

const target = ref(null)

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting && props.immediate === false) {
      load()
    }
  }
)

onBeforeUnmount(() => {
  stop()
})

defineExpose({ isLoading, isError, isReady })
</script>

<style scoped></style>
