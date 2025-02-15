<template>
  <div
    ref="containerEl"
    :class="{
      'bg-gray-300 animate-pulse relative': !loadedSrc,
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <ClientOnly>
      <img
        v-if="loadedSrc"
        ref="imgEl"
        :src="loadedSrc"
        :alt="alt"
        class="relative select-none h-full w-full"
        :class="{
          'object-fill': objectFit === 'fill',
          'object-contain': objectFit === 'contain',
          'object-cover': objectFit === 'cover',
          'object-scale-down': objectFit === 'scale-down',
        }"
        :style="{
          width: `${width}px`,
          height: `${height}px`,
        }"
      >
    </ClientOnly>

    <Teleport to="body">
      <div
        v-if="loadedSrc && showFullImage"
        ref="imgPopupEl"
        class="bg-white z-30 fixed rounded-xl border-4 border-white overflow-hidden drop-shadow-md pointer-events-none w-fit h-fit"
        :style="{
          top: `${popupTop}px`,
          left: `${popupLeft}px`,
        }"
      >
        <AppImage
          :src="fullSrc ?? loadedSrc"
          :alt="alt"
          class="max-w-96 max-h-96 min-w-10 min-h-10"
          :style="{
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
          }"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string
  fullSrc?: string
  alt?: string
  hoverShowFullImage?: boolean
  width?: number
  height?: number
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}>(), {
  hoverShowFullImage: false,
  objectFit: 'scale-down',
})

const emit = defineEmits<{
  loaded: [image: HTMLImageElement]
}>()

watch(() => props.src, () => {
  loadedSrc.value = undefined
  loadImage()
})

const containerEl = useTemplateRef('containerEl')

const imgEl = useTemplateRef('imgEl')

const { stop } = useIntersectionObserver(containerEl, ([entry], observerElement) => {
  if (entry?.isIntersecting) {
    loadImage()
    stop()
  }
}, { immediate: true, threshold: 0.5 })

const { top, bottom, right, left, height: imgHeight } = useElementBounding(imgEl)

const imgPopupEl = useTemplateRef('imgPopupEl')
const { width: popupWidth, height: popupHeight, bottom: popupBottom } = useElementBounding(imgPopupEl)

const popupTop = computed(() => {
  const result = top.value + (imgHeight.value / 2) - (popupHeight.value / 2)
  if (result + popupHeight.value > window.innerHeight) {
    return bottom.value - (popupHeight.value + 25)
  }
  return result
})

const popupLeft = computed(() => {
  const result = right.value + 5
  if (result + popupWidth.value > window.innerWidth) {
    return left.value - (popupWidth.value + 5)
  }
  return result
})

const loadedSrc = ref<string>()

const showFullImage = ref(false)
let timeoutId: NodeJS.Timeout | string | number | undefined
const abortController = ref(null)

const imageHeight = ref(0)
const imageWidth = ref(0)

const handleMouseEnter = () => {
  if (!props.hoverShowFullImage) return
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    // loadFullImage()
    showFullImage.value = true
  }, 400)
}

const handleMouseLeave = () => {
  if (!props.hoverShowFullImage) return
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    showFullImage.value = false
  }, 100)
}

const convertImageSrc = (src: string): string => {
  try {
    const url = new URL(src)
    return src
  } catch {
    return useRuntimeConfig().public.parkImageHost + src
  }
}

const loadImage = useThrottleFn(async () => {
  if (!props.src) return
  const image = new Image()
  image.onload = () => {
    loadedSrc.value = image.src
    imageHeight.value = image.height
    imageWidth.value = image.width
    emit('loaded', image)
  }

  image.src = convertImageSrc(props.src)
}, 1000)
</script>

<style scoped>

</style>
