export default defineNuxtRouteMiddleware(to => {
  const id = to.params.id as string

  // Check if ID is a valid positive integer
  const numericId = Number(id)
  if (!id || Number.isNaN(numericId) || numericId <= 0 || !Number.isInteger(numericId)) {
    return navigateTo('/404', { replace: true })
  }
})
