import useChatDispatch from "@/states/chat/dispatch";
import { Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";
// import { useChatNotifList } from "@/hooks/chat";

const TotalNotifMsg: FC = () => {
  // const { chatNotifList } = useChatNotifList();
  const { chatNotifList } = useChatDispatch();

  // console.log("total un read", totalUnRead, chatNotifList);
  // const set = new Set();
  // const uniqueChatNotifList = chatNotifList.filter((item) => {
  //   const alreadyHas = set.has(item.idMsg);
  //   set.add(item.idMsg);

  //   return !alreadyHas;
  // });
  if (chatNotifList.length < 1) return null;
  return (
    <Flex
      borderRadius="50%"
      width={{ base: "30px", lg: "35px" }}
      height="25px"
      backgroundColor="#DA2229"
      justifyContent="center"
      alignItems="center"
      mr={{ base: 3, lg: 1 }}
    >
      <Text textAlign="center" color="white" fontSize="12px">
        {chatNotifList.length > 9 ? "9+" : chatNotifList.length}
      </Text>
    </Flex>
  );
};

export default TotalNotifMsg;
