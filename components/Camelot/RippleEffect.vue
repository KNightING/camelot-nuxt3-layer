<!-- 包裝Ripple的元件  -->

<template>
  <div
    id="container"
    ref="container"
    class="relative overflow-hidden p-0 m-0"
    @mousedown="onMouseDown"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const container = ref<HTMLDivElement>();

// let size: number | undefined = undefined;

const { height, width, x, y } = useElementBounding(container);

const rippleSizeCss = useCssVar("--ripple-size", container);

watchOnce([height, width], (nV) => {
  const height = nV[0];
  const width = nV[1];

  // 斜邊長 = 圓的半徑
  // 但是size需要設定成直徑所以要*2
  const size = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2)) * 2;
  rippleSizeCss.value = `${size}px`;
});

const onMouseDown = (e: MouseEvent) => {
  const ripples = document.createElement("span");
  ripples.className = "ripple";
  ripples.style.left = `${e.clientX - x.value}px`;
  ripples.style.top = `${e.clientY - y.value}px`;

  // if (!size) {
  //   // 斜邊長 = 圓的半徑
  //   // 但是size需要設定成直徑所以要*2
  //   size = Math.sqrt(Math.pow(rect.height, 2) + Math.pow(rect.width, 2)) * 2;
  // }

  // ripples.style.setProperty("--ripple-size", `${size}px`);

  container.value?.appendChild(ripples);

  setTimeout(() => {
    ripples.remove();
  }, 650);
};
</script>

<style scoped>
:deep(.ripple) {
  position: absolute;
  background: radial-gradient(#0000, var(--material3-primary));
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 50%;
  animation: animate 600ms ease-in;
}
@keyframes animate {
  0% {
    width: 0;
    height: 0;
    opacity: 0.5;
  }
  100% {
    width: var(--ripple-size);
    height: var(--ripple-size);
    opacity: 0;
  }
}
</style>
