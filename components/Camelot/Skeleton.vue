<template>
  <template v-if="isLoading">
    <div
      class="overflow-hidden relative w-full h-full skeleton"
      v-bind="$attrs"
    >
      <div class="flash" />
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
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  isLoading?: boolean
}>(), {
  isLoading: true,
})
</script>

<style scoped>
.skeleton {
  --background-color:144, 142, 142;
  animation: skeleton-animate 3s ease-out infinite;
}

@keyframes skeleton-animate {
  0% {
    background-color: rgba(var(--background-color), 1);
  }

  75% {
    background-color: rgba(var(--background-color), .6);
  }

  100% {
    background-color: rgba(var(--background-color), 1);
  }
}

.flash {
  filter: blur(30px);
  position: absolute;
  top: 0px;
  left: 0px;
  width: 125%;
  height: 125%;
  background-image: linear-gradient(90deg, rgba(var(--background-color), .8) , rgba(var(--background-color), .4));
  transform: translateX(-110%) ;
  pointer-events: none;
  animation: animate 2s ease-out infinite;
  animation-delay: .5s;
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
