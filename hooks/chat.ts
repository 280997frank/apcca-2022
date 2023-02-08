import { useEffect, useState } from "react";
import { Channel, StreamChat, UserResponse } from "stream-chat";
import { useChatContext } from "stream-chat-react";
import { useQuery, gql } from "@apollo/client";
import { useErrorMessage } from "@/hooks";
import { IGetChatTokenResponse } from "@/types/chat";
import { useToast } from "@chakra-ui/react";
import useChatDispatch from "@/states/chat/dispatch";

const GET_CHAT_TOKEN = gql`
  query getChatToken {
    getUserGetstream {
      token
      user {
        id
        firstName
        lastName
        profilePicture
      }
    }
  }
`;

export const useChatToken = () => {
  const { loading, error, data } = useQuery<IGetChatTokenResponse>(
    GET_CHAT_TOKEN,
    {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    }
  );

  useErrorMessage(error);

  return {
    loading,
    data: data ? data.getUserGetstream : null,
  };
};

export const useChatConnect = () => {
  const [client, setClient] = useState<StreamChat | null>(null);
  const { data } = useChatToken();
  const toast = useToast();

  useEffect(() => {
    const newClient = new StreamChat(
      process.env.NEXT_PUBLIC_GETSTREAM_KEY as string
    );

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);

    const connectUser = async () => {
      try {
        if (data) {
          const token = data.token;
          await newClient.connectUser(
            {
              id: data.user.id,
              name: `${data.user.firstName} ${data.user.lastName}`,
              image: data.user.profilePicture,
            },
            token
          );
        }
      } catch (error) {
        toast({
          title: "Something wrong!",
          description: `Can't connect to chat.`,
          status: "error",
        });
        console.log(error);
      }
    };

    if (data) {
      connectUser();
    }

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
    // eslint-disable-next-line
  }, [data]);

  return client;
};

export const useChannel = (channelType: string, channelName: string) => {
  const { client } = useChatContext();
  const [channel, setChannel] = useState<Channel | null>(null);
  const toast = useToast();

  useEffect(() => {
    const initChannel = () => {
      try {
        const newChannel = client.channel(channelType, channelName);
        setChannel(newChannel);
      } catch (error) {
        toast({
          title: "Something wrong!",
          description: `Can't connect to chat channel.`,
          status: "error",
        });
      }
    };

    initChannel();

    // eslint-disable-next-line
  }, [client, channelName, channelType]);

  return channel;
};

export const useMessagingChannel = () => {
  const { client, setActiveChannel } = useChatContext();
  const toast = useToast();

  const initChannel = async (members: string[]) => {
    try {
      if (!client.userID) throw new Error("User not logged in");

      const channel = client.channel("messaging", {
        members: [...members, client.userID],
      });
      await channel.create();
      await channel.watch();
      setActiveChannel(channel);
    } catch (error: any) {
      toast({
        title: "Something wrong!",
        description: error.message,
        status: "error",
      });
    }
  };

  const openChannel = async (id: string) => {
    try {
      // if (!client.userID) throw new Error("User not logged in");
      // const filter = { type: "messaging", members: { $in: [client.userID] } };
      // const sort = [{ last_message_at: -1 }];
      // const channel = client.queryChannels(filter, sort,);
      const channel = client.getChannelById("messaging", id, {});
      setActiveChannel(channel);
    } catch (error: any) {
      toast({
        title: "Something wrong!",
        description: error.message,
        status: "error",
      });
    }
  };

  return { initChannel, openChannel };
};

export const useUpdatePhotoprofileChat = (imageurl: string) => {
  const { client } = useChatContext();
  const toast = useToast();

  useEffect(() => {
    const initChannel = () => {
      try {
        if (!imageurl || !client.userID) return;
        const update = {
          id: client.userID,
          set: {
            image: imageurl,
          },
        };
        client.partialUpdateUser(update);
      } catch (error: any) {
        toast({
          title: "Something wrong!",
          description: error.message,
          status: "error",
        });
      }
    };

    initChannel();

    // eslint-disable-next-line
  }, [client]);
  return client;
};

