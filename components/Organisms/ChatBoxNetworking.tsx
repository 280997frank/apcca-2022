import { useMemo } from "react";
import { FC } from "react";
import { isNil } from "lodash";
import {
  Stack,
  Text,
  HStack,
  Box,
  Flex,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import {
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  Window,
  useChatContext,
  ChannelPreviewUIComponentProps,
  ChannelSearch,
  ChannelHeaderProps,
  useChannelStateContext,
  getDisplayTitle,
} from "stream-chat-react";
import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";
import "@stream-io/stream-chat-css/dist/css/index.css";
import NetworkingMessageInput from "../Atoms/NetworkingMessageInput";
import NetworkingMessage from "../Atoms/NetworkingMessage";
import { getGroupDisplayTitle, showTimeChannelPreview } from "@/utils";
import AvatarChat from "../Atoms/AvatarChat";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { RootState } from "@/states/store";
import { actions as chatAction } from "states/chat/slice";
import { ArrowBackIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";

const ChannelPreview: FC<
  ChannelPreviewUIComponentProps<DefaultStreamChatGenerics>
> = ({
  displayTitle,
  latestMessage,
  active,
  setActiveChannel,
  channel,
  watchers,
  lastMessage,
}) => {
  const dispatch = useDispatch();

  const onActiveChannel = () => {
    if (setActiveChannel) {
      setActiveChannel(channel, watchers);
      dispatch(chatAction.setOpen(true));
    }
  };

  const { client } = useChatContext();

  return (
    <HStack
      bgColor={active ? "#F1F1F1" : ""}
      p={2}
      cursor="pointer"
      borderBottom="1px solid #D7D7D7"
      onClick={onActiveChannel}
      w="100%"
    >
      <AvatarChat members={Object.values(channel.state.members)} />
      <Stack spacing={0} flex="1" w="50%">
        <Text fontSize="sm" fontWeight="bold" noOfLines={1}>
          {displayTitle || getGroupDisplayTitle(channel, client.user)}
        </Text>
        <Text fontSize="sm" noOfLines={1}>
          {latestMessage}
        </Text>
      </Stack>
      <Stack alignItems="flex-end" flex="1">
        {lastMessage && (
          <Text fontSize="sm">
            {showTimeChannelPreview(lastMessage.updated_at as Date)}
          </Text>
        )}
        {channel.countUnread() && (
          <Flex
            justifyContent="center"
            alignItems="center"
            w="20px"
            h="20px"
            rounded="full"
            bgColor="#FFDD00"
          >
            <Text fontSize="xs" color="#333">
              {channel.countUnread()}
            </Text>
          </Flex>
        )}
      </Stack>
    </HStack>
  );
};

const NetworkingChannelHeader: FC<ChannelHeaderProps> = ({ title }) => {
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();
  const dispatch = useDispatch();
  const [isMobile] = useMediaQuery("(max-width: 400px)");
  return (
    <HStack h="70px" bgColor="#fff" px="3">
      {isMobile && (
        <Button
          variant="ghost"
          p="0"
          onClick={() => dispatch(chatAction.setOpen(false))}
        >
          <ArrowBackIcon h={6} w={6} />
        </Button>
      )}
      <AvatarChat members={Object.values(channel.state.members)} />
      <Text fontWeight="bold" color="#333" noOfLines={1}>
        {title ||
          getDisplayTitle(channel, client.user) ||
          getGroupDisplayTitle(channel, client.user)}
      </Text>
    </HStack>
  );
};

const ChatBoxNetworking: FC = () => {
  const { client } = useChatContext();
  const id = useMemo(() => {
    return !isNil(client.userID) ? client.userID : "";
  }, [client]);
  const [isMobile] = useMediaQuery("(max-width: 400px)");
  const { isOpen } = useSelector(
    (state: RootState) => ({
      isOpen: state.chat.isOpen,
    }),
    shallowEqual
  );

  return (
    <Stack
      flexDirection={["column", "row"]}
      mt={5}
      sx={{
        ".str-chat__channel-search, .str-chat-channel-list .str-chat__channel-list-messenger":
          {
            bgColor: "transparent",
          },
        ".str-chat__channel-search input": {
          borderRadius: 5,
          bgColor: "#fff",
        },
        ".str-chat": {
          h: "60vh",
        },
        ".str-chat-channel-list .str-chat__channel-list-messenger": {
          h: "90%",
          overflow: "auto",
        },
        ".str-chat__channel-search": {
          p: 4,
          h: "10%",
        },
        ".str-chat__channel-search-container.inline": {
          w: "calc(100% - 15px)",
          top: "50px",
        },
        ".str-chat__date-separator": {
          justifyContent: "center",
          padding: "3",
        },
        ".str-chat__date-separator-line": {
          display: "none",
        },
        ".str-chat__li--middle .networking-msg-info, .str-chat__li--top .networking-msg-info":
          {
            display: "none",
          },
      }}
    >
      <Box
        w={["100%", "320px"]}
        hidden={isOpen && isMobile}
        sx={{
          "& > div": {
            width: "100%",
          },
        }}
      >
        <ChannelList
          filters={{
            type: "messaging",
            members: { $in: [id] },
          }}
          Preview={(previewProps) => <ChannelPreview {...previewProps} />}
          // List={(listProps) => <ChannelListContainer {...listProps} />}
          ChannelSearch={(channelSearchProps) => (
            <ChannelSearch {...channelSearchProps} />
          )}
          showChannelSearch
        />
      </Box>
      <Box w={["100%", "calc(100% - 320px)"]} hidden={!isOpen && isMobile}>
        <Channel>
          <Window>
            <NetworkingChannelHeader />
            <MessageList
              formatDate={(date) => dayjs(date).format("DD MMM YYYY")}
              Message={NetworkingMessage}
            />
            <MessageInput Input={NetworkingMessageInput} />
          </Window>
        </Channel>
      </Box>
    </Stack>
  );
};

export default ChatBoxNetworking;
