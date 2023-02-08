import React from "react";
import { IResPagination } from "./pagination";

export enum ENoticeboardAssetType {
  VIDEO = "VIDEO",
  PHOTO = "PHOTO",
  DOCUMENT = "DOCUMENT",
}

export interface INoticeboardAsset {
  id: string;
  noticeboardId: string;
  title: string;
  url: string;
  noticeboardAssetType: ENoticeboardAssetType;
}
export interface INoticeboard {
  id: string;
  title: string;
  description: string;
  totalLike: number;
  isActive: boolean;
  documents: INoticeboardAsset[];
  photosAndVideos: INoticeboardAsset[];
  isLike: boolean;
  noticeBoardReactionCount: number;
}

export interface INoticeboardProps {
  data: INoticeboard[];
}

export interface IResListNoticeboard {
  listNoticeboard: IResPagination<INoticeboard[]>;
}

export interface IReqNoticeboardReaction {
  noticeboardReactionInput: {
    noticeboardId: string;
  };
}

export type TNoticeboardItemProps = React.FC<{
  data: INoticeboard;
  onClickDetail: (e: INoticeboard) => void;
  onClickLike: (noticeboardId: string, isLike: boolean) => Promise<void>;
}>;

export type TNoticeboardDetailProps = React.FC<{
  data: INoticeboard;
  onToggle: () => void;
  onClickLike: (noticeboardId: string, isLike: boolean) => Promise<void>;
}>;

export type TNoticeboardPdfViewerProps = React.FC<{
  data: INoticeboardAsset;
  isOpen: boolean;
  onClose: () => void;
}>;
