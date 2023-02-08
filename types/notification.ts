import { TResPaginationWoData } from "./pagination";

export enum ENotificationType {
  NOTICEBOARD = "NoticeBoard",
  VIDEO_CALL = "VideoCall",
  CHAT = "Chat",
  SESSION = "session",
  MESSAGE = "message",
}

export interface INotificationNoticeboard {
  id: string;
  notificationId: string;
  notificationType: ENotificationType;
}

export type TResPaginationNotifNoticeboard = {
  listNotifications: TResPaginationWoData & {
    noticeboards: INotificationNoticeboard[];
  };
};
