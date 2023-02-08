import { FC } from "react";
import dayjs from "dayjs";
import { /*Flex,*/ HStack, Stack, Text } from "@chakra-ui/react";
import {
  useMessageContext,
  // Avatar,
  Attachment,
  useUserRole,
} from "stream-chat-react";

const ChatMessagePersonalChat: FC = () => {
  const { message } = useMessageContext();
  const { isAdmin, isMyMessage } = useUserRole(message);

  return (
    <HStack
      bgColor={isMyMessage ? "#FFFAE0" : "#EFF3F6"}
      rounded="lg"
      mx="2"
      my="2"
      p="4"
      width="70%"
      float={isMyMessage ? "right" : "left"}
    >
      {/* <Flex alignSelf="start">
        <Avatar name={message.user?.name} image={message.user?.image} />
      </Flex> */}
      <Stack flex="1" spacing={1}>
        <HStack>
          {isAdmin && (
            <Text
              color="#B8A880"
              border="2px solid #FFDD00"
              size="sm"
              fontWeight="bold"
              textTransform="uppercase"
              px="1"
              rounded="md"
            >
              ADMIN
            </Text>
          )}
          <Text size="sm" fontWeight="bold">
            {message.user?.name}
          </Text>
        </HStack>
        <Text wordBreak="break-word" size="sm">
          {message.text}
        </Text>
        {message.attachments && (
          <Attachment attachments={message.attachments} />
        )}
      </Stack>
      <Text alignSelf="end" color="#757575">
        {dayjs(message.created_at).format("HH.mm")}
      </Text>
    </HStack>
  );
};

export default ChatMessagePersonalChat;
