import React from "react";
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  ButtonProps,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PopoverNotification from "@/components/Molecules/PopoverNotification";
import ChatBoxes from "@/components/Atoms/Icons/ChatBoxes";
import ModalsCustume from "@/components/Molecules/ModalsCustume";
// import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { TMsgNotif } from "@/hooks/chat";
import useChatDispatch from "@/states/chat/dispatch";
// import ChatProvider from "@/components/Organisms/ChatProvider";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(relativeTime);

// interface TMsgNotif {
//   id: string;
// }
interface IMessageNotif extends ButtonProps {
  onClose?: () => void;
  handleChat: (param: TMsgNotif) => void;
}

function MessageNotification({ onClose, handleChat, ...rest }: IMessageNotif) {
  const { isOpen, onToggle } = useDisclosure();
  const { chatNotifList } = useChatDispatch();
  // const { data } = useChatToken();

  // const { chatNotifList } = useChatNotifList();
  // console.log("total un read", totalUnRead, chatNotifList);
  // const set = new Set();
  // const uniqueChatNotifList = chatNotifList.filter((item) => {
  //   const alreadyHas = set.has(item.idMsg);
  //   set.add(item.idMsg);

  //   return !alreadyHas;
  // });
  const sortedDescNotifList = [...chatNotifList].sort((objA, objB) => {
    const B = new Date(objB.timestamp);
    const A = new Date(objA.timestamp);
    return Number(B) - Number(A);
  });

  const toggleOffForHandleChat = (params: TMsgNotif) => {
    handleChat(params);
    onToggle();
  };

  // if (!data) return null;
  return (
    <>
      {/* <ChatProvider data={data}> */}
      <Box display={{ base: "none", md: "block" }}>
        <PopoverNotification
          totalNotif={sortedDescNotifList.length}
          title="Incoming Message"
          onClose={onClose}
          icons={ChatBoxes}
          {...rest}
        >
          <Box maxH="400px" w="auto" overflowY="auto">
            <MessageContent
              sortedDescNotifList={sortedDescNotifList}
              handleChat={toggleOffForHandleChat}
            />
          </Box>
        </PopoverNotification>
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <Button
          p="0"
          pos="relative"
          variant="unstyled"
          _focus={{ outline: "none" }}
          _hover={{}}
          onClick={onToggle}
          // mr="10px"
        >
          <ChatBoxes w="2.2rem" h="2.2rem" />
          {!!sortedDescNotifList.length ? (
            <Center
              pos="absolute"
              transform="translate(21px, -11px)"
              as="span"
              h="15px"
              w="15px"
              lineHeight="15px"
              fontSize=".5rem"
              bg="red"
              color="white"
              p="5px"
              borderRadius="100%"
            >
              {sortedDescNotifList.length > 9
                ? "9+"
                : sortedDescNotifList.length}
            </Center>
          ) : (
            <></>
          )}
        </Button>
        <ModalsCustume
          title="Incoming Message"
          onToggle={onToggle}
          isOpen={isOpen}
        >
          <MessageContent
            sortedDescNotifList={sortedDescNotifList}
            handleChat={toggleOffForHandleChat}
          />
          <HStack color="#4D4D4D" justifyContent="space-between" w="100%">
            {/* <Button
                variant="unstyled"
                fontSize=".8rem"
                _focus={{ outline: "none" }}
              >
                <ChevronLeftIcon />
                Prev{" "}
              </Button>
              <Button
                variant="unstyled"
                fontSize=".8rem"
                _focus={{ outline: "none" }}
              >
                Next <ChevronRightIcon />
              </Button> */}
          </HStack>
        </ModalsCustume>
      </Box>
      {/* </ChatProvider> */}
    </>
  );
}

type TMessageContent = {
  sortedDescNotifList: any[];
  handleChat: (param: TMsgNotif) => void;
};

const MessageContent = ({
  handleChat,
  sortedDescNotifList,
}: TMessageContent) => {
  // console.log("unique", uniqueChatNotifList);
  return (
    <>
      {sortedDescNotifList.map((item, i) => {
        return (
          <Flex
            key={i}
            p="10px 20px"
            gap={3}
            cursor="pointer"
            _hover={{ bg: "#eaeaea" }}
            w="inherit"
            overflowX="hidden"
            onClick={() => handleChat(item)}
          >
            {/* <Box bg="sienna" w="40px" h="40px" borderRadius="30%"></Box> */}
            <AspectRatio ratio={4 / 4} w="10%" h="10%">
              <Avatar src={item.image} borderRadius="40%" />
            </AspectRatio>
            <Box flex="1" w="inherit">
              <Heading fontSize="small" color="#4D4D4D">
                {item.name}
              </Heading>
              <Box
                fontSize=".8rem"
                fontWeight="500"
                overflow="hidden"
                color="#4D4D4D"
                dangerouslySetInnerHTML={{ __html: item.msg }}
              ></Box>
              {/* <Text
                fontSize=".8rem"
                fontWeight="500"
                overflow="hidden"
                color="#4D4D4D"
              >
                {item.notifications?.noticeboard?.description}
                {item.msg}
              </Text> */}
              <Text fontSize=".7rem" color="#757575" my="10px">
                {/* 13 minutes ago */}
                {/* {item.timestamp} */}
                {dayjs(item.timestamp).fromNow()}
              </Text>
            </Box>
            <Box bg="green.400" w="10px" h="10px" borderRadius="50%"></Box>
          </Flex>
        );
      })}
    </>
  );
};

export default MessageNotification;
