export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) { return }
  if (!useRuntimeConfig().replaceEndSplash) { return }

  if (to.path !== '/' && to.path.endsWith('/')) {
    const path = to.path.substring(0, to.path.length - 1)
    return navigateTo({
      path,
      query: to.query,
      hash: to.hash
    })
  }
})
