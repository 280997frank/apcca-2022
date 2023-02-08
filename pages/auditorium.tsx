/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import { AspectRatio, Box, Button, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import ContentAuditorium from "@/components/Molecules/ContentAuditorium";
import TabsAuditoriumMobile from "@/components/Organisms/TabsAuditoriumMobile";
import ChatBoxAuditorium from "@/components/Organisms/ChatBoxAuditorium";
import Layout from "@/components/Templates/Layout";

import kvBg from "@/assets/images/kv-background.png";

import { useGetConference, useGetConferences } from "@/hooks/conference";
import { IGetConference } from "@/types/conference-resource";
import APCCAAndSPSIcons from "@/components/Atoms/APCCAAndSPSIcons";

dayjs.extend(utc);
dayjs.extend(timezone);

const CURRENT_TIME = dayjs().utc().format();

const Auditorium: FC = () => {
  const { getConferences, data: dataConferences } = useGetConferences();
  const { getConference, data: dataConference } = useGetConference();

  // state
  const [data, setData] = useState<IGetConference | undefined>();
  const [filteredData, setFilteredData] = useState<
    IGetConference[] | undefined
  >([]);

  // lifecycle
  useEffect(() => {
    getConference({
      variables: {
        getConferenceInput: {
          currentTime: CURRENT_TIME,
        },
      },
    });

    getConferences({
      variables: {
        getConferencesInput: {
          currentTime: CURRENT_TIME,
        },
      },
    });
  }, [getConferences]);

  useEffect(() => {
    setData(dataConference?.getConference);
  }, [dataConference]);

  useEffect(() => {
    if (data) {
      setFilteredData(
        dataConferences?.getConferences?.filter(
          (conference) => conference.id !== data?.id
        )
      );
    }
  }, [dataConferences, data]);

  return (
    <Layout title="Live Session" isPrivate>
      <Box
        backgroundImage={{
          lg: kvBg.src,
        }}
        backgroundPosition="bottom right"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        overflow="scroll"
        h="100vh"
      >
        <Flex
          flexDir={{ base: "column", md: "row" }}
          alignItems="center"
          my={{
            base: "20px",
            lg: "40px",
          }}
          gap="36px"
          p={{ base: "20px", xl: "20px 30px" }}
        >
          <Text
            fontWeight="700"
            fontSize={{ base: "16px", md: "32px" }}
            lineHeight="normal"
            color="#222222"
            flex="1"
          >
            Live Session
          </Text>
          <APCCAAndSPSIcons />
        </Flex>

        <Flex gap="40px" px={{ base: "0rem", lg: "10px", xl: "30px" }}>
          <Box
            width={{ base: "100%", lg: "60%", xl: "67%" }}
            pb="1.25rem"
            pl="2px"
          >
            <Flex flexDir="column">
              {filteredData?.map((conference) => (
                <Box
                  key={conference.id}
                  background="#FFFAE0"
                  borderRadius={{ base: "0rem", lg: "1rem" }}
                  p="8px 1rem"
                  width="100%"
                  mb="0.625rem"
                >
                  <Flex
                    flexDir={{ base: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={{ base: "1rem", lg: "0rem" }}
                  >
                    <Text
                      fontWeight="400"
                      fontSize={{ base: "0.75rem", lg: "1rem" }}
                      lineHeight={{ base: "0.875rem", lg: "1.1875rem" }}
                      color="#000000"
                    >
                      To participate in {conference.title}, please join by
                      clicking the button
                    </Text>
                    <Button
                      variant="outline"
                      border="1px solid #333333"
                      borderColor="#333333"
                      outline="none"
                      borderRadius="1rem"
                      fontWeight="400"
                      fontSize="0.75rem"
                      lineHeight="0.875rem"
                      textTransform="uppercase"
                      color="#333333"
                      px={{ base: "4.125rem", lg: "1.25rem" }}
                      onClick={() => {
                        if (conference.type === "ZOOM") {
                          window.open(conference.url, "_blank");
                        } else {
                          setData(conference);
                        }
                      }}
                      _hover={{}}
                      _focus={{}}
                      _active={{}}
                    >
                      join the meeting
                    </Button>
                  </Flex>
                </Box>
              ))}

              <AspectRatio
                ratio={16 / 9}
                display="flex"
                alignItems="center"
                justifyContent="center"
                alignContent="center"
                width="100%"
              >
                <iframe
                  src={data?.url || data?.placeholderVideo}
                  width="1920"
                  height="1080"
                  title="Live Stream"
                ></iframe>
              </AspectRatio>

              <Box h="24px" />

              <Box display={{ base: "block", lg: "none" }}>
                <TabsAuditoriumMobile
                  title={data?.title}
                  startAt={data?.startAt}
                  endAt={data?.endAt}
                  speakers={data?.speakers}
                  description={data?.descriptionOne}
                  urlSlido={data?.slidoUrl}
                />
              </Box>
              <Box display={{ base: "none", lg: "block" }}>
                <ContentAuditorium
                  title={data?.title}
                  startAt={data?.startAt}
                  endAt={data?.endAt}
                  speakers={data?.speakers}
                  description={data?.descriptionOne}
                />
              </Box>
            </Flex>
          </Box>
          <Box
            w={{ lg: "30%", xl: "23%" }}
            display={{ base: "none", lg: "block" }}
            pos="absolute"
            top={{ lg: "170px", xl: "190px" }}
            right={{ lg: "10px", xl: "25px" }}
          >
            <ChatBoxAuditorium urlSlido={data?.slidoUrl} />
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
};

export default Auditorium;
