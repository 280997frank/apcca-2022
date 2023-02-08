import {
  ExitBreakoutRoomPayload,
  JoinBreakoutRoomPayload,
  ResponseExitBreakoutRoomMutation,
  ResponseJoinBreakoutRoomMutation,
  ResponseSubBreakoutRoomMutation,
  TGetBreakOutRoomsResponse,
} from "@/types/breakoutRoom";
import {
  gql,
  useLazyQuery,
  useMutation,
  useSubscription,
} from "@apollo/client";
import { useToast } from "@chakra-ui/react";
const GETBREAKOUTROOMS = gql`
  # Write your query or mutation here
  query {
    dayOne: getBreakoutRoomByDate(
      getBreakoutRoomByDateInput: { date: "2022-09-19" }
    ) {
      id
      name
      occupiedCapacity
      zoomMeetingId
      zoomPassword
      isShow
      thumbnail
      conference {
        title
        thumbnail
      }
    }
    dayTwo: getBreakoutRoomByDate(
      getBreakoutRoomByDateInput: { date: "2022-09-20" }
    ) {
      id
      name
      occupiedCapacity
      zoomMeetingId
      zoomPassword
      isShow
      thumbnail
      conference {
        title
        thumbnail
      }
    }
    dayThree: getBreakoutRoomByDate(
      getBreakoutRoomByDateInput: { date: "2022-09-21" }
    ) {
      id
      name
      occupiedCapacity
      zoomMeetingId
      zoomPassword
      isShow
      thumbnail
      conference {
        title
        thumbnail
      }
    }
    dayFour: getBreakoutRoomByDate(
      getBreakoutRoomByDateInput: { date: "2022-09-22" }
    ) {
      id
      name
      occupiedCapacity
      zoomMeetingId
      zoomPassword
      isShow
      thumbnail
      conference {
        title
        thumbnail
      }
    }
    dayFive: getBreakoutRoomByDate(
      getBreakoutRoomByDateInput: { date: "2022-09-23" }
    ) {
      id
      name
      occupiedCapacity
      zoomMeetingId
      zoomPassword
      isShow
      thumbnail
      conference {
        title
        thumbnail
      }
    }
  }
`;

export const useGetBreakRooms = () => {
  const toast = useToast();
  const [fetchGetBreakoutRooms, { loading, data }] =
    useLazyQuery<TGetBreakOutRoomsResponse>(GETBREAKOUTROOMS, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      },
    });

  // useErrorMessage(error);

  return {
    fetchGetBreakoutRooms,
    loading,
    data,
    // dayOne: data ? data.dayOne : [],
    // dayTwo: data !== undefined ? data.dayTwo : [],
    // dayThree: data !== undefined ? data.dayThree : [],
    // dayFour: data !== undefined ? data.dayFour : [],
    // dayFive: data !== undefined ? data.dayFive : [],
  };
};

const JOINBREAKOUTROOM = gql`
  mutation joinBreakoutRoom($joinBreakoutRoomInput: JoinBreakoutRoomInput!) {
    joinBreakoutRoom(joinBreakoutRoomInput: $joinBreakoutRoomInput) {
      id
      name
      occupiedCapacity
    }
  }
`;

export const useJoinBreakoutRoom = () => {
  const toast = useToast();
  const [fetchJoinBreakoutRoom, { data: responseJoinBreakoutRoom, loading }] =
    useMutation<ResponseJoinBreakoutRoomMutation, JoinBreakoutRoomPayload>(
      JOINBREAKOUTROOM,
      {
        onError: (error) => {
          toast({
            title: error.message,
            position: "bottom",
            isClosable: true,
            status: "error",
          });
        },
      }
    );

  return {
    fetchJoinBreakoutRoom,
    responseJoinBreakoutRoom,
    loading,
  };
};

const EXITBREAKOUTROOM = gql`
  mutation exitBreakoutRoom($exitBreakoutRoomInput: ExitBreakoutRoomInput!) {
    exitBreakoutRoom(exitBreakoutRoomInput: $exitBreakoutRoomInput) {
      success
    }
  }
`;

export const useExitBreakoutRoom = () => {
  const toast = useToast();
  const [fetchExitBreakoutRoom, { data: responseExitBreakoutRoom, loading }] =
    useMutation<ResponseExitBreakoutRoomMutation, ExitBreakoutRoomPayload>(
      EXITBREAKOUTROOM,
      {
        onError: (error) => {
          toast({
            title: error.message,
            position: "bottom",
            isClosable: true,
            status: "error",
          });
        },
      }
    );

  return {
    fetchExitBreakoutRoom,
    responseExitBreakoutRoom,
    loading,
  };
};

const STATUS_BREAKOUTROOMBYID = gql`
  subscription {
    breakoutRoomUpdate {
      breakoutRoomId
      count
      isShow
    }
  }
`;

export function useSubscriptionBreakoutRoom() {
  const { data, loading } = useSubscription<ResponseSubBreakoutRoomMutation>(
    STATUS_BREAKOUTROOMBYID
  );
  return {
    data,
    loading,
  };
}

// export const useChannelPersonal = (
//   channelType: string,
//   channelName: string
// ) => {
//   const { client } = useChatContext();
//   const [channel, setChannel] = useState<Channel | null>(null);
//   const toast = useToast();

//   const idUser1 = "2727262812891";
//   const idUser2 = "1231231231231";
//   const chanelPersonal = idUser1 + "-" + idUser2;

//   useEffect(() => {
//     const initChannel = async () => {
//       try {
//         const channelInstance = client.channel("messaging", chanelPersonal, {
//           members: [idUser1, idUser2],
//         });
//         // await channelInstance.create();
//         setChannel(channelInstance);
//       } catch (error) {
//         toast({
//           title: "Something wrong!",
//           description: `Can't connect to chat channel.`,
//           status: "error",
//         });
//       }
//     };

//     initChannel();

//     // eslint-disable-next-line
//   }, [client, channelName, channelType]);

//   return channel;
// };
