import { ref } from 'vue'
import apis from '@/services/apis'
import { defineStore } from 'pinia'
import type { UserInfoType } from '@/services/types'


export const useUserStore = defineStore('user', () => {
  const userInfo = ref<Partial<UserInfoType>>({})
  const isSign = ref(false)

  let localUserInfo = {}
  try {
    localUserInfo = JSON.parse(localStorage.getItem('USER_INFO') || '{}') //没看到USER_INFO
  } catch (error) {
    localUserInfo = {}
  }

  // 从 local读取
  if (!Object.keys(userInfo.value).length && Object.keys(localUserInfo).length) {
    userInfo.value = localUserInfo
  }

  function setLogin() {
    console.log(userInfo.value)
    isSign.value = true
    console.log(isSign.value)
  }

  function getUserDetailAction() {
    apis
      .getUserDetail()
      .send()
      .then((data) => {
        userInfo.value = { ...userInfo.value, ...data }
      })
      .catch(() => {
        // 删除缓存
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('USER_INFO')
      })
  }

  return { userInfo, setLogin, isSign, getUserDetailAction }
})




