// import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import { IUser } from "./auth";
import { ENotificationType } from "./notification";
import { TResPaginationWoData } from "./pagination";

export enum AgoraRoleType {
  PUBLISHER = "PUBLISHER",
  SUBSCRIBER = "SUBSCRIBER",
}

// export interface IAgoraUser extends IAgoraRTCRemoteUser {
//   username?: string;
//   picture?: string;
// }

export interface AgoraTokenGeneratorResponse {
  agoraTokenGenerator: {
    token: string;
  };
}
export interface AgoraTokenGeneratorInput {
  agoraTokenGeneratorInput: {
    channelName: string;
    uid: string;
    roleType: AgoraRoleType;
  };
}

export interface AgoraRTMTokenGeneratorResponse {
  agoraRTMTokenGenerator: {
    token: string;
  };
}

export interface AgoraRTMTokenGeneratorInput {
  agoraRTMTokenGeneratorInput: {
    account: string;
  };
}

export interface AgoraRTCInitiateVideoCallResponse {
  initialVideoCall: string;
}

export interface AgoraRTCInitiateVideoCallInput {
  videoCallInput: {
    recipientId: string;
    recipientName: string;
  };
}

export interface AgoraRTCInviteVideoCallResponse {
  inviteVideoCall: string;
}

export interface AgoraRTCInviteVideoCallInput {
  videoCallInviteInput: {
    videoCallId: string;
    recipientId: string;
  };
}

export interface ResponseGetUser {
  getUser: IUser | undefined;
}

export interface INotificationVideoCall {
  id: string;
  userId: string;
  status: string;
  notificationId: string;
  notificationType: ENotificationType;
  notifications: {
    videoCallId: string;
    videoCall: {
      senderId: string;
      senderName: string;
      recipientId: string;
      recipientName: string;
    };
  };
  createdAt: string;
}

export interface INotificationVideoCallResponse {
  notificationId: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  videoCallId: string;
  timestamps: string;
}

export type TResPaginationNotifVideoCall = {
  listNotifications: TResPaginationWoData & {
    videoCalls: INotificationVideoCall[];
  };
};

export interface TPayloadNotifVideoCall {
  listNotificationInput: {
    page: number;
    limit: number;
  };
}

export interface IResSubNotificationStatusUpdate {
  notificationStatusUpdate: INotificationVideoCallResponse;
}

export interface AgoraReadVideoCallResponse {
  readNotification: {
    id: string;
    status: string;
    userId: string;
    notificationId: string;
    notificationType: string;
  };
}

export interface AgoraReadVideoCallInput {
  readNotificationInput: {
    notificationId: string;
  };
}
