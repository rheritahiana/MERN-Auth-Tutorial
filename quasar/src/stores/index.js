import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

export default store((/* { ssrContext } */) => {
  const pinia = createPinia()
  pinia.use(piniaPersist)
  return pinia
})
