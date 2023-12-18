<template>
  <div ref="container">
    <slot />
  </div>
</template>

<script setup lang="ts" generic="T">
const props = defineProps<{
  lightColorScheme?: CustomColorScheme<T>;
  darkColorScheme?: CustomColorScheme<T>;
}>();

const container = ref<HTMLElement>();

onMounted(() => {
  const { lightColorScheme: lcs, darkColorScheme: dcs } = useCustomColorScheme<T>(
    container,
    {
      lightColorScheme: props.lightColorScheme,
      darkColorScheme: props.darkColorScheme,
    }
  );
});
</script>

<style scoped></style>
../../composables/useCustomColorScheme
