import type { Directive } from 'vue'

import { useUserStore } from '@/stores/user'
import { useAuthDialogStore } from '@/stores/authDialog'

const handler = (fn: Function) => {
  const userStore = useUserStore()
  const loginStore = useAuthDialogStore()
  // 没登录先登录
  if (!userStore.isSign) {
    loginStore.openLogin()
    return
  }
  fn?.()
}

const vLogin: Directive = {
  mounted(el, binding) {
    if (typeof binding.value !== 'function') return
    el.fn = handler.bind(el, binding.value)
    el.addEventListener('click', el.fn)
  },
  unmounted(el, binding) {
    if (typeof binding.value !== 'function') return
    el.removeEventListener('click', el.fn)
  },
}

export default vLogin
