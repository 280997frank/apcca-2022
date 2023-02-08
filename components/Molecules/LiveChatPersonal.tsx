/* eslint-disable react/no-children-prop */
import { FC } from "react";
import { Box } from "@chakra-ui/react";
import {
  Channel,
  MessageList,
  Thread,
  Window,
  MessageInput,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import CustomMessageInput from "@/components/Atoms/CustomMessageInput";
// import ChatMessage from "@/components/Atoms/ChatMessage";
import { useChannelPersonal } from "@/hooks/chat";
import ChatMessagePersonalChat from "@/components/Atoms/ChatMessagePersonalChat";

interface Props {
  idAttendee: string;
}

const LiveChatPersonal: FC<Props> = ({ idAttendee }) => {
  const channel = useChannelPersonal(idAttendee);

  if (!channel) return null;

  return (
    <Box
      h="100%"
      sx={{
        ".str-chat-channel": {
          maxH: "100%",
        },
        ".str-chat": {
          height: "100%",
          width: "100%",
        },
        ".str-chat__ul": {
          display: "flex",
          flexDirection: "column",
        },
        p: {
          fontFamily: "Roboto",
          color: "#4D4D4D",
        },
        textarea: {
          fontFamily: "Roboto",
        },
      }}
      bgColor="white"
    >
      <Channel channel={channel}>
        <Window hideOnThread>
          <MessageList Message={ChatMessagePersonalChat} />
          <MessageInput Input={CustomMessageInput} />
        </Window>
        <Thread />
      </Channel>
    </Box>
  );
};

export default LiveChatPersonal;
