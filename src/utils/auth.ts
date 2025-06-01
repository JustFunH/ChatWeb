// src/utils/auth.ts 或 src/services/authService.ts

import { useAuthDialogStore } from '@/stores/authDialog'
import { useUserStore } from '@/stores/user'
import { useChatStore } from '@/stores/chat'
import { useGroupStore } from '@/stores/group'
import { useEmojiStore } from '@/stores/emoji'
import type { LoginSuccessResType } from './wsType'
import { OnlineEnum } from '@/enums'
import { computedToken } from '@/services/request'

import { WsRequestMsgType } from '@/utils/wsType'
import ws from '@/utils/websocket'

export function handleLoginSuccess(data: LoginSuccessResType) {
  const loginStore = useAuthDialogStore()
  const userStore = useUserStore()
  const chatStore = useChatStore()
  const groupStore = useGroupStore()
  const emojiStore = useEmojiStore()

  userStore.isSign = true;
  const { token, ...rest } = data
  userStore.userInfo = { ...userStore.userInfo, ...rest }
  localStorage.setItem('USER_INFO', JSON.stringify(rest))
  localStorage.setItem('TOKEN', token)

  // 构造认证消息
  const authMessage = {
    type: WsRequestMsgType.Authorization,
    data: {
      token: token,
    },
  }
  
  ws.send(authMessage)

  computedToken.clear()
  computedToken.get()

  userStore.getUserDetailAction()
  loginStore.closeDialog()

  groupStore.batchUpdateUserStatus([
    {
      activeStatus: OnlineEnum.ONLINE,
      avatar: rest.avatar,
      lastOptTime: Date.now(),
      name: rest.name,
      uid: rest.uid,
    },
  ])

  chatStore.getSessionList(true)
  emojiStore.getEmojiList()
}
