<template>
  <span>
    <div class="text-primary">{{ useBaseUrl() }}</div>
    <div class="text-primary" @click="useColorMode().value = 'light'">light</div>
    <div class="text-primary" @click="useColorMode().value = 'dark'">dark</div>

    <div class="text-primary" @click="click">test</div>
  </span>
</template>

<script setup lang="ts">
const { lightColorScheme, darkColorScheme } = useMaterial3ColorScheme();
const click = () => {
  lightColorScheme.value.primary = "red";
  darkColorScheme.value.primary = "blue";
};
</script>

<style scoped></style>
