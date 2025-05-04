/**
 * 消息类型
 */
export enum MsgEnum {
    /** 未知 */
    UNKNOWN,
    /** 文本 */
    TEXT,
    /** 撤回 */
    RECALL,
    /** 图片 */
    IMAGE,
    /** 文件 */
    FILE,
    /** 语音 */
    VOICE,
    /** 视频 */
    VIDEO,
    /** 表情包 */
    EMOJI,
    /** 系统消息 */
    SYSTEM,
  }
  
  /**
   * 在线状态
   */
  export enum OnlineEnum {
    /** 在线 */
    ONLINE = 1,
    /** 离线 */
    OFFLINE,
  }
  
  /**
   * 操作类型
   */
  export enum ActEnum {
    /** 确认 */
    Confirm = 1,
    /** 取消 */
    Cancel,
  }
  
  export enum SexEnum {
    MAN = 1,
    REMALE,
  }
  
  export enum PowerEnum {
    USER,
    ADMIN,
  }
  
  export enum IsYetEnum {
    NO,
    YES,
  }
  
  export enum MarkEnum {
    LIKE = 1,
    DISLIKE,
  }
  
  // 成员角色 1群主 2管理员 3普通成员 4踢出群聊
  export enum RoleEnum {
    /** 1群主 */
    LORD = 1,
    /** 2管理员 */
    ADMIN,
    /** 3普通成员 */
    NORMAL,
    /** 4踢出群聊 */
    REMOVED,
  }
  
  /** 房间类型 1群聊 2单聊 */
  export enum RoomTypeEnum {
    /** 1群聊 */
    Group = 1,
    /** 2单聊 */
    Single,
  }
  
  /** 变更类型 1 加入群组，2： 移除群组 */
  export enum ChangeTypeEnum {
    /** 1 加入群组 */
    JOIN = 1,
    /** 2 移除群组 */
    REMOVE,
  }
  