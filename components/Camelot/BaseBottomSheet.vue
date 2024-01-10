<template>
  <Transition>
    <div v-if="open" :id="hashTag" class="dialog-container">
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
    closeByMask?: boolean;
    hashTag?:string;
  }>(),
  {
    closeByMask: true
  }
)

const open = defineModel('open', { default: false })

function onCloseByMaskClick() {
  if (props.closeByMask) {
    open.value = false
  }
}

if (props.hashTag) {
  const router = useRouter()

  watch(open, (isOpen) => {
    if (isOpen) {
      router.push({ hash: `#${props.hashTag}` })
    } else if (useRouterHistory()) {
      router.back()
    } else {
      router.replace({ hash: '' })
    }
  })

  const route = useRoute()

  watch(() => route.hash, (hash) => {
    if (hash === `#${props.hashTag}`) {
      open.value = true
    } else {
      open.value = false
    }
  }, { immediate: true })
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

.v-enter-active dialog,
.v-leave-active dialog{
  transition: transform 0.4s ease;
}

.v-enter-from dialog,
.v-leave-to dialog{
  transform: translateY(100%);
}

.dialog-container {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.mask {
  background-color: rgba(var(--camelot-mask-color), .8);
  width: 100%;
  height: 100%;
  pointer-events: painted;
}

dialog {
  pointer-events: painted;
  background-color: transparent;
}
</style>
