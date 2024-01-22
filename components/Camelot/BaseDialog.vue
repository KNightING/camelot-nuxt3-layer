<template>
  <Teleport to="body">
    <CamelotCustomColorSchemeProvider>
      <Transition>
        <div
          v-if="open"
          :id="tag"
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
    </CamelotCustomColorSchemeProvider>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    closeByMask?: boolean;
    tag?:string;
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
if (props.tag) {
  const router = useRouter()

  const route = useRoute()

  watch(open, (isOpen) => {
    // console.log('open', useRoute().path, useRoute().hash, isOpen)
    if (isOpen) {
      router.push({ hash: `#${props.tag}` })
    } else if (useRoute().hash === `#${props.tag}`) {
      if (useRouterHistory()) {
        router.back()
      } else {
        router.replace({ hash: '' })
      }
    }

    // if (isOpen) {
    //   router.push({ hash: `#${props.tag}` })
    // } else if (useRouterHistory() && useRoute().hash) {
    //   router.back()
    // } else if (useRoute().hash === `#${props.tag}`) {
    //   router.replace({ hash: '' })
    // }
  })

  watch(() => [route.path, route.hash], ([path, hash]) => {
    // console.log('path', path, hash)
    if (hash === `#${props.tag}`) {
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

.dialog-container {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100dvh;
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
