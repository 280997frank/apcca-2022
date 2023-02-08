import { useNoticeboardDispatch } from "@/states/noticeboard/dispatch";
import { TResPaginationNotifNoticeboard } from "@/types/notification";
import { IReqPagination } from "@/types/pagination";
import { gql, useLazyQuery, useSubscription } from "@apollo/client";
import { useErrorMessage } from ".";

const NOTIFICATION_STATUS_UPDATE = gql`
  subscription notificationStatusUpdate {
    notificationStatusUpdate {
      notificationType
      notificationId
      noticeboard {
        id
      }
    }
  }
`;

export const useNotificationUpdate = () => {
  const { loading, data, error } = useSubscription(NOTIFICATION_STATUS_UPDATE);

  useErrorMessage(error);

  return {
    data,
    loading,
    error,
  };
};

const LIST_NOTIFICATION_NOTICEBOARD = gql`
  query listNotifications($listNotificationInput: ListNotificationInput!) {
    listNotifications(listNotificationInput: $listNotificationInput) {
      page
      limit
      total
      totalPage
      noticeboards {
        id
        notificationId
        notificationType
      }
    }
  }
`;

export const useListNotificationNoticeboard = (payload: IReqPagination) => {
  const { handleBadge } = useNoticeboardDispatch();
  const [fetchListNotification, { data, loading, error }] =
    useLazyQuery<TResPaginationNotifNoticeboard>(
      LIST_NOTIFICATION_NOTICEBOARD,
      {
        notifyOnNetworkStatusChange: true,
        errorPolicy: "all",
        fetchPolicy: "no-cache",
        variables: {
          listNotificationInput: payload,
        },
        onCompleted: (data) => {
          if (data) {
            handleBadge("" + data.listNotifications.noticeboards.length);
          } else {
            handleBadge("0");
          }
        },
      }
    );

  useErrorMessage(error);

  return {
    fetchListNotification,
    data,
    loading,
    error,
  };
};
