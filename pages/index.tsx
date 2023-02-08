import React, { useEffect, useRef } from "react";
import {
  Fade,
  Box,
  Flex,
  VStack,
  Stack,
  Text,
  Heading,
  Img,
  Button,
  chakra,
  useDisclosure,
  useMediaQuery,
  Center,
} from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";

import apccaLogoPng from "@/assets/images/apcca-logo.png";
import apccaLogoWebp from "@/assets/images/apcca-logo.webp";
import apcca40thLogoPng from "@/assets/images/apcca-40th-logo.png";
import apcca40thLogoWebp from "@/assets/images/apcca-40th-logo.webp";
import spsLogoPng from "@/assets/images/sps-logo.png";
import spsLogoWebp from "@/assets/images/sps-logo.webp";
import mobileLandingPng from "@/assets/images/landing-mobile-bg.png";
import mobileLandingWebp from "@/assets/images/landing-mobile-bg.webp";
import desktopLandingPng from "@/assets/images/landing-desktop-bg.png";
import desktopLandingWebp from "@/assets/images/landing-desktop-bg.webp";
import agendaBgPng from "@/assets/images/agenda-background.png";
import agendaBgWebp from "@/assets/images/agenda-background.webp";

import completeAgenda from "@/constants/agenda";

import { useWindowSize, useCountdown } from "@/hooks";
import Layout from "@/components/Templates/Layout";
import RegistrationForm from "@/components/Molecules/RegistrationForm";
import { useRouter } from "next/router";

const COUNTDOWN_LABELS = ["Days", "Hours", "Minutes", "Seconds"];

function HeaderImages() {
  return (
    <>
      <picture>
        <source srcSet={apccaLogoWebp.src} type="media/webp" />
        <Img
          src={apccaLogoPng.src}
          htmlWidth={apccaLogoPng.width}
          htmlHeight={apccaLogoPng.height}
          alt="Asian and Pacific Conference of Correctional Administrators"
          h={{ base: 12, lg: 16 }}
          w="auto"
        />
      </picture>
      <picture>
        <source srcSet={spsLogoWebp.src} type="media/webp" />
        <Img
          src={spsLogoPng.src}
          htmlWidth={spsLogoPng.width}
          htmlHeight={spsLogoPng.height}
          alt="Singapore Prison Service"
          h={{ base: 12, lg: 16 }}
          w="auto"
          pos="relative"
          top={{ base: "-0.75rem", lg: "-1rem" }}
        />
      </picture>
    </>
  );
}

