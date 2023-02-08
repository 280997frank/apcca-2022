import React, { FC, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Text,
  Stack,
  AspectRatio,
  Icon,
  useMediaQuery,
  Avatar,
} from "@chakra-ui/react";

import { IoMdChatboxes, IoMdVideocam } from "react-icons/io";
import { BsCircleFill } from "react-icons/bs";
import ChatProvider from "@/components/Organisms/ChatProvider";
import { useChatToken } from "@/hooks/chat";
import LiveChatPersonal from "@/components/Molecules/LiveChatPersonal";
import { useGetUserById } from "@/hooks/auth";

interface Tprops {
  isOpen: boolean;
  onClose: () => void;
  dataAttendee: {
    id: string;
  };
}
const ChatBoxNetworking: FC<Tprops> = ({ isOpen, onClose, dataAttendee }) => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 48em) and (orientation: landscape)"
  );
  const { getUserById, data: dataUserById } = useGetUserById();

  const { data } = useChatToken();
  useEffect(() => {
    if (isOpen && dataAttendee.id !== "") {
      getUserById({
        variables: {
          getUserByIdInput: {
            id: dataAttendee.id,
          },
        },
      });
    }
  }, [isOpen, dataAttendee.id, getUserById]);
  // console.log("dataUserById", dataUserById);
  if (!data) return null;
  // if (!isOpen) return null;
  return (
    <Drawer
      onClose={onClose}
      isOpen={isOpen && dataUserById !== undefined}
      size={{
        base: "",
        lg: "md",
      }}
      placement={isDesktop ? "right" : "bottom"}
    >
      <DrawerOverlay
        display={{
          base: "none",
          lg: "block",
        }}
      />
      <DrawerContent
        height={{
          base: "calc(100% - 101px)",
          lg: "100%",
        }}
      >
        <DrawerCloseButton />
        <DrawerBody p="0px">
          <Stack dir="Column" w={"100%"} height="100%" spacing={1}>
            <Stack
              height={{
                base: "45%",
                lg: "40%",
              }}
              w="100%"
              direction="column"
              align="center"
              justifyContent="center"
              lineHeight="normal"
              // pt="20px"
            >
              <Stack position="relative" height="auto" align="center" w="30%">
                <AspectRatio ratio={4 / 4} w="80%">
                  <Avatar
                    src={dataUserById?.getUserById.profilePicture}
                    borderRadius="3rem"
                  />
                </AspectRatio>
                <Icon
                  as={BsCircleFill}
                  position="absolute"
                  right={"0%"}
                  bottom="0%"
                  fill={dataUserById?.getUserById.isOnline ? "#06FDD0" : "red"}
                  boxSize="1.7rem"
                />
              </Stack>

              <Text fontWeight={700} fontSize="1.2rem" pt="1rem">
                {dataUserById?.getUserById.firstName +
                  " " +
                  dataUserById?.getUserById.lastName}
              </Text>
              <Text fontSize="1rem">
                {dataUserById?.getUserById.jurisdiction
                  ? dataUserById?.getUserById.jurisdiction.country
                  : "-"}
              </Text>
              <Text fontSize="1rem">
                [
                {dataUserById?.getUserById.orgUnit
                  ? dataUserById?.getUserById.orgUnit
                  : "-"}
                ]
              </Text>

              <Stack direction={"row"} pt="0rem" align="center" spacing={5}>
                <Icon as={IoMdChatboxes} boxSize="1.5rem" cursor={"pointer"} />
                <Icon as={IoMdVideocam} boxSize="1.5rem" cursor={"pointer"} />
              </Stack>
            </Stack>
            <Box flex="1" overflowY="auto">
              <ChatProvider data={data}>
                <LiveChatPersonal idAttendee={dataAttendee.id} />
              </ChatProvider>
            </Box>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatBoxNetworking;
