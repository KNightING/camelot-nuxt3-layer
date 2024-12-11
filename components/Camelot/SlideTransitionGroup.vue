<template>
  <div class="relative flex h-full w-full justify-center items-center">
    <TransitionGroup :name="animeDirection" mode="out-in">
      <template v-for="i in 10" :key="i">
        <template v-if="i === index">
          <div
            class="absolute"
          >
            <div
              class="  bg-red-500 rounded-xl p-4 drop-shadow"
              :style="[
                `background: hsl(${i * 100}, 50%, 80%)`,
                `width: ${i * 15}px`,
                `height: ${300 - i * 15}px`,
              ]"
            >
              <div class="w-full h-full flex justify-center items-center">
                {{ index }}
              </div>
            </div>
          </div>
        </template>
      </template>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const animeDirection = ref('slide-left')

const index = ref(1)

const minus = () => {
  if (index.value <= 1) {
    return
  }
  animeDirection.value = 'slide-right'
  index.value--
}

const add = () => {
  if (index.value >= 10) {
    return
  }
  animeDirection.value = 'slide-left'
  index.value++
}
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active{
  transition: all .4s ease-in-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-to {
  opacity: 0;
   transform: translateX(100%);
}
</style>
