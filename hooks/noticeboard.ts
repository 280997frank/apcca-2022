import {
  INoticeboard,
  IReqNoticeboardReaction,
  IResListNoticeboard,
} from "@/types/noticeboard";
import { IReqPagination } from "@/types/pagination";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useErrorMessage } from ".";
import { useListNotificationNoticeboard } from "./notification";

const GET_LIST_NOTICEBOARD = gql`
  query listNoticeboard($listNoticeboardInput: ListNoticeboardInput!) {
    listNoticeboard(listNoticeboardInput: $listNoticeboardInput) {
      page
      limit
      total
      totalPage
      data {
        id
        title
        description
        totalLike
        isActive
        documents {
          title
          url
          noticeboardAssetType
        }
        photosAndVideos {
          title
          url
          noticeboardAssetType
        }
        isLike
        noticeBoardReactionCount
      }
    }
  }
`;

export const useGetListNoticeboard = (payload: IReqPagination) => {
  const { fetchListNotification } = useListNotificationNoticeboard({
    page: 1,
    limit: 25,
  });
  const [fetchListNoticeboard, { data, loading, error }] =
    useLazyQuery<IResListNoticeboard>(GET_LIST_NOTICEBOARD, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: {
        listNoticeboardInput: {
          ...payload,
          order: {
            orderBy: "CREATED_AT",
            sortBy: "DESC",
          },
        },
      },
      onCompleted: () => {
        fetchListNotification();
      },
    });

  useErrorMessage(error);

  return {
    fetchListNoticeboard,
    data,
    loading,
    error,
  };
};

const NOTICEBOARD_REACTION = gql`
  mutation noticeboardReaction(
    $noticeboardReactionInput: NoticeboardReactionInput!
  ) {
    noticeboardReaction(noticeboardReactionInput: $noticeboardReactionInput) {
      id
    }
  }
`;

export const useNoticeboardReaction = (payload: IReqPagination) => {
  const { fetchListNoticeboard } = useGetListNoticeboard(payload);
  const [featchNoticeboardReaction, { loading, data, error }] = useMutation<
    INoticeboard,
    IReqNoticeboardReaction
  >(NOTICEBOARD_REACTION, {
    onCompleted: () => {
      fetchListNoticeboard();
    },
  });

  useErrorMessage(error);

  return {
    featchNoticeboardReaction,
    isLoading: loading,
    data,
  };
};

const REMOVE_NOTICEBOARD_REACTION = gql`
  mutation removeNoticeboardReaction(
    $noticeboardReactionInput: NoticeboardReactionInput!
  ) {
    removeNoticeboardReaction(
      noticeboardReactionInput: $noticeboardReactionInput
    ) {
      id
      totalLike
      isLike
    }
  }
`;

export const useRemoveNoticeboardReaction = (payload: IReqPagination) => {
  const { fetchListNoticeboard } = useGetListNoticeboard(payload);

  const [featchRemoveNoticeboardReaction, { loading, data, error }] =
    useMutation<INoticeboard, IReqNoticeboardReaction>(
      REMOVE_NOTICEBOARD_REACTION,
      {
        onCompleted: () => {
          fetchListNoticeboard();
        },
      }
    );

  useErrorMessage(error);

  return {
    featchRemoveNoticeboardReaction,
    data,
    loading,
    error,
  };
};
