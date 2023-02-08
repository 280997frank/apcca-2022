import { IUser } from "./auth";

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IReqParamList {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IResSubUserStatusUpdate {
  userStatusUpdate: {
    userId: string;
    isOnline: boolean;
    onlineCount: number;
  };
}

export interface IAttendees extends IUser {
  isOnline: boolean;
}

export interface IAttendeeList extends IPagination {
  users: IAttendees[];
}

export interface IResAttendeeList {
  getAttendeeList: IAttendeeList;
}

export interface IReqAttendeeList {
  listAttendeeInput: IReqParamList;
}

// notification

// type TNotificationType =
//   | "VideoCall"
//   | "Chat"
//   | "NoticeBoard"
//   | "session"
//   | "message";

// interface INoticeboard {
//   id: string;
//   title: string;
//   description: string;
//   totalLike: number;
//   isActive: boolean;
// }

// export interface INotification {
//   id: string;
//   noticeboardId: string;
//   notificationType: TNotificationType;
//   noticeboard: INoticeboard;
// }

// export interface IListNotification {
//   id: string;
//   userId: string;
//   status: "READ" | "UNREAD";
//   notifications: INotification;
//   notificationType: TNotificationType;
// }

// export interface IResListNotification extends IPagination {
//   noticeboards: IListNotification[];
//   videoCalls: IListNotification[];
//   chats: IListNotification[];
// }

// export interface IResQueryListNotification {
//   listNotifications: IResListNotification;
// }

// export interface IReqParamsListNotification {
//   listNotificationInput: IReqParamList;
// }
