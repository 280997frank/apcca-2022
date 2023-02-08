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
import ChatMessage from "@/components/Atoms/ChatMessage";
import { useChannel } from "@/hooks/chat";

interface Props {
  channelName: string;
}

const LiveChat: FC<Props> = ({ channelName }) => {
  const channel = useChannel("livestream", channelName);

  if (!channel) return null;

  return (
    <Box
      h="100%"
      sx={{
        ".str-chat-channel": {
          maxH: "100%",
        },
        ".str-chat": {
          height: "500px",
          width: "100%",
        },
        "@media (min-width: 62em)": {
          ".str-chat": {
            height: "100%",
            width: "100%",
          },
        },
        p: {
          fontFamily: "Roboto",
          color: "#4D4D4D",
        },
        textarea: {
          fontFamily: "Roboto",
        },
      }}
      bgColor="#FAFAFA"
    >
      <Channel channel={channel}>
        <Window hideOnThread>
          <MessageList Message={ChatMessage} />
          <MessageInput Input={CustomMessageInput} />
        </Window>
        <Thread />
      </Channel>
    </Box>
  );
};

export default LiveChat;
