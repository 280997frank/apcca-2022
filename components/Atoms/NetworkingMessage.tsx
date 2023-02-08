import React from "react";
import dayjs from "dayjs";
import { Stack, Text } from "@chakra-ui/react";
import {
  useMessageContext,
  Attachment,
  MessageContextValue,
  areMessageUIPropsEqual,
  MessageUIComponentProps,
} from "stream-chat-react";
import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";

type NetworkingMessageWithContextProps<
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics
> = MessageContextValue<StreamChatGenerics>;

const NetworkingMessageWithContext = <
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics
>(
  props: NetworkingMessageWithContextProps<StreamChatGenerics>
) => {
  const { isMyMessage, message } = props;

  return (
    <Stack
      sx={{
        ".msg-timestamp": {
          fontSize: "xs",
        },
      }}
      mx="2"
      my="2"
      alignItems={isMyMessage() ? "flex-end" : "flex-start"}
      key={message.id}
    >
      <Stack
        maxW="80%"
        bgColor={isMyMessage() ? "#FFFAE0" : "#4D4D4D"}
        rounded="lg"
        p="1"
        px={2}
      >
        <Text
          color={isMyMessage() ? "#333" : "#FFF"}
          wordBreak="break-word"
          size="sm"
        >
          {message.text}
        </Text>
        {message.attachments && (
          <Attachment attachments={message.attachments} />
        )}
      </Stack>

      <Stack spacing={0} className="networking-msg-info">
        {!isMyMessage() && message.user ? (
          <Text fontSize="xs" fontWeight="bold" color="#333">
            {message.user?.name}
          </Text>
        ) : null}
        <Text fontSize="xs" color="#333">
          {dayjs(message.updated_at).format("h:mma")}
        </Text>
      </Stack>
    </Stack>
  );
};

const MemoizedNetworkingMessage = React.memo(
  NetworkingMessageWithContext,
  areMessageUIPropsEqual
) as typeof NetworkingMessageWithContext;

/**
 * The default UI component that renders a message and receives functionality and logic from the MessageContext.
 */
const NetworkingMessage = <
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics
>(
  props: MessageUIComponentProps<StreamChatGenerics>
) => {
  const messageContext =
    useMessageContext<StreamChatGenerics>("NetworkingMessage");

  return <MemoizedNetworkingMessage {...messageContext} {...props} />;
};

export default NetworkingMessage;
