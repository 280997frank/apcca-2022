import { useEffect, useState, FC, ReactNode } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { useToast } from "@chakra-ui/react";
import { IUser } from "@/types/chat";

interface Props {
  children: ReactNode;
  data: {
    token: string;
    user: IUser;
  };
}

const ChatProvider: FC<Props> = ({ children, data }) => {
  const [client, setClient] = useState<StreamChat | null>(null);
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

    connectUser();

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
    // eslint-disable-next-line
  }, []);

  if (!client) return null;

  return (
    <Chat theme="livestream" client={client}>
      {children}
    </Chat>
  );
};

export default ChatProvider;
