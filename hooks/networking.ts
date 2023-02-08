import {
  gql,
  OnSubscriptionDataOptions,
  useLazyQuery,
  // useQuery,
  useSubscription,
} from "@apollo/client";
import { useErrorMessage } from "@/hooks";
import { useToast } from "@chakra-ui/react";
import {
  IAttendees,
  IReqAttendeeList,
  // IReqParamsListNotification,
  IResAttendeeList,
  IResSubUserStatusUpdate,
  // IResQueryListNotification,
} from "@/types/networking";
import { useEffect, useState } from "react";

const USER_UPDATE_SUBSCRIPTION = gql`
  subscription userStatusUpdate {
    userStatusUpdate {
      userId
      isOnline
      onlineCount
    }
  }
`;

const GET_ATTENDEE_LIST = gql`
  query getAttendeeList($listAttendeeInput: ListAttendeeInput!) {
    getAttendeeList(listAttendeeInput: $listAttendeeInput) {
      page
      limit
      total
      totalPage
      users {
        id
        salutationType
        email
        firstName
        lastName
        role
        orgUnit
        isActive
        isOnline
        designation
        profilePicture
      }
    }
  }
`;

// const GET_NOTIFICATION = gql`
//   query listNotifications($listNotificationInput: ListNotificationInput!) {
//     listNotifications(listNotificationInput: $listNotificationInput) {
//       page
//       limit
//       total
//       totalPage
//       noticeboards {
//         id
//         userId
//         notificationId
//         status
//         notificationType
//         createdAt
//         updatedAt
//         notifications {
//           id
//           noticeboardId
//           notificationType
//           noticeboard {
//             id
//             title
//             description
//             totalLike
//             isActive
//             isLike
//           }
//         }
//       }
//       videoCalls {
//         id
//         userId
//         notificationId
//         status
//         notificationType
//         createdAt
//         updatedAt
//         notifications {
//           id
//           noticeboardId
//           notificationType
//           noticeboard {
//             id
//             title
//             description
//             totalLike
//             isActive
//             isLike
//           }
//         }
//       }
//       chats {
//         id
//         userId
//         notificationId
//         status
//         notificationType
//         createdAt
//         updatedAt
//         notifications {
//           id
//           noticeboardId
//           notificationType
//           noticeboard {
//             id
//             title
//             description
//             totalLike
//             isActive
//             isLike
//           }
//         }
//       }
//     }
//   }
// `;

export const SUBSCRIPTION_NOTIFICATION = gql`
  subscription onNotificationUpdate {
    notificationStatusUpdate {
      notificationType
      notificationId
      noticeboard {
        id
        title
        description
      }
    }
  }
`;

export const useUserUpdate = () => {
  const [newData, setNewData] = useState<IResSubUserStatusUpdate>();
  const { loading, error } = useSubscription(USER_UPDATE_SUBSCRIPTION, {
    onSubscriptionData: ({
      subscriptionData: { data },
    }: OnSubscriptionDataOptions<IResSubUserStatusUpdate>) => {
      // console.log("response subscription user update", data);
      setNewData(data);
    },
  });

  useErrorMessage(error);

  return {
    data: newData,
    loading,
  };
};

export const useGetAttendeeList = () => {
  const toast = useToast();
  const { data: dataUserStatusUpdated } = useUserUpdate();
  const [listData, setListData] = useState<IAttendees[]>([]);
  const [hasMore, setMore] = useState(false);

  const [fetchAttendeeList, { data, loading }] = useLazyQuery<
    IResAttendeeList,
    IReqAttendeeList
  >(GET_ATTENDEE_LIST, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    onError: (error) => {
      toast({
        title: "Error",
        description: `${error.message}`,
        status: "error",
      });
    },
  });

  useEffect(() => {
    if (data) {
      setListData((prev) =>
        [...prev, ...data.getAttendeeList.users].filter(
          (item, index, arr) => arr.indexOf(item) === index
        )
      );
      setMore(data.getAttendeeList.page < data.getAttendeeList.totalPage);
    }
  }, [data]);

  useEffect(() => {
    if (dataUserStatusUpdated && dataUserStatusUpdated.userStatusUpdate) {
      setListData((list) =>
        list
          .filter((itemFilter, index) => list.indexOf(itemFilter) === index)
          .map((item) =>
            item.id === dataUserStatusUpdated.userStatusUpdate.userId
              ? {
                  ...item,
                  isOnline: dataUserStatusUpdated.userStatusUpdate.isOnline,
                }
              : item
          )
      );
    }
  }, [dataUserStatusUpdated]);

  return { fetchAttendeeList, data: listData, setListData, loading, hasMore };
};

// export const useNotification = (params: IReqParamsListNotification) => {
//   const toast = useToast();
//   const query = useQuery<IResQueryListNotification, IReqParamsListNotification>(
//     GET_NOTIFICATION,
//     {
//       fetchPolicy: "cache-and-network",
//       errorPolicy: "all",
//       notifyOnNetworkStatusChange: true,
//       variables: params,
//       onError: (error) => {
//         toast({
//           title: "Error",
//           description: `${error.message}`,
//           status: "error",
//         });
//       },
//     }
//   );

//   return { ...query };
// };
