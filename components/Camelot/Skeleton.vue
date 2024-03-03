<template>
  <template v-if="isLoading">
    <div class="overflow-hidden w-full" v-bind="$attrs">
      <div class="container">
        <div
          class="flash"
        />
      </div>
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

const props = defineProps<{
  isLoading?:boolean
}>()
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.flash {
  filter: blur(5px);
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #fff, #efefef 50%, #4e4c4c 100%);

  transform: translateX(-110%);
  background-size: 200%;
  pointer-events: none;
  animation: animate 2s ease-out infinite;
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
