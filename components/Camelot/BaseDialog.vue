<template>
  <Transition>
    <div
      v-if="open"
      class="dialog-container"
    >
      <div
        class="mask"
        @click="onCloseByMaskClick"
      />
      <dialog
        :open="open"
      >
        <slot />
      </dialog>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean;
    closeByMask?: boolean;
  }>(),
  {
    open: false,
    closeByMask: true
  }
)

const emit = defineEmits<{
  'update:open': [isOpen: boolean];
}>()

const open = computed({
  get() {
    return props.open
  },
  set(value) {
    emit('update:open', value)
  }
})

function onCloseByMaskClick() {
  if (props.closeByMask) {
    open.value = false
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

.dialog-container {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.mask {
  background-color: rgba(var(--camelot-mask-color), .8);
  width: 100%;
  height: 100%;
  pointer-events: painted;
}

dialog {
  background-color: transparent;
}
</style>
