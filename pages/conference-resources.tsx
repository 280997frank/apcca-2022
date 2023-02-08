import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  // AlertDescription,
  Box,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useTab,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import DayTabList from "@/components/Molecules/DayTabList";
import ResourceVideo from "@/components/Molecules/ResourceVideo";
import ResourceMaterial from "@/components/Molecules/ResourceMaterial";
import VideoModal from "@/components/Molecules/VideoModal";
import PDFViewer from "@/components/Molecules/PDFViewer";
import Layout from "@/components/Templates/Layout";

import mobileLandingPng from "@/assets/images/landing-mobile-bg.png";
import mobileLandingWebp from "@/assets/images/landing-mobile-bg.webp";
import desktopLandingPng from "@/assets/images/landing-desktop-bg.png";
import desktopLandingWebp from "@/assets/images/landing-desktop-bg.webp";

import { useGetConferenceResourceByDate } from "@/hooks/conference-resource";
import { useWindowSize } from "@/hooks";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { getEventDate, getDefaultIndexDayTabs } from "@/utils";
import APCCAAndSPSIcons from "@/components/Atoms/APCCAAndSPSIcons";

const TRANSPARENT_WHITE_BG =
  "linear-gradient(0deg, rgba(255,255,255,0.75), rgba(255,255,255,0.75))";

const CustomTabResource = React.forwardRef((props?: any, ref?: any) => {
  const tabProps = useTab({ ...props, ref });
  const isSelected = !!tabProps["aria-selected"];

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      minW="125px"
      cursor="pointer"
      outline="none"
      background={isSelected ? "#FFDD00" : "transparent"}
      p="16px 40px"
      borderRadius="8px"
      {...tabProps}
    >
      <Text
        fontWeight="700"
        fontSize="20px"
        lineHeight="24px"
        color="#222222"
        // color={isSelected ? "#222222" : "#989898"}
      >
        {tabProps.children}
      </Text>
    </Box>
  );
});
CustomTabResource.displayName = "CustomTabResource";

const CURRENT_DATE = getEventDate();

const ConferenceResource = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenPdf,
    onClose: onClosePdf,
    onOpen: onOpenPdf,
  } = useDisclosure();
  const { height: innerHeight } = useWindowSize();

  // state
  const [date, setDate] = useState(CURRENT_DATE);
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [titlePdf, setTitlePdf] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) {
    setNumPages(nextNumPages);
  }

  const { getConferenceResourceByDate, data } =
    useGetConferenceResourceByDate();

  useEffect(() => {
    getConferenceResourceByDate({
      variables: {
        getConferenceResourceInput: {
          date: dayjs(date).format("YYYY-MM-DD"),
        },
      },
    });
  }, [date, getConferenceResourceByDate]);

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
          Conference Resources
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
        <Box w="100%">
          <Alert
            backgroundColor="#FFFAE0"
            fontWeight="600"
            // justifyContent="center"
            // height="63px"
            // maxW={{ base: "348px", md: "100%" }}
            textAlign="justify"
            borderRadius={{ base: "16px", md: "0px" }}
          >
            {/* <AlertDescription
              fontWeight="700"
              fontSize="16px"
              lineHeight="19px"
              color="#000000"
              textAlign="justify"
            > */}
            Videos can only be viewed online and cannot be downloaded. This
            website will remain active until 30 September 2022. The conference
            resources will not be available thereafter.
            {/* </AlertDescription> */}
          </Alert>
        </Box>

        <Tabs align="center" defaultIndex={getDefaultIndexDayTabs()}>
          <DayTabList onChangeTab={(e) => setDate(e)} />
          <TabPanels pos="relative">
            {Array.from({ length: 5 }, (_, i) => (
              <TabPanel key={i}>
                <Box>
                  {data?.getConferenceResourceByDate?.map(
                    (conferenceResourceByDate) => {
                      return (
                        <Accordion
                          key={conferenceResourceByDate?.id}
                          allowToggle
                        >
                          <AccordionItem mb="20px">
                            <h2>
                              <AccordionButton
                                backgroundColor="#ffffff"
                                border="1px solid #787878"
                                boxShadow="0px 3px 29px rgba(46, 46, 46, 0.07), 0px 0.13784px 3.63125px rgba(46, 46, 46, 0.030687)"
                                borderRadius="8px"
                                p="12px"
                                _hover={{}}
                              >
                                <Text
                                  fontWeight="400"
                                  fontSize="20px"
                                  lineHeight="24px"
                                  color="#757575"
                                  flex="1"
                                  textAlign="left"
                                >
                                  {conferenceResourceByDate?.title}
                                </Text>
                                <AccordionIcon
                                  fontSize="25px"
                                  color="#757575"
                                />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel py={4} px="0px">
                              <Tabs variant="soft-rounded">
                                <TabList>
                                  <CustomTabResource>
                                    Videos (
                                    {conferenceResourceByDate?.videos?.length})
                                  </CustomTabResource>
                                  <CustomTabResource>
                                    Material (
                                    {
                                      conferenceResourceByDate?.documents
                                        ?.length
                                    }
                                    )
                                  </CustomTabResource>
                                </TabList>
                                <TabPanels>
                                  <TabPanel px="0px">
                                    <Flex gap="18px" flexDir="column">
                                      {conferenceResourceByDate?.videos?.map(
                                        (video) => (
                                          <ResourceVideo
                                            key={video?.id}
                                            title={video?.title}
                                            description={video?.description}
                                            onClick={() => {
                                              onOpen();
                                              setVideoUrl(video?.url);
                                            }}
                                          />
                                        )
                                      )}
                                    </Flex>
                                  </TabPanel>
                                  <TabPanel px="0px">
                                    <Flex gap="18px" flexDir="column">
                                      {conferenceResourceByDate?.documents?.map(
                                        (document) => (
                                          <ResourceMaterial
                                            title={document.title}
                                            description={document.description}
                                            key={document.id}
                                            onClick={() => {
                                              onOpenPdf();
                                              setPdfUrl(document?.url);
                                              setTitlePdf(document?.title);
                                            }}
                                          />
                                        )
                                      )}
                                    </Flex>
                                  </TabPanel>
                                </TabPanels>
                              </Tabs>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      );
                    }
                  )}
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
      <VideoModal videoSrc={videoUrl} isOpen={isOpen} onClose={onClose} />
      <PDFViewer
        pdfUrl={pdfUrl}
        title={titlePdf}
        numPages={numPages}
        pageNumber={pageNumber}
        isOpen={isOpenPdf}
        setPageNumber={setPageNumber}
        onClose={onClosePdf}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
      />
    </Layout>
  );
};

export default ConferenceResource;
