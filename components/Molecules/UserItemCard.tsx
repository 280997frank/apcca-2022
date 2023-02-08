import {
  Avatar,
  AvatarBadge,
  // Flex,
  Heading,
  HStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  Stack,
  Box,
  Checkbox,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import ChatBoxes from "@/components/Atoms/Icons/ChatBoxes";
// import CameraIcon from "@/components/Atoms/Icons/CameraIcon";
import { IAttendees } from "@/types/networking";

interface IUserItemCard {
  // name: string;
  // jurisdiction: string;
  // organisation: string;
  // isOnline: boolean;
  // imageUrl: string;
  isLoading?: boolean;
  data: IAttendees;
  handleChat: (userId: string) => void;
  handleVideoCall: (channelName: string) => void;
  showCheckbox: boolean;
  onCheck: (id: string) => void;
  onUnCheck: (id: string) => void;
}

function UserItemCard({
  data,
  isLoading = true,
  handleChat,
  // handleVideoCall,
  showCheckbox,
  onCheck,
  onUnCheck,
}: IUserItemCard) {
  const {
    firstName,
    lastName,
    jurisdiction,
    orgUnit,
    isOnline,
    profilePicture,
    id,
  } = data;

  const [isChecked, setChecked] = useState(false);

  return (
    <Stack
      bg={isChecked ? "#FFFAE0" : "white"}
      border={isChecked ? "2px solid #FFDD00" : "2px solid #FFF"}
      p={5}
      borderRadius="16px"
      spacing={3}
    >
      <HStack gap={3}>
        {showCheckbox && (
          <Box>
            <Checkbox
              sx={{
                "[data-checked], [data-checked]:hover": {
                  bgColor: "#222",
                  borderColor: "#222",
                },
              }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // console.log(e);
                if (e.target.checked) {
                  onCheck(id);
                  setChecked(true);
                } else {
                  onUnCheck(id);
                  setChecked(false);
                }
              }}
            />
          </Box>
        )}
        <SkeletonCircle borderRadius="20px" size="5rem" isLoaded={isLoading}>
          <Avatar
            boxSize="5rem"
            alignItems="top"
            borderRadius="8px"
            src={profilePicture}
          >
            <AvatarBadge
              border="none"
              w="20px"
              bottom="5px"
              right="5px"
              h="20px"
              bg={
                isOnline
                  ? "linear-gradient(75.96deg, #45FA8D 0%, #06FDD0 100%)"
                  : "#D7D7D7"
              }
            />
          </Avatar>
        </SkeletonCircle>
        <SkeletonText flex="1" isLoaded={isLoading}>
          <Stack gap="5px">
            <Heading size="sm" lineHeight="1.7rem">
              {`${firstName} ${lastName}`}
            </Heading>
            <Text lineHeight="0" fontSize=".8rem">
              {jurisdiction ? jurisdiction.country : "-"}
            </Text>
            <Text fontSize=".8rem">{orgUnit}</Text>
          </Stack>
        </SkeletonText>
        {!showCheckbox && (
          <Box>
            <ChatBoxes
              cursor="pointer"
              w="25px"
              h="25px"
              onClick={() => handleChat(data.id)}
            />
          </Box>
        )}
      </HStack>
      {/* <Flex justifyContent="space-around" gap="15px">
        <ChatBoxes
          cursor="pointer"
          w="25px"
          h="25px"
          onClick={() => handleChat(data)}
        />
        <CameraIcon
          cursor="pointer"
          w="25px"
          h="25px"
          onClick={() => handleVideoCall(id)}
        />
      </Flex> */}
    </Stack>
  );
}

export default UserItemCard;
