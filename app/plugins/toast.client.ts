import { useToast } from 'primevue/usetoast'

export default defineNuxtPlugin(() => {
  // Return a getter function that will be called in component context
  return {
    provide: {
      toast: useToast(),
    },
  }
})
