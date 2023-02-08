import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PopoverNotification from "@/components/Molecules/PopoverNotification";
import CameraIcon from "@/components/Atoms/Icons/CameraIcon";
import ModalsCustume from "@/components/Molecules/ModalsCustume";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { INotificationVideoCallResponse } from "@/types/agora";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(utc);
dayjs.extend(relativeTime);

interface VideoCallNotificationProps {
  data: INotificationVideoCallResponse[];
  loading: boolean;
  handleClick: ({
    notificationId,
    videoCallId,
  }: {
    notificationId: string;
    videoCallId: string;
  }) => void;
}

function VideoCallNotification({
  data,
  loading,
  handleClick,
}: VideoCallNotificationProps) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Box display={{ base: "none", md: "block" }}>
        <PopoverNotification
          totalNotif={data.length}
          title="Incoming Video Call"
          icons={CameraIcon}
        >
          {data.length === 0 && <Center pb="2rem">No notifications</Center>}
          {data.length > 0 && (
            <VideoCallNotifContent data={data} handleClick={handleClick} />
          )}
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
          mr="10px"
        >
          <CameraIcon w="25px" h="25px" />
          {!!data.length ? (
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
              {data.length > 9 ? "9+" : data.length}
            </Center>
          ) : (
            <></>
          )}
        </Button>
        <ModalsCustume
          title="Incoming Video Call"
          onToggle={onToggle}
          isOpen={isOpen}
        >
          {loading && (
            <Center h="100%" w="100%">
              <Spinner />
            </Center>
          )}

          {!loading && (
            <>
              <VideoCallNotifContent data={data} handleClick={handleClick} />
              <HStack
                px="2rem"
                color="#4D4D4D"
                justifyContent="space-between"
                w="100%"
              >
                <Button
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
                </Button>
              </HStack>
            </>
          )}
        </ModalsCustume>
      </Box>
    </>
  );
}

interface NotificationContent {
  data: INotificationVideoCallResponse[];
  handleClick: ({
    notificationId,
    videoCallId,
  }: {
    notificationId: string;
    videoCallId: string;
  }) => void;
}
const VideoCallNotifContent = ({ data, handleClick }: NotificationContent) => {
  return (
    <Box maxH="50vh" overflowY="auto">
      {data.map((item, index) => {
        return (
          <Flex
            key={index}
            p="10px 20px"
            gap={3}
            cursor="pointer"
            _hover={{ bg: "#eaeaea" }}
            onClick={() =>
              handleClick({
                notificationId: item.notificationId,
                videoCallId: item.videoCallId,
              })
            }
          >
            <Box bg="sienna" w="40px" h="40px" borderRadius="30%"></Box>
            <Box flex="1">
              <Heading fontSize="small" color="#4D4D4D">
                {item.senderName}
              </Heading>
              <Text fontSize=".8rem" fontWeight="500" color="#4D4D4D">
                {`${item.senderName} has been calling you. click to join the call`}
              </Text>
              <Text fontSize=".7rem" color="#757575" my="10px">
                {dayjs(item.timestamps).fromNow(true)}
              </Text>
            </Box>
            <Box bg="green.400" w="10px" h="10px" borderRadius="50%"></Box>
          </Flex>
        );
      })}
    </Box>
  );
};

export default VideoCallNotification;