export const useChannelPersonal = (AttendeeUserId: string) => {
  const { client } = useChatContext();
  const [channel, setChannel] = useState<Channel | null>(null);
  const toast = useToast();

  useEffect(() => {
    const initChannel = async () => {
      try {
        if (!AttendeeUserId || !client.userID) return;

        // const chanelPersonal = AttendeeUserId + "-" + client.userID;
        const conversation = await client.channel(
          "messaging",
          // "networking",
          /*chanelPersonal,*/ {
            // created_by_id: client.userID,
            members: [AttendeeUserId, client.userID],
          }
        );
        await conversation.watch();
        // await conversation.create();
        setChannel(conversation);
      } catch (error: any) {
        toast({
          title: "Something wrong!",
          description: error.message,
          status: "error",
        });
      }
    };

    initChannel();

    // eslint-disable-next-line
  }, [client]);

  return channel;
};
export interface TMsgNotif {
  id: string;
  idMsg: string;
  name: string;
  msg: string;
  isRead: boolean;
  image: string;
  timestamp: string;
  cid: string;
}
export const useChatNotifList = () => {
  const { client } = useChatContext();
  // const [chatNotifList, setChatNotifList] = useState<TMsgNotif[]>([]);
  // const [totalUnRead, setTotalUnread] = useState(0);
  const { chatNotifList, totalUnread, setNotification } = useChatDispatch();
  // const toast = useToast();

  useEffect(() => {
    const getChatNotifList = async () => {
      try {
        // const newAttendeeUser = await AttendeeUser;
        if (!client.clientID) return;

        const filter: any = {
          type: "messaging",
          members: { $in: [client.userID] },
        };

        const conversation = await client.queryChannels(
          filter,
          { last_message_at: -1 },
          {
            watch: true,
          }
        );
        // NOTIFICATION.MESSAGE_NEW

        conversation.map((channel) => {
          // console.log("chanel", chanel);
          channel.watch();
          const msgUnRead = channel.countUnread();

          if (msgUnRead > 0) {
            const listUnreadMsg = channel.state.messages.slice(-msgUnRead);
            // console.log("listUnreadMsg", listUnreadMsg);
            const newListUnreadMsg = listUnreadMsg.map((item) => {
              if (
                item.user !== undefined &&
                item.user !== null &&
                item.user.id !== undefined &&
                item.user.name !== undefined &&
                item.user.image !== undefined &&
                item.html !== undefined &&
                item.cid !== undefined
              ) {
                return {
                  id: item.user?.id,
                  idMsg: item.id,
                  name: item.user?.name,
                  msg: item.html,
                  isRead: false,
                  image: item.user.image,
                  timestamp: item.created_at.toString(),
                  cid: item.cid,
                };
              }
              return {
                id: "",
                idMsg: "",
                name: "",
                msg: "",
                isRead: false,
                image: "",
                timestamp: "",
                cid: "",
              };
            });
            // setTotalUnread(msgUnRead);
            // setChatNotifList(newListUnreadMsg);
            // setTotalUnread(msgUnRead);
            setNotification(newListUnreadMsg);
          }

          channel.on((event) => {
            if (
              event.type === "message.new" &&
              event.unread_count &&
              event !== undefined &&
              event.created_at !== undefined &&
              event.user !== undefined &&
              event.user.name !== undefined &&
              event.user.image !== undefined &&
              event.message !== undefined &&
              event.message.html !== undefined &&
              event.unread_count > 0
            ) {
              if (client.userID !== event.user.id) {
                const newChatNotfif: TMsgNotif = {
                  id: event.user.id,
                  idMsg: event.message.id,
                  name: event.user.name,
                  msg: event.message.html,
                  isRead:
                    event.message.unread !== undefined
                      ? event.message.unread
                      : false,
                  image: event.user.image,
                  timestamp: event.created_at,
                  cid: event.cid as string,
                };
                // console.log("event", event);
                // console.log("message.new", event);
                // setTotalUnread((totalUnRead) => totalUnRead + 1);
                // setChatNotifList((chatNotifList) => [
                //   ...chatNotifList,
                //   newChatNotfif,
                // ]);
                // setTotalUnread(totalUnread + 1);
                const chatNotif = [...chatNotifList, newChatNotfif];
                // chatNotif.push(newChatNotfif);
                setNotification(chatNotif);
              }
            }

            if (event.type === "message.read" && event.user !== undefined) {
              if (client.userID === event.user.id) {
                // console.log("message.read", event);
                // setChatNotifList((chatNotifList) => [
                //   ...chatNotifList.filter((item) => item.cid !== event.cid),
                // ]);
                const chatNotif = [...chatNotifList].filter(
                  (item) => item.cid !== event.cid
                );
                setNotification(chatNotif);
              }
            }
            // if (event.total_unread_count !== undefined) {
            //   console.log("total_unread_count", event.total_unread_count);
            // }

            // if (event.unread_channels !== undefined) {
            //   console.log("unread_channels", event.unread_channels);
            // }
          });
        });
      } catch (error: any) {
        console.log("error chat notif", error);
        // toast({
        //   title: "Something wrong!",
        //   description: error.message,
        //   status: "error",
        // });
      }
    };

    getChatNotifList();

    if (
      window.Notification &&
      (Notification.permission === "granted" ||
        Notification.permission === "denied")
    )
      return;

    // eslint-disable-next-line
  }, [client /*, toast*/]);

  return { chatNotifList, totalUnread };
};

export const useAttendeList = () => {
  const { client, channel } = useChatContext();
  const [attendeeList, setAttendeeList] = useState<UserResponse[]>([]);

  useEffect(() => {
    const getAttendeeList = async () => {
      const response = await client.queryUsers(
        {
          role: "user",
        },
        { last_active: -1 },
        { presence: true }
      );

      setAttendeeList(response.users);
    };

    if (channel) {
      channel.watch();
      channel.on("user.presence.changed", getAttendeeList);
    }

    getAttendeeList();

    return () => {
      if (channel) {
        channel.off("user.presence.changed", () => console.log("remove event"));
      }
    };
    // eslint-disable-next-line
  }, []);

  return { attendeeList };
};
