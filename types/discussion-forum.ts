export interface ICreator {
  firstName: string;
  profilePicture: string;
  designation: string;
  jurisdiction: Jurisdiction;
}

export interface Jurisdiction {
  country: string;
}
export interface IReplies {
  text: string;
  creator: ICreator;
}
export interface ILikes {
  firstName: string;
  id: string;
}
export interface DiscussionForumItem {
  id: string;
  text: string;
  title: string;
  replies: IReplies[];
  likes: ILikes[];
  createdAt: string;
  totalReplies: number;
  creator: ICreator;
  status: string;
}

export interface DiscussionForumParams {
  page: number;
  limit: number;
  statusArray: string[];
}

export interface DiscussionForumByIdParams {
  id: string;
}

export interface DiscussionForumByIdResponse {
  getThreadById: DiscussionForumItem;
}

export interface RepliesParams {
  page: number;
  limit: number;
  threadId: string;
}

export interface ListRepliesResponse {
  listReplies: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    data: DiscussionForumItem[];
  };
}
