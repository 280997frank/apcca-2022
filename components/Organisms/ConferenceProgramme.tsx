// import kvBg from "@/assets/images/kv-background.png";
import BounceX from "@/components/Atoms/BounceX";
import DayTabList from "@/components/Molecules/DayTabList";
import {
  IConferenceWithAnimation,
  TConferenceProgrammeProps,
} from "@/types/conference";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/router";

import { getDefaultIndexDayTabs } from "@/utils";
import { getDisabledButton } from "@/hooks/conference-programme";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);

const CURRENT_TIME = dayjs().utc().format();

const ConferenceProgramme: TConferenceProgrammeProps = (props) => {
  const router = useRouter();

  const { data, onChangeTab } = props;
  const [conferenceData, setConferenceData] =
    useState<IConferenceWithAnimation[]>(data);

  useEffect(() => {
    if (data.length > 0) {
      const newData = data.map((item) => {
        const newObj = { ...item };
        return {
          ...newObj,
          isLive: item.isLive === "true" ? true : false,
        };
      });
      setConferenceData(newData);
    } else {
      setConferenceData(data);
    }
  }, [data]);

  const handleAnimation = (id: string, isShow: boolean) => {
    const result = [...conferenceData];
    const newData = result.map((item) => {
      const newItem = { ...item };
      if (newItem.id === id) {
        newItem.showAnimation = isShow;
      }
      return newItem;
    });

    setConferenceData(newData);
  };

  const SGTimezone = (date: string) => {
    return dayjs(date).tz("Asia/Singapore").format("hh.mm");
  };

  return (
    <Box
      // backgroundImage={{
      //   lg: kvBg.src,
      // }}
      // backgroundPosition="bottom right"
      // backgroundRepeat="no-repeat"
      // backgroundSize="cover"
      height={{ base: "88vh", lg: "100%" }}
      overflowY={{ base: "scroll", lg: "unset" }}
      // px={{ base: 6, lg: "unset" }}
    >
      <Tabs
        align="center"
        height="100%"
        overflowY={{ lg: "scroll" }}
        pb="120px"
        defaultIndex={getDefaultIndexDayTabs()}
      >
        <DayTabList onChangeTab={onChangeTab} />
        <TabPanels pos="relative" pb={{ base: 0, lg: 10, xl: 0 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <TabPanel key={i} px={{ base: "unset", lg: 6 }} py={6}>
              <Flex flexDir="column" alignItems="flex-start" gridGap={8}>
                {conferenceData.map((item, indexData) => {
                  const isDisabled = getDisabledButton(
                    indexData,
                    CURRENT_TIME,
                    item?.startAt,
                    item?.endAt
                  );

                  return (
                    <Flex
                      key={indexData}
                      gridGap={8}
                      bgColor="white"
                      p={6}
                      borderRadius={8}
                      flexDir={{ base: "column", lg: "row" }}
                      position="relative"
                    >
                      {item.isLive && (
                        <Flex
                          justifyContent="center"
                          alignItems="center"
                          bgColor="brand.red"
                          color="white"
                          width="100px"
                          height="40px"
                          borderRadius={8}
                          textAlign="center"
                          position="absolute"
                          right={{ base: 6, lg: 2 }}
                          top={{ base: 3, lg: 2 }}
                        >
                          <Flex alignItems="center" gridGap={1}>
                            <Box
                              width="8px"
                              height="8px"
                              bgColor="white"
                              borderRadius="full"
                              mb="3px"
                            />
                            <Text lineHeight="18px" fontWeight="bold">
                              LIVE
                            </Text>
                          </Flex>
                        </Flex>
                      )}
                      <Flex
                        flexDir="column"
                        gridGap={3}
                        mt={{ base: 10, lg: 0 }}
                      >
                        {item.thumbnail === "" ? (
                          <Box
                            bgColor="#D9D9D9"
                            width={{ base: "100%", lg: "320px" }}
                            height="220px"
                          />
                        ) : (
                          <Image
                            src={item.thumbnail}
                            alt="thumbnail"
                            maxWidth={{ base: "100%", lg: "320px" }}
                            height="auto"
                          />
                        )}
                        <Button
                          textTransform="uppercase"
                          border="1.5px solid black"
                          borderRadius="10px"
                          bgColor="transparent"
                          fontWeight="600"
                          fontSize="1rem"
                          size="lg"
                          width="100%"
                          rightIcon={
                            item.showAnimation ? (
                              <BsArrowRight fontSize="25px" />
                            ) : undefined
                          }
                          onMouseEnter={() => handleAnimation(item.id, true)}
                          onMouseLeave={() => handleAnimation(item.id, false)}
                          onClick={() => {
                            router.push("/auditorium");
                          }}
                          disabled={isDisabled}
                        >
                          <BounceX showAnimation={item.showAnimation}>
                            <Text>GO TO EVENT</Text>
                          </BounceX>
                        </Button>
                      </Flex>
                      <Flex
                        flexDir="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        position="relative"
                        textAlign="left"
                      >
                        <Text
                          mb={3}
                          fontWeight={{ base: "medium" }}
                          fontSize={{ base: "24px", lg: "19px" }}
                        >
                          {SGTimezone(item.startAt)} - {SGTimezone(item.endAt)}{" "}
                          (GMT +8)
                        </Text>
                        <Heading
                          as="h2"
                          mb={3}
                          fontWeight={{ base: "semibold" }}
                          fontSize={{ base: "24px", lg: "28px" }}
                        >
                          {item.title}
                        </Heading>
                        <Text
                          textAlign="justify"
                          mb={4}
                          fontSize={{ base: "16px", lg: "19px" }}
                          fontWeight={{ base: "normal" }}
                        >
                          {item.descriptionOne}
                        </Text>
                        <Text
                          textAlign="justify"
                          fontSize={{ base: "16px", lg: "19px" }}
                          lineHeight={{ lg: "28px" }}
                          fontWeight="semibold"
                          dangerouslySetInnerHTML={{
                            __html: item.descriptionTwo,
                          }}
                        />
                      </Flex>
                    </Flex>
                  );
                })}
              </Flex>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ConferenceProgramme;