export function LandingPage() {
  const agendaRef = useRef<HTMLDivElement>(null);
  const desktopLeftHandSideRef = useRef<HTMLDivElement>(null);
  const { isOpen, onToggle } = useDisclosure();
  const { height, width } = useWindowSize();
  const countdown = useCountdown();
  const [isDesktop] = useMediaQuery(
    "(min-width: 62em) and (orientation: landscape)"
  );

  return (
    <Layout title="Welcome">
      <Fade in={!isOpen} unmountOnExit>
        <Box
          as="article"
          bgPosition="bottom"
          bgRepeat="no-repeat"
          bgSize={{
            base: "100% 100%",
            sm: "100% auto",
          }}
          sx={{
            ".webp &": {
              bgImage: `url(${mobileLandingWebp.src})`,
            },
            ".no-webp &": {
              bgImage: `url(${mobileLandingPng.src})`,
            },
            "@media (min-width: 62em) and (orientation: landscape)": {
              ".webp &": {
                bgImage: `url(${desktopLandingWebp.src})`,
              },
              ".no-webp &": {
                bgImage: `url(${desktopLandingPng.src})`,
              },
            },
            "@media (min-aspect-ratio: 4/3) and (max-aspect-ratio: 3 / 2) and (min-width: 62em)":
              {
                pt: "7%",
                bgSize: "auto 100%",
              },
          }}
        >
          <Flex
            as="header"
            justifyContent="space-between"
            alignItems="center"
            px={8}
            py={8}
            display={{ base: "flex", lg: "none" }}
            pos="relative"
            sx={{
              "@media (orientation: portrait) and (min-width: 62em)": {
                display: "flex",
              },
            }}
          >
            <HeaderImages />
          </Flex>
          <Stack
            direction={{ base: "column", lg: "row" }}
            justifyContent={{ lg: "center" }}
            gap={{ lg: 4, xl: "5%" }}
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
            <Box ref={desktopLeftHandSideRef} h={{ lg: "fit-content" }}>
              <Box px={4} mb={4} maxW="40rem" mx="auto">
                <picture>
                  <source srcSet={apcca40thLogoWebp.src} type="media/webp" />
                  <Img
                    src={apcca40thLogoPng.src}
                    htmlWidth={apcca40thLogoPng.width}
                    htmlHeight={apcca40thLogoPng.height}
                    alt="40th APCCA 2022: 19-23 September 2022"
                    maxH={{ lg: "20rem", "2xl": "unset" }}
                    w="auto"
                  />
                </picture>
              </Box>
              <VStack
                bgColor="brand.yellow"
                /* {{
                                  sm: "red",
                                  md: "pink",
                                  lg: "grey",
                                  xl: "blue",
                                  "2xl": "brand.yellow",
                                }} */
                borderRadius="1rem"
                mx="auto"
                my={8}
                py={3}
                w={{ base: "calc(100vw - 2rem)", lg: "auto" }}
                maxW={{ base: "27rem", lg: "unset" }}
                sx={{
                  "@media (orientation: portrait) and (min-width: 62em)": {
                    maxW: "59vw",
                  },
                }}
              >
                <Flex w={{ lg: "full" }} justifyContent={{ lg: "center" }}>
                  {countdown.map((number, index) => (
                    <Box
                      key={index}
                      color="brand.grey"
                      textAlign="center"
                      p={4}
                      w={{ lg: "18%" }}
                      sx={{
                        "&:not(:last-child)": {
                          borderRight: "1px solid #393939",
                        },
                        "@media (min-width: 62em)": {
                          "&:first-of-type": {
                            paddingLeft: 0,
                            paddingRight: 8,
                          },
                          "&:last-child": {
                            paddingLeft: 8,
                            paddingRight: 0,
                          },
                        },
                      }}
                    >
                      <Text
                        fontWeight="bold"
                        fontSize={{
                          base: "2.5rem",
                          lg: "4xl",
                          xl: "2.5rem",
                          "2xl": "3.5rem",
                        }}
                        lineHeight="1.2"
                        sx={{
                          "@media (orientation: portrait) and (min-width: 62em)":
                            {
                              fontSize: "3.5rem",
                            },
                        }}
                      >
                        {number.toString().padStart(2, "0")}
                      </Text>
                      <Text
                        fontWeight="400"
                        fontSize={{
                          base: "sm",
                          lg: "md",
                          xl: "lg",
                          "2xl": "xl",
                        }}
                        sx={{
                          "@media (orientation: portrait) and (min-width: 62em)":
                            {
                              fontSize: "lg",
                            },
                        }}
                      >
                        {COUNTDOWN_LABELS[index]}
                      </Text>
                    </Box>
                  ))}
                </Flex>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "sm", lg: "lg", "2xl": "xl" }}
                >
                  Until APCCA 2022 opens
                </Text>
              </VStack>
            </Box>
            <Flex
              flexDir="column"
              justifyContent="space-between"
              h={{ lg: desktopLeftHandSideRef.current?.offsetHeight }}
            >
              <Flex
                as="header"
                justifyContent="space-between"
                alignItems="center"
                display={{ base: "none", lg: "flex" }}
                pos="relative"
                sx={{
                  "@media (orientation: portrait) and (min-width: 62em)": {
                    display: "none",
                  },
                }}
              >
                <HeaderImages />
              </Flex>
              <Box>
                <Box
                  w={{ base: "calc(100vw - 2rem)", lg: "auto" }}
                  maxW={{ base: "27rem", lg: "40vw" }}
                  mx={{ base: "auto", lg: 0 }}
                  mb={8}
                  textAlign={{ base: "center", lg: "left" }}
                  sx={{
                    "@media (orientation: portrait) and (min-width: 62em)": {
                      mx: "auto",
                      maxW: "70vw",
                      textAlign: "center",
                    },
                    "@media (min-width: 80em) and (max-width: 37.5em)": {
                      mb: 20,
                    },
                    "@media (min-width: 80em) and (max-width: 97.5em)": {
                      mb: "6rem",
                    },
                  }}
                >
                  <Heading
                    fontSize={{ base: "2xl", lg: "5xl", "2xl": "4rem" }}
                    mb={4}
                    color="#222222"
                    lineHeight="1.2"
                  >
                    WELCOME TO APCCA 2022
                  </Heading>
                  <Text
                    fontSize={{ base: "sm", lg: "md", "2xl": "xl" }}
                    color="#333333"
                    lineHeight="1.2"
                  >
                    Leveraging the virtual space for APCCA members to share best
                    practices and ideas in corrections, and network with one
                    another.
                  </Text>
                </Box>
                <VStack
                  w={{ base: "calc(100vw - 2rem)", lg: "auto" }}
                  mx="auto"
                  mb={8}
                  alignItems={{ base: "center", lg: "flex-start" }}
                  sx={{
                    "@media (orientation: portrait) and (min-width: 62em)": {
                      w: "full",
                      alignItems: "center",
                    },
                  }}
                >
                  <Button
                    variant="unstyled"
                    display="inline-flex"
                    alignItems="center"
                    bgColor="brand.yellow"
                    borderRadius="1rem"
                    fontSize={{ lg: "lg", "2xl": "xl" }}
                    ml={{ base: "auto", lg: 0 }}
                    mr="auto"
                    // w={{ base: 48, lg: "14rem" }}
                    pl={{ base: 10, lg: 10 }}
                    pr={{ base: 10, lg: 10 }}
                    h={16}
                    mb={4}
                    onClick={() => {
                      onToggle();
                      /* if (countdown.filter((val) => val > 0).length) {
                      } else {
                        setIsLauncing(true);
                      } */
                    }}
                    rightIcon={<BsArrowRight />}
                    sx={{
                      "& svg": {
                        fontSize: "2rem",
                      },
                      "@media (orientation: portrait) and (min-width: 62em)": {
                        ml: "auto",
                      },
                    }}
                  >
                    REGISTER
                  </Button>
                  <Button
                    variant="unstyled"
                    display="inline-flex"
                    alignItems="center"
                    bgColor="brand.yellow"
                    borderRadius="1rem"
                    fontSize={{ lg: "lg", "2xl": "xl" }}
                    mx="auto"
                    // w={{ base: "21rem", lg: "25rem" }}
                    pl={{ base: 8, lg: 10 }}
                    pr={{ base: 8, lg: 10 }}
                    h={16}
                    rightIcon={<BsArrowRight />}
                    onClick={() => {
                      agendaRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    sx={{
                      "& svg": {
                        fontSize: "2rem",
                      },
                    }}
                  >
                    {isDesktop
                      ? "KEY EVENT HIGHLIGHTS"
                      : "SEE CONFERENCE HIGHLIGHTS"}
                  </Button>
                </VStack>
              </Box>
            </Flex>
          </Stack>
        </Box>
        <Box
          as="article"
          ref={agendaRef}
          bgColor="black"
          color="white"
          pt={12}
          pb={12}
          bgSize="auto 100%"
          bgRepeat="no-repeat"
          sx={{
            ".webp &": {
              bgImage: `url(${agendaBgWebp.src})`,
            },
            ".no-webp &": {
              bgImage: `url(${agendaBgPng.src})`,
            },
          }}
        >
          <Heading
            fontSize={{ base: "2xl", lg: "5xl", "2xl": "4rem" }}
            textAlign="center"
            mb={{ base: 12, lg: 16 }}
          >
            {isDesktop ? "KEY EVENTS HIGHLIGHTS" : "EVENT AGENDA"}
          </Heading>
          {completeAgenda.map(({ title, agenda, time }) => (
            <Flex
              key={title}
              as="section"
              flexDir={{ base: "column", lg: "row" }}
              alignItems={{ lg: "center" }}
              w="calc(100vw - 2rem)"
              mx="auto"
              maxW={{ base: "30rem", lg: "90vw" }}
              minH={{ lg: "18.75rem" }}
              sx={{
                "&:not(:last-child)": { marginBottom: "4rem" },
                "@media (orientation: portrait) and (min-width: 62em)": {
                  flexDir: "column",
                  minH: "unset",
                  maxW: "60vw",
                },
              }}
            >
              <Heading
                fontSize={{ base: "2xl", lg: "2rem", "2xl": "2.5rem" }}
                textAlign={{ base: "center", lg: "left" }}
                flex="1"
              >
                <Text as="time" dateTime={time}>
                  {title}
                </Text>
              </Heading>
              <chakra.hr
                mt={8}
                mb={4}
                sx={{
                  "@media (orientation: portrait) and (min-width: 62em)": {
                    h: 2,
                    w: "full",
                  },
                }}
              />
              <Flex
                as="ul"
                flexDir="column"
                justifyContent="center"
                listStyleType="none"
                flex="2"
                borderLeft={{ lg: "0.25rem solid white" }}
                pl={{ lg: 8 }}
                minH={{ lg: "inherit" }}
                sx={{
                  "& > li:not(:last-child)": { marginBottom: "1rem" },
                  "@media (orientation: portrait) and (min-width: 62em)": {
                    borderLeft: "none",
                    pl: 0,
                  },
                }}
              >
                {agenda.map((event) => (
                  <chakra.li key={event}>
                    <Box border="1px solid white" borderRadius="2xl" p={6}>
                      <Heading
                        fontSize={{ base: "md", lg: "xl", "2xl": "2xl" }}
                      >
                        {event}
                      </Heading>
                    </Box>
                  </chakra.li>
                ))}
              </Flex>
            </Flex>
          ))}
        </Box>
      </Fade>
      <Fade in={isOpen} unmountOnExit>
        <RegistrationForm onToggle={onToggle} height={height} width={width} />
      </Fade>
    </Layout>
  );
}

export default function Landing() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, [router]);

  return <Center h="100vh">Loading...</Center>;
}
