import { useRef, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  Img,
  Stack,
  Text,
  Spinner,
  Center,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { BsCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import isBetween from "dayjs/plugin/isBetween";

import apcca40thLogoPng from "@/assets/images/apcca-40th-logo.png";
import apcca40thLogoWebp from "@/assets/images/apcca-40th-logo.webp";
import desktopLandingPng from "@/assets/images/landing-desktop-bg.png";
import mobileLandingPng from "@/assets/images/landing-mobile-bg.png";

import LobbyItem from "@/components/Atoms/LobbyItem";
import ChatBoxHome from "@/components/Organisms/ChatBoxHome";
import Layout from "@/components/Templates/Layout";

import { useWindowSize } from "@/hooks";
import { useGetConferenceByDate } from "@/hooks/conference-programme";

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(isBetween);

export default function LobbyPage() {
  const router = useRouter();
  const desktopLeftHandSideRef = useRef<HTMLDivElement>(null);
  const { height } = useWindowSize();
  const { fetchConferenceByDate, data, loading } = useGetConferenceByDate();
  const isBefore19Sept2022 = useMemo(
    () => dayjs().tz("Asia/Singapore").isBefore("2022-09-19", "day"),
    []
  );

  useEffect(() => {
    fetchConferenceByDate({
      variables: {
        getConferenceByDateInput: {
          date: isBefore19Sept2022
            ? "2022-09-19"
            : dayjs().tz("Asia/Singapore").format("YYYY-MM-DD"),
        },
      },
    });
  }, [isBefore19Sept2022, fetchConferenceByDate]);

  return (
    <Layout title="Home" isPrivate>
      <Box
        overflow="auto"
        as="article"
        bgPosition="bottom"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        h={{ base: "100%", md: "100%", lg: "100%" }}
        bgImage={{ base: mobileLandingPng.src, lg: desktopLandingPng.src }}
      >
        <Flex
          as="header"
          justifyContent="space-between"
          alignItems="center"
          px={8}
          py={8}
          display={{ base: "flex", lg: "none" }}
          sx={{
            "@media (orientation: portrait) and (min-width: 62em)": {
              display: "flex",
            },
          }}
        ></Flex>
        <Stack
          pl={{ base: 0, lg: 10 }}
          direction={{ base: "column", lg: "row" }}
          // justifyContent={{ lg: "center" }}
          pt={{ lg: "2%", "2xl": "4%" }}
          pb={{ lg: 4 }}
          h={{ lg: height }}
          sx={{
            "@media (orientation: portrait) and (min-width: 62em)": {
              h: "auto",
              flexDir: "column",
            },
          }}
        >
          <Box
            ref={desktopLeftHandSideRef}
            h={{ lg: "fit-content" }}
            w={{ base: "100vw", lg: "50vw" }}
          >
            <Box mb={4} w="100%">
              <picture>
                <source srcSet={apcca40thLogoWebp.src} type="media/webp" />
                <Flex justifyContent="center">
                  <Img
                    src={apcca40thLogoPng.src}
                    w="50%"
                    // htmlHeight={apcca40thLogoPng.height}
                    alt="40th APCCA 2022: 19-23 September 2022"
                    // maxH={{ lg: "20rem", "2xl": "unset" }}
                    // w="auto"
                  />
                </Flex>
              </picture>
            </Box>
            <Box textAlign="center" my={{ base: 8, lg: 0 }}>
              <Text
                fontSize={{ base: "1.25rem", lg: "2.5rem" }}
                fontWeight="700"
              >
                WELCOME TO APCCA 2022
              </Text>
            </Box>
            <Box
              pos="relative"
              mx={{ base: 5, md: 10, lg: 0 }}
              mb={10}
              pb={5}
              className="tutorial-2"
            >
              <Box
                pos="absolute"
                bgColor="#FFF"
                w="100%"
                h="100%"
                opacity="0.5"
                borderRadius="10px"
              />
              <Flex flexDir="column" mt={6}>
                <Flex
                  justifyContent="center"
                  zIndex={100}
                  pt={{ base: 5, lg: 2 }}
                >
                  <Text fontSize="2.5rem" fontWeight="700" textAlign="center">
                    {isBefore19Sept2022
                      ? "19 September 2022"
                      : dayjs().tz("Asia/Singapore").format("DD MMMM YYYY")}
                  </Text>
                </Flex>
                {loading && (
                  <Center my={8}>
                    <Spinner size="xl" />
                  </Center>
                )}
                <SimpleGrid columns={{ base: 1, lg: 2 }} px={5} gap={5} pt={2}>
                  {data &&
                    data.getConferenceByDate.map(
                      ({ id, startAt, endAt, title }) => {
                        if (
                          dayjs()
                            .tz("Asia/Singapore")
                            .isBetween(
                              dayjs(startAt),
                              dayjs(endAt),
                              "minutes",
                              "[]"
                            )
                        ) {
                          return (
                            <Flex
                              key={id}
                              flexDir="column"
                              gap={5}
                              bgColor="white"
                              px={2}
                              borderRadius="10px"
                              justifyContent="space-between"
                            >
                              <Flex
                                justifyContent="space-between"
                                alignItems="center"
                                gap={8}
                              >
                                <LobbyItem startAt={startAt} title={title} />
                                <Flex
                                  zIndex="100"
                                  fontWeight="bold"
                                  bgColor="#F55A5A"
                                  color="white"
                                  bg="lg"
                                  alignItems="center"
                                  py={1}
                                  px={2}
                                  borderRadius="lg"
                                  gap={2}
                                  fontFamily="Roboto"
                                >
                                  <Icon fontSize="0.5rem" as={BsCircleFill} />
                                  LIVE
                                </Flex>
                              </Flex>
                            </Flex>
                          );
                        }

                        return (
                          <LobbyItem key={id} startAt={startAt} title={title} />
                        );
                      }
                    )}
                </SimpleGrid>
                {!isBefore19Sept2022 &&
                data &&
                data.getConferenceByDate.length ? (
                  <Button
                    w={{
                      base: "calc(100% - var(--chakra-space-5) - var(--chakra-space-5))",
                      lg: "calc(50% - var(--chakra-space-5))",
                    }}
                    bgColor="transparent"
                    border="2px solid black"
                    py={8}
                    mt={4}
                    mx={{ base: "auto", lg: 5 }}
                    mb={4}
                    borderRadius="10px"
                    onClick={() => router.push("/auditorium")}
                  >
                    GO TO EVENT
                  </Button>
                ) : null}
              </Flex>
            </Box>
          </Box>
        </Stack>
      </Box>
      <ChatBoxHome
        slidoId={(data && data.getConferenceByDate[0].slidoUrl) || ""}
      />
      {/* data &&
        data.getConferenceByDate.map(({ id, startAt, endAt, slidoUrl }) => {
          if (
            dayjs()
              .tz("Asia/Singapore")
              .isBetween(dayjs(startAt), dayjs(endAt), "minutes", "[]")
          ) {
            return <ChatBoxHome key={id} slidoId={slidoUrl} />;
          }

          return null;
        })[0] */}
    </Layout>
  );
}
