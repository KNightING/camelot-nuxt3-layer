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

const usedColorScheme = ref<CustomColorScheme<T>>();

onMounted(() => {
  const { lightColorScheme: lcs, darkColorScheme: dcs,usedColorScheme:used } = useCustomColorScheme<T>(
    container,
    {
      lightColorScheme: props.lightColorScheme,
      darkColorScheme: props.darkColorScheme ,
    }
  );

  usedColorScheme.value = computed(()=>used.value).value;
});

defineExpose({usedColorScheme});
</script>

<style scoped></style>
