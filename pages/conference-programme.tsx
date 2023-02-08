import ConferenceProgramme from "@/components/Organisms/ConferenceProgramme";
import Layout from "@/components/Templates/Layout";
import { useGetConferenceByDate } from "@/hooks/conference-programme";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import { useEffect, useState } from "react";
import { getEventDate } from "../utils";
import mobileLandingWebp from "@/assets/images/landing-mobile-bg.webp";
import mobileLandingPng from "@/assets/images/landing-mobile-bg.png";
import desktopLandingWebp from "@/assets/images/landing-desktop-bg.webp";
import desktopLandingPng from "@/assets/images/landing-desktop-bg.png";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useWindowSize } from "@/hooks";
import APCCAAndSPSIcons from "@/components/Atoms/APCCAAndSPSIcons";

dayjs.extend(utc);
dayjs.extend(tz);

const TRANSPARENT_WHITE_BG =
  "linear-gradient(0deg, rgba(255,255,255,0.75), rgba(255,255,255,0.75))";

const Page = () => {
  const CURRENT_DATE = getEventDate();
  const [date, setDate] = useState<Dayjs>(CURRENT_DATE);
  const { fetchConferenceByDate, data } = useGetConferenceByDate();
  const { height: innerHeight } = useWindowSize();

  useEffect(() => {
    fetchConferenceByDate({
      variables: {
        getConferenceByDateInput: {
          currentTime: dayjs().tz("Asia/Singapore").format(),
          date: dayjs(date).format("YYYY-MM-DD"),
        },
      },
    });
  }, [date, fetchConferenceByDate]);

  return (
    <Layout title="Conference Resource" isPrivate>
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
          Conference Programme
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
        <ConferenceProgramme
          initialDate={CURRENT_DATE}
          onChangeTab={(val) => setDate(val)}
          data={data?.getConferenceByDate ?? []}
        />
      </Box>
    </Layout>
  );
};

export default Page;
