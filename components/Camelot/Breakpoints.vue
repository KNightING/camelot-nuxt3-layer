<template>
  <template v-if="isMobile && $slots.mobile">
    <slot name="mobile" />
  </template>
  <template v-else-if="isTablet && $slots.tablet">
    <slot name="tablet" />
  </template>
  <template v-else-if="isLaptop && $slots.laptop">
    <slot name="laptop" />
  </template>
  <template v-else-if="isDesktop && $slots.desktop">
    <slot name="desktop" />
  </template>
  <template v-else>
    <slot
      :is-mobile="isMobile"
      :is-tablet="isTablet"
      :is-laptop="isLaptop"
      :is-desktop="isDesktop"
    />
  </template>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const isGreaterOrEqualSm = breakpoints.greaterOrEqual('sm')
const isSmallerMd = breakpoints.smaller('md')
const isGreaterOrEqualMd = breakpoints.greaterOrEqual('md')
const isSmallerLg = breakpoints.smaller('lg')
const isGreaterOrEqualLg = breakpoints.greaterOrEqual('lg')
const isSmallerXl = breakpoints.smaller('xl')

const isMobile = breakpoints.smaller('md')
const isTablet = computed(() => {
  return isGreaterOrEqualMd.value && isSmallerLg.value
})
const isLaptop = computed(() => {
  return isGreaterOrEqualLg.value && isSmallerXl.value
})
const isDesktop = breakpoints.greaterOrEqual('xl')
</script>

<style scoped>

</style>
