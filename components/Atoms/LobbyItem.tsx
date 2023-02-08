import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

interface LobbyItemProps {
  startAt: string;
  title: string;
}

dayjs.extend(utc);
dayjs.extend(tz);

export default function LobbyItem({ startAt, title }: LobbyItemProps) {
  return (
    <Flex flexDir="column" zIndex={100}>
      <Text as="time" dateTime={startAt} px={2} pt={2} fontSize="1rem">
        {dayjs(startAt).tz("Asia/Singapore").format("HH.mm")} (GMT +8)
      </Text>
      <Text px={2} fontSize="1rem" p={2} textAlign="left" fontWeight="bold">
        {title}
      </Text>
    </Flex>
  );
}
