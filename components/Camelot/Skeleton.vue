<template>
  <template v-if="isLoading">
    <div class="overflow-hidden relative w-full h-full" v-bind="$attrs">
      <div
        class="flash"
      />
    </div>
  </template>
  <template v-else>
    <slot />
  </template>
</template>

<script>
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

const props = withDefaults(defineProps<{
  isLoading?:boolean
}>(), {
  isLoading: true
})
</script>

<style scoped>
.flash {
  filter: blur(5px);
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #aaa , #888 50%, #4e4c4c 100%);
  transform: translateX(-110%);
  background-size: 150%;
  pointer-events: none;
  animation: animate 1.5s ease-out infinite;
  animation-delay: 300ms;
}

@keyframes animate {
  0% {
    transform: translateX(-110%);
  }

  80% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(110%);
  }
}
</style>
