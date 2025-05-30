import { ref } from 'vue'
import apis from '@/services/apis'
import { defineStore } from 'pinia'
import type { UserInfoType } from '@/services/types'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<Partial<UserInfoType>>({})
  const isSign = ref(false)

  let localUserInfo = {}
  try {
    localUserInfo = JSON.parse(localStorage.getItem('USER_INFO') || '{}')
  } catch (error) {
    localUserInfo = {}
  }

  if (!Object.keys(userInfo.value).length && Object.keys(localUserInfo).length) {
    userInfo.value = localUserInfo
  }

  function getUserDetailAction() {
    apis
      .getUserDetail()
      .send()
      .then((data: any) => {
        userInfo.value = { ...userInfo.value, ...data }
      })
      .catch(() => {
        // 删除缓存
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('USER_INFO')
      })
  }

  return { userInfo, isSign, getUserDetailAction }
})
