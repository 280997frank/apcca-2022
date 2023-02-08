import {
  Alert,
  AlertDescription,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Layout from "@/components/Templates/Layout";
import React, { FC, useEffect, /*useLayoutEffect,*/ useState } from "react";

// import landingMobileBg from "@/assets/images/landing-mobile-bg.png";
import mobileLandingPng from "@/assets/images/landing-mobile-bg.png";
import mobileLandingWebp from "@/assets/images/landing-mobile-bg.webp";
import desktopLandingPng from "@/assets/images/landing-desktop-bg.png";
import desktopLandingWebp from "@/assets/images/landing-desktop-bg.webp";
// import desktopLandingPng from "@/assets/images/landing-desktop-bg.png";
import AgendasBreakoutRoom from "@/components/Organisms/AgendasBreakoutRoom";
import {
  // useSubscriptionBreakoutRoom,
  useGetBreakRooms,
} from "@/hooks/breakout-rom";
import { useWindowSize } from "@/hooks";
import { TDataBreakoutRoom } from "@/types/breakoutRoom";
// import { isMobileOnly } from "react-device-detect";
import APCCAAndSPSIcons from "@/components/Atoms/APCCAAndSPSIcons";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const CURRENT_TIME = dayjs().utc().format("YYYY-MM-DD");

const TRANSPARENT_WHITE_BG =
  "linear-gradient(0deg, rgba(255,255,255,0.75), rgba(255,255,255,0.75))";

const BreakoutRoom: FC = () => {
  // const { data: responseSub } = useSubscriptionBreakoutRoom();
  const { height: innerHeight } = useWindowSize();

  const { fetchGetBreakoutRooms, data } = useGetBreakRooms();

  const [newDayOne, setNewDayOne] = useState<TDataBreakoutRoom[]>([]);
  const [newDayTwo, setNewDayTwo] = useState<TDataBreakoutRoom[]>([]);
  const [newDayThree, setNewDayThree] = useState<TDataBreakoutRoom[]>([]);
  const [newDayFour, setNewDayFour] = useState<TDataBreakoutRoom[]>([]);
  const [newDayFive, setNewDayFive] = useState<TDataBreakoutRoom[]>([]);

  useEffect(() => {
    fetchGetBreakoutRooms();
  }, [fetchGetBreakoutRooms]);

  useEffect(() => {
    if (data !== undefined) {
      setNewDayOne(data.dayOne);
      setNewDayTwo(data.dayTwo);
      setNewDayThree(data.dayThree);
      setNewDayFour(data.dayFour);
      setNewDayFive(data.dayFive);
    }
  }, [data]);

  console.log("CURRENT_TIME", CURRENT_TIME);
  return (
    <Layout title="Breakout Room" isPrivate>
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
          Breakout Rooms
        </Text>
        <APCCAAndSPSIcons />
      </Flex>
      <Box
        p={{ base: "20px", xl: "20px 30px" }}
        minH={innerHeight + "px"}
        sx={{
          "&::before": {
            content: "''",
            position: "fixed",
            top: 0,
            left: 0,
            height: { base: `calc(${innerHeight}px - 101px)`, lg: "100%" },
            width: { base: "100%", lg: "78vw" },
            marginLeft: { lg: "22vw" },
            marginTop: { base: "101px", lg: 0 },
            zIndex: -1,
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: { base: "100% auto", lg: "auto 100%" },
            ".webp &": {
              bgImage: `url(${mobileLandingWebp.src})`,
            },
            ".no-webp &": {
              bgImage: `url(${mobileLandingPng.src})`,
            },
            "@media (min-width: 62em) and (orientation: landscape)": {
              ".webp &": {
                bgImage: `${TRANSPARENT_WHITE_BG}, url(${desktopLandingWebp.src})`,
              },
              ".no-webp &": {
                bgImage: `${TRANSPARENT_WHITE_BG}, url(${desktopLandingPng.src})`,
              },
            },
          },
        }}
      >
        {/* {!isMobileOnly && (
          <Box w="100%" display="flex" justifyContent="center" mb="2rem">
            <Alert
              backgroundColor="#FFFAE0"
              justifyContent="center"
              maxW={{ base: "348px", md: "100%" }}
              borderRadius={{ base: "16px", md: "0px" }}
              px="2rem"
              py="1rem"
            >
              <AlertDescription
                fontWeight="700"
                fontSize="16px"
                lineHeight="19px"
                color="#000000"
                textAlign="center"
              >
                <Text mb="1rem">
                  The breakout room discussions are to facilitate group
                  discussions and sharing among participants, based on the
                  different agenda presentations.
                </Text>
                <Text>
                  Please join another breakout room if the current one you tried
                  to enter is full. Breakout rooms with a green circle on the
                  top right corner are open for participation, while those in
                  red have reached full capacity.
                </Text>
              </AlertDescription>
            </Alert>
          </Box>
        )} */}

        <Box
          w="100%"
          px={{
            base: "20px",
            lg: "0px",
          }}
        >
          <Heading
            textTransform="uppercase"
            fontWeight="700"
            fontSize={{ base: "18px", md: "20px" }}
            lineHeight="normal"
            color="#222222"
            flex="1"
          >
            instructions
          </Heading>
          <Text
            my={{
              base: "1rem",
              lg: "2rem",
            }}
            fontSize={{ base: "16px", md: "20px" }}
            lineHeight="normal"
            textAlign="justify"
          >
            {/* The breakout room discussions are to facilitate group
            discussions/sharing among participants, based on the agenda item
            presentations. Please note that there are 2 sets of breakout rooms
            for the respective concurrent agenda. */}
            The breakout room discussions are to facilitate group discussions
            and sharing among participants, based on the different agenda
            presentations.
          </Text>
        </Box>
        <Box
          w="100%"
          display="flex"
          justifyContent="center"
          my={{
            base: "3rem",
            lg: "2rem",
          }}
        >
          <Alert
            backgroundColor="#FFFAE0"
            justifyContent="center"
            height="unset"
            p={{
              base: "10px",
              lg: "20px",
            }}
            maxW={{ base: "100% !important", md: "100%" }}
            borderRadius={{ base: "16px", md: "16px" }}
          >
            <AlertDescription
              fontWeight="700"
              fontSize={{
                base: "12px",
                lg: "16px",
              }}
              lineHeight="normal"
              color="#000000"
              textAlign="justify"
            >
              Please join another breakout room if the current one you tried to
              enter is full. Breakout rooms with a green circle on the top right
              corner are open for participation, while those in red have reached
              full capacity.
            </AlertDescription>
          </Alert>
        </Box>
        {newDayOne !== null && newDayOne.length !== 0 && (
          <AgendasBreakoutRoom
            data={newDayOne}
            title="DAY 1 - 19 September 2022 "
            disabled={CURRENT_TIME === "2022-09-19" ? false : true}
          />
        )}
        {newDayTwo !== null && newDayTwo.length !== 0 && (
          <AgendasBreakoutRoom
            data={newDayTwo}
            title="DAY 2 - 20 September 2022 "
            disabled={CURRENT_TIME === "2022-09-20" ? false : true}
          />
        )}
        {newDayThree !== null && newDayThree.length !== 0 && (
          <AgendasBreakoutRoom
            data={newDayThree}
            title="DAY 3 - 21 September 2022 "
            disabled={CURRENT_TIME === "2022-09-21" ? false : true}
          />
        )}
        {newDayFour !== null && newDayFour.length !== 0 && (
          <AgendasBreakoutRoom
            data={newDayFour}
            title="DAY 4 - 22 September 2022 "
            disabled={CURRENT_TIME === "2022-09-22" ? false : true}
          />
        )}
        {newDayFive !== null && newDayFive.length !== 0 && (
          <AgendasBreakoutRoom
            data={newDayFive}
            title="DAY 5 - 23 September 2022 "
            disabled={CURRENT_TIME === "2022-09-23" ? false : true}
          />
        )}
      </Box>
    </Layout>
  );
};

export default BreakoutRoom;
