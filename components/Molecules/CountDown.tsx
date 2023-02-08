import { useCountdown } from "@/hooks/useCountdown";
import { Box, Flex, Stack, StackDivider, Text } from "@chakra-ui/react";
import React, { FC } from "react";

const THREE_DAYS_IN_MS = new Date("2022-09-19T00:00:00.000+08:00").getTime();
const CountDown: FC = () => {
  const dateTimeAfterThreeDays = THREE_DAYS_IN_MS;
  const [days, hours, minutes, seconds] = useCountdown(dateTimeAfterThreeDays);

  return (
    <Box
      padding={{
        base: "20px 25px 6px 25px",
        sm: "20px 48px 6px 48px",
        "3xl": "24px 56px 8px 56px",
      }}
      background="brand.yellow"
      borderRadius="16px"
    >
      <Flex flexDir="column" gap={{ base: "27px", "3xl": "32px" }}>
        <Stack
          direction="row"
          spacing={{
            base: "10px",
            sm: "30px",
            xl: "35px",
            "2xl": "51px",
            "3xl": "55px",
          }}
          divider={<StackDivider borderColor="#393939" />}
        >
          <Flex flexDir="column" alignItems="center">
            <Text
              fontWeight="700"
              fontSize={{ base: "32px", xl: "44px", "3xl": "56px" }}
              color="#393939"
              lineHeight={{ base: "32px", xl: "44px", "3xl": "56px" }}
            >
              {days < 0 ? 0 : days}
            </Text>
            <Text
              fontWeight="400"
              fontSize={{ base: "12px", xl: "16px", "3xl": "20px" }}
              color="#393939"
            >
              Days
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Text
              fontWeight="700"
              fontSize={{ base: "32px", xl: "44px", "3xl": "56px" }}
              color="#393939"
              lineHeight={{ base: "32px", xl: "44px", "3xl": "56px" }}
            >
              {hours < 0 ? 0 : hours}
            </Text>
            <Text
              fontWeight="400"
              fontSize={{ base: "12px", xl: "16px", "3xl": "20px" }}
              color="#393939"
            >
              Hours
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Text
              fontWeight="700"
              fontSize={{ base: "32px", xl: "44px", "3xl": "56px" }}
              color="#393939"
              lineHeight={{ base: "32px", xl: "44px", "3xl": "56px" }}
            >
              {minutes < 0 ? 0 : minutes}
            </Text>
            <Text
              fontWeight="400"
              fontSize={{ base: "12px", xl: "16px", "3xl": "20px" }}
              color="#393939"
            >
              Minutes
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <Text
              fontWeight="700"
              fontSize={{ base: "32px", xl: "44px", "3xl": "56px" }}
              color="#393939"
              lineHeight={{ base: "32px", xl: "44px", "3xl": "56px" }}
            >
              {seconds < 0 ? 0 : seconds}
            </Text>
            <Text
              fontWeight="400"
              fontSize={{ base: "12px", xl: "16px", "3xl": "20px" }}
              color="#393939"
            >
              Seconds
            </Text>
          </Flex>
        </Stack>
        <Text
          fontWeight="700"
          fontSize={{ base: "16px", "3xl": "20px" }}
          lineHeight={{ base: "16px", "3xl": "20px" }}
          color="#00000"
          textAlign="center"
        >
          Until APCCA 2022 opens
        </Text>
      </Flex>
    </Box>
  );
};

export default CountDown;
