<template>
  <span>
    <div class="text-primary">{{ useBaseUrl() }}</div>
    <div class="text-primary" @click="useColorMode().value = 'light'">test</div>
  </span>
</template>

<script setup lang="ts"></script>

<style scoped></style>
