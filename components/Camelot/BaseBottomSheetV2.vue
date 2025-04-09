<template>
  <CamelotBaseDialogV2>
    <template #wrapper>
      <slot />
    </template>
  </CamelotBaseDialogV2>
</template>

<script setup lang="ts">
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(100dvh);
}

dialog {
  pointer-events: painted;
  background-color: transparent;
  margin: 0;
  padding: 0;
  width: 100dvw; /* 宽度占满 */
  max-width: 100dvw;
  transform: translateY(calc(100dvh - 100%)); /* 默认隐藏在底部 */
}
</style>
