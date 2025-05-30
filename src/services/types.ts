import type {
    ActEnum,
    IsYetEnum,
    MarkEnum,
    MsgEnum,
    OnlineEnum,
    RoomTypeEnum,
    SexEnum,
  } from '@/enums'

export type UserInfoType = {
    /** 用户唯一标识 */
    uid: number
    /** 用户头像 */
    avatar: string
    /** 用户名 */
    name: string
    /** 性别 1为男性，2为女性 */
    sex: SexEnum
    /** 权限 */
    power?: number
  }