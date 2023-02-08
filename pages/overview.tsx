import apcca40thLogoPng from "@/assets/images/apcca-40th-logo.png";
import apcca40thLogoWebp from "@/assets/images/apcca-40th-logo.webp";
import desktopLandingPng from "@/assets/images/landing-desktop-bg.png";
import sheeYongLee from "@/assets/images/shie yong lee.jpg";
import Layout from "@/components/Templates/Layout";
import { Box, Flex, Grid, GridItem, Img, Stack, Text } from "@chakra-ui/react";

// import profile1 from "@/assets/images/profile1.png";
// import profile2 from "@/assets/images/profile2.png";
import IreneAndNeil from "@/assets/images/Irene_and_Neil_Morgan.png";
import mobileLandingPng from "@/assets/images/landing-mobile-bg.png";
import APCCAAndSPSIcons from "@/components/Atoms/APCCAAndSPSIcons";
import { apccaMembers, otherApccaMembers } from "@/constants/apcca-members";
import { isMobileOnly } from "react-device-detect";

const IS_BATCH_1 = JSON.parse(process.env.NEXT_PUBLIC_IS_BATCH_1 as string);

export default function OverviewPage() {
  // const desktopLeftHandSideRef = useRef<HTMLDivElement>(null);
  // const { height } = useWindowSize();

  return (
    <Layout title="Overview">
      <Box
        overflow="auto"
        as="article"
        bgPosition="bottom"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        h={{ base: "100%", md: "100%", lg: "100%" }}
        bgImage={{ base: mobileLandingPng.src, lg: desktopLandingPng.src }}
        // h={{ base: "100vh", md: "90vh", lg: "100%" }}
        // sx={{
        //   "@media (min-width: 62em) and (orientation: landscape)": {
        //     ".webp &": {
        //       bgImage: `url(${desktopLandingWebp.src})`,
        //     },
        //     ".no-webp &": {
        //       bgImage: `url(${desktopLandingPng.src})`,
        //     },
        //   },
        //   "@media (min-aspect-ratio: 4/3) and (max-aspect-ratio: 3 / 2) and (min-width: 62em)":
        //     {
        //       pt: "7%",
        //       bgSize: "auto 100%",
        //     },
        // }}
        // bgImage={desktopLandingWebp.src}
      >
        <Flex
          flexDir={{ base: "column", lg: "column" }}
          // justifyContent={{ lg: "center" }}
          // h={isMobileOnly ? height}
          sx={{
            "@media (orientation: portrait) and (min-width: 62em)": {
              h: "auto",
              flexDir: "column",
            },
          }}
          style={{
            background: "rgba(255,255,255,0.8)",
          }}
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
            />
            <APCCAAndSPSIcons />
          </Flex>
          <Flex flexDir={{ base: "column", lg: "row" }} p={{ base: 5, lg: 0 }}>
            <Box flex="40%" w="40%">
              <picture>
                <source srcSet={apcca40thLogoWebp.src} type="media/webp" />
                <Flex justifyContent="center">
                  <Img
                    src={apcca40thLogoPng.src}
                    w={{ base: "100%", lg: "83%" }}
                    alt="40th APCCA 2022: 19-23 September 2022"
                  />
                </Flex>
              </picture>
            </Box>
            <Box flex="60%" pl={{ lg: 6 }} pr={{ lg: "2.5rem" }}>
              <Text
                fontWeight="750"
                fontSize="1.25rem"
                mt={IS_BATCH_1 ? 0 : { base: 5, lg: 10 }}
                mb={{ base: 5, lg: 5 }}
              >
                APCCA
              </Text>
              <Text textAlign="justify">
                The Asian and Pacific Conference of Correctional Administrators
                provides a forum for government officials responsible for prison
                or correctional administration within the Asia-Pacific Region to
                share ideas and practices in the professional area of
                correctional administration and develop networks aimed at
                fostering co-operation.
                <br />
              </Text>
            </Box>
          </Flex>
          {isMobileOnly ? (
            <Box>
              <Flex flexDir="column" p={{ base: 5, lg: 0 }}>
                {/* <Flex flexDir="row" pl={10} pr={10} alignItems="center">
                  <Box w="100%">
                    <Img src={apccalogo.src} w="50%" />
                  </Box>
                  <Box w="100%">
                    <Img src={spslogo.src} w="100%" />
                  </Box>
                </Flex> */}
                <Text
                  fontWeight="750"
                  fontSize="1.25rem"
                  mt={{ base: 5, lg: 10 }}
                  mb={{ base: 5, lg: 5 }}
                >
                  APCCA Governing Board
                </Text>
                <Text fontSize="1rem" align="justify">
                  The APCCA Governing Board is the governing body of the APCCA.
                  It manages and directs all activities relating to the purpose
                  of the APCCA. The membership and duties of the Board are set
                  out in the APCCA Joint Declaration. The Board holds office
                  from the end of the Annual Conference, at which its
                  composition is confirmed until the end of the next Annual
                  Conference.
                </Text>
              </Flex>
            </Box>
          ) : (
            <Box
              p={{ base: 5, lg: 10 }}
              pt={{ lg: "2%", "2xl": "4%" }}
              pb={{ lg: 4 }}
              mb={4}
              w="100%"
              mt={10}
            >
              <Flex flexDir="row" gap={10}>
                <Box w="100%">
                  <Flex flexDir="column">
                    {/* <Flex flexDir="row" alignItems="center">
                      <Box w="100%">
                        <Img src={apccalogo.src} w="50%" />
                      </Box>
                      <Box w="100%" pos="relative">
                        <Img
                          src={spslogo.src}
                          mt={{ base: "-0.5rem", lg: "-1rem" }}
                          w="100%"
                        />
                      </Box>
                    </Flex> */}
                    <Text
                      fontWeight="750"
                      fontSize="1.25rem"
                      mt={{ base: 5, lg: 5 }}
                      mb={{ base: 5, lg: 5 }}
                    >
                      APCCA Governing Board
                    </Text>
                    <Text fontSize="1rem" align="justify">
                      The APCCA Governing Board is the governing body of the
                      APCCA. It manages and directs all activities relating to
                      the purpose of the APCCA. The membership and duties of the
                      Board are set out in the APCCA Joint Declaration. The
                      Board holds office from the end of the Annual Conference,
                      at which its composition is confirmed until the end of the
                      next Annual Conference.
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          )}
          <Flex
            flexDir={{ base: "column-reverse", lg: "row" }}
            h="100%"
            pt={10}
            // bgRepeat="no-repeat"
            // bgSize={{
            //   base: "100% 70%",
            //   md: "100% 90%",
            // }}
            // bgImage={{ base: mobileLandingWebp.src, lg: "" }}
          >
            <Flex
              flexDir="column"
              minW={{ base: "100%", lg: "50%" }}
              maxW={{ base: "100%", lg: "50%" }}
              p={{ base: 5, lg: 10 }}
              pt={{ lg: "2%", "2xl": "4%" }}
              pb={{ lg: 4 }}
            >
              {/*<Box>*/}
              {/*    <Text fontWeight="750" fontSize="4rem" color="#222222">*/}
              {/*        &lsquo;&lsquo;*/}
              {/*    </Text>*/}
              {/*</Box>*/}
              <Box>
                <Text
                  fontWeight="750"
                  fontSize="1.25rem"
                  mb={{ base: 5, lg: 5 }}
                >
                  Commissioner of Host Country
                </Text>
                <Text align="justify">
                  SHIE Yong Lee joined the Singapore Prison Service (SPS) in
                  1995. In her 26 years of service, she has held key
                  appointments in SPS and in the Ministry of Home Affairs (MHA).
                  Some of her appointments in SPS include Head Operations of
                  Changi Women’s Prison, Head of Research and Planning Branch,
                  and Head of Programme Branch. <br />
                  <br />
                  In 2008, Yong Lee served as Deputy Director (Civil Defence &
                  Rehabilitation), Policy & Operations Division at MHA. She
                  returned to SPS in 2011 to oversee Cluster B as a Commander.
                  In 2015, she was appointed as Chief-of-Staff (COS) with
                  concurrent appointment as Director of Transformational
                  Projects. In 2016, she served as Deputy Commissioner and COS.
                  Thereafter, she relinquished the post of COS and was appointed
                  as Deputy Commissioner (Policy & Transformation) in April
                  2019. In July 2020, Yong Lee was appointed as Commissioner of
                  Prisons (Designate) and subsequently was appointed as
                  Commissioner of Prisons on 28 September 2020. Yong Lee is
                  married with 3 children.
                </Text>
              </Box>
            </Flex>
            <Flex
              flexDir="column"
              minW={{ base: "100%", lg: "50%" }}
              maxW={{ base: "100%", lg: "50%" }}
              justifyContent="center"
              p={{ base: 5, lg: 10 }}
              pt={{ lg: "2%", "2xl": "4%" }}
              pb={{ lg: 4 }}
            >
              <Flex justifyContent="center">
                <Img src={sheeYongLee.src} w={{ base: "60%", lg: "50%" }} />
              </Flex>
              <Box alignSelf="center" textAlign="center">
                <Text fontWeight="700" fontSize="1.25rem">
                  SHIE Yong Lee
                </Text>
                <Text fontWeight="400" fontSize="1rem">
                  Commissioner of Prisons
                  <br />
                  Singapore Prison Service
                </Text>
              </Box>
            </Flex>
          </Flex>
          <Box
            p={{ base: 5, lg: 10 }}
            pt={{ lg: "2%", "2xl": "4%" }}
            pb={{ lg: 4 }}
            mt={{ base: 5, lg: 10 }}
          >
            <Flex flexDir={{ base: "column", lg: "row" }} gap={10}>
              <Flex
                flexDir="column"
                w={{ base: "100%", lg: "50%" }}
                p={{ base: 5, lg: 0 }}
              >
                {/* <Flex flexDir="row" w={{ base: "full", lg: "40%" }}>
                  <Img src={profile1.src} w={{ base: "50%", lg: "100%" }} />
                  <Img src={profile2.src} w={{ base: "50%", lg: "100%" }} />
                </Flex> */}
                <Img src={IreneAndNeil.src} />
                <Text
                  // w={{ base: "100%", lg: "80%" }}
                  w="full"
                  fontSize="0.8rem"
                  mt={2}
                  fontStyle="italic"
                  textAlign="justify"
                >
                  Emeritus Professor Neil MORGAN AM has been an APCCA Rapporteur
                  for APCCA since 1997. Ms Irene MORGAN has been an APCCA
                  Rapporteur since 2003 and previously assisted APCCA on a
                  voluntary basis.
                </Text>
              </Flex>
              <Flex flexDir="column" w={{ base: "100%", lg: "50%" }}>
                {/*<Text fontWeight="750" fontSize="4rem" color="#222222">*/}
                {/*    &lsquo;&lsquo;*/}
                {/*</Text>*/}
                <Text fontWeight="750" fontSize="1.25rem" mb={5}>
                  APCCA Rapporteurs
                </Text>
                <Text fontSize="1rem" textAlign="justify">
                  Rapporteurs are appointed based on the nomination of the
                  Governing Board and the endorsement by APCCA members.
                  Rapporteurs serve the APCCA in roles set out by the Joint
                  Declaration and do so for a fixed term of three years, which
                  upon expiry may be extended once for a period of two years. A
                  Rapporteur’s duties would be to prepare the Discussion Guide,
                  compile the report for each annual conference, and to serve as
                  the secretary to the Governing Board meetings.
                </Text>
              </Flex>
            </Flex>
          </Box>
          <Box
            mt={{ base: 5, lg: 8 }}
            p={{ base: 5, lg: 10 }}
            pt={{ lg: "2%", "2xl": "4%" }}
            pb={{ lg: 4 }}
          >
            <Text fontWeight="750" fontSize="1.25rem" mb={5}>
              APCCA Joint Secretariat
            </Text>
            <Stack>
              <Text fontSize="1rem" textAlign="justify">
                {`The Joint Secretariat was established after the Joint
                  Declaration in 2002 and this role has been undertaken by Hong
                  Kong (China) and Singapore since then. The Joint Secretariat's
                  term is reviewed by the Governing Board every two years.`}
              </Text>
              <Text fontSize="1rem" textAlign="justify">
                According to the Joint Declaration, the APCCA Joint Secretariat
                will: (a) be a focal contact point between the APCCA and its
                members, and between the APCCA and other individuals and
                organisations; (b) maintain and distribute the APCCA materials
                and documents; (c) publish and distribute the APCCA Newsletter;
                (d) operate the APCCA web site; (e) be the APCCA Fund
                Administrator; (f) implement the resolutions and exercise such
                powers as authorized by the Annual Conference and/or the
                Governing Board; and (g) serve as the secretary to the Governing
                Board meetings in case the Rapporteur is not available.
              </Text>
            </Stack>
          </Box>
          <Box
            mt={{ base: 5, lg: 8 }}
            p={{ base: 5, lg: 10 }}
            pt={{ lg: "2%", "2xl": "4%" }}
            pb={{ lg: 4 }}
          >
            <Text fontWeight="750" fontSize="1.25rem">
              APCCA Members
            </Text>
          </Box>
          <Box borderRadius={{ base: 0, lg: "20px" }} p={5} mb="50px">
            <Flex flexDir="column" w="full">
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  lg: "repeat(6, 1fr)",
                }}
                gap={5}
              >
                {apccaMembers.map((item) => {
                  return (
                    <GridItem flexDir="column" key={item.id}>
                      <Flex justifyContent="center">
                        <Img alignSelf="center" src={item.img} w="40px" />
                      </Flex>
                      <Text
                        textTransform="uppercase"
                        mt={3}
                        textAlign="center"
                        fontSize="0.8rem"
                      >
                        {item.description}
                      </Text>
                      <Text
                        mt={3}
                        textAlign="center"
                        fontWeight="700"
                        fontSize="0.8rem"
                      >
                        {item.name}
                      </Text>
                      <Text
                        textAlign="center"
                        fontWeight="400"
                        fontSize="0.8rem"
                        dangerouslySetInnerHTML={{ __html: item.position }}
                      />
                    </GridItem>
                  );
                })}
              </Grid>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)",
                }}
                gap={5}
                mt={{ base: 5, lg: 0 }}
              >
                {otherApccaMembers.map((item) => {
                  return (
                    <GridItem flexDir="column" mt={5} key={item.id}>
                      <Flex justifyContent="center">
                        <Img alignSelf="center" src={item.img} w="40px" />
                      </Flex>
                      <Text
                        textTransform="uppercase"
                        mt={3}
                        textAlign="center"
                        fontSize="0.8rem"
                      >
                        {item.description}
                      </Text>
                      <Text
                        mt={3}
                        textAlign="center"
                        fontWeight="700"
                        fontSize="0.8rem"
                      >
                        {item.name}
                      </Text>
                      <Text
                        textAlign="center"
                        fontWeight="400"
                        fontSize="0.8rem"
                      >
                        {item.position}
                      </Text>
                    </GridItem>
                  );
                })}
              </Grid>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
}
