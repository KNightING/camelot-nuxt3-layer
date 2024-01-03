<template>
  <div class="container" :class="{'close':!expanded}">
    <div style="min-height:0px">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  expanded: boolean
}>()
</script>

<style scoped>
.container{
  display: grid;
  overflow: hidden;
  grid-template-rows: 1fr;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
}

.close {
  grid-template-rows: 0fr !important;
  opacity: 0 !important;
}
</style>
