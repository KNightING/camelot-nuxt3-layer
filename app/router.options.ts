import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
// https://github.com/nuxt/framework/issues/1707#issuecomment-1104540588
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (to.fullPath.replace(/#.*/, '') === from.fullPath.replace(/#.*/, '')) { return }
    // behavior: 'auto' | 'smooth'
    return savedPosition || { behavior: 'auto', top: 0 }
  }
}
