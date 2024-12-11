<template>
  <div ref="container">
    <slot />
  </div>
</template>

<script setup lang="ts" generic="T">
const props = defineProps<{
  lightColorScheme?: CustomColorScheme<T>
  darkColorScheme?: CustomColorScheme<T>
  coverGlobal?: boolean
}>()

const container = ref<HTMLElement>()

const usedColorScheme = ref<CustomColorScheme<T>>()

watchOnce(container, (nV) => {
  const { lightColorScheme, darkColorScheme, usedColorScheme: used } = useCustomColorScheme<T>(
    props.coverGlobal ? document.body : container,
    {
      lightColorScheme: props.lightColorScheme,
      darkColorScheme: props.darkColorScheme,
    },
  )

  watchImmediate(props, (nV) => {
    if (nV.lightColorScheme) {
      lightColorScheme.value = { ...lightColorScheme.value, ...nV.lightColorScheme }
    }

    if (nV.darkColorScheme) {
      darkColorScheme.value = { ...darkColorScheme.value, ...nV.darkColorScheme }
    }
  })

  usedColorScheme.value = computed(() => used.value).value
})

defineExpose({ usedColorScheme })
</script>

<style scoped></style>
