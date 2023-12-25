<template>
  <Teleport to="body">
    <Transition>
      <CamelotCustomColorSchemeProvider
        v-if="open"
        class="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center w-full h-full"
      >
        <div
          class="mask w-full h-full"
          @click="onMaskClick"
        />
        <dialog
          :open="open"
          class="bg-transparent"
        >
          <slot />
        </dialog>
      </CamelotCustomColorSchemeProvider>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts" generic="T">
const props = withDefaults(
  defineProps<{
    open: boolean;
    closeByMask?: boolean;
    lightColorScheme?: CustomColorScheme<T>;
    darkColorScheme?: CustomColorScheme<T>;
  }>(),
  {
    open: false,
    closeByMask: true,
  }
);

const emit = defineEmits<{
  "update:open": [isOpen: boolean];
}>();

const open = computed({
  get() {
    return props.open;
  },
  set(value) {
    emit("update:open", value);
  },
});

function onMaskClick() {
  if (props.closeByMask) {
    open.value = false;
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.mask {
  background-color: rgba(var(--camelot-mask-color), .8);
}
</style>
