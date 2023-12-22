<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="open"
        class="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      >
        <div
          class="w-full h-full bg-gray-900 opacity-80"
          @click="onCloseByMaskClick"
        />
        <dialog
          :open="open"
          class=" bg-white rounded-lg shadow overflow-hidden flex flex-col"
        >
          <i-material-symbols-close
            class="text-primary text-lg m-1 self-end cursor-pointer"
            @click="open = false"
          />
          <div class="overflow-auto">
            <slot />
          </div>
        </dialog>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean;
    closeByMask?: boolean;
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

function onCloseByMaskClick() {
  if (props.closeByMask) {
    open.value = false;
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
