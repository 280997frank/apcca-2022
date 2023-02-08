import {
  Box,
  Flex,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Spinner,
  Center,
  useTab,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { isMobileOnly, isTablet } from "react-device-detect";
import dayjs from "dayjs";
import { Formik } from "formik";
import { object, string } from "yup";

import DayTabList from "@/components/Molecules/DayTabList";
import Layout from "@/components/Templates/Layout";

import mobileLandingPng from "@/assets/images/landing-mobile-bg.png";
import desktopLandingPng from "@/assets/images/landing-desktop-bg.png";

import {
  useGetFeedbackQuestion,
  useSubmitFeedback,
  useGetFeedbackAnswers,
} from "@/hooks/feedback";
import { IFeedbackQuestion } from "@/types/feedback";

import FeedbackForm from "@/components/Molecules/FeedbackForm";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { getEventDate, getDefaultIndexDayTabs } from "@/utils";
import APCCAAndSPSIcons from "@/components/Atoms/APCCAAndSPSIcons";

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
        color={isSelected ? "#222222" : "#989898"}
      >
        {tabProps.children}
      </Text>
    </Box>
  );
});
CustomTabResource.displayName = "CustomTabResource";

const FIRST_DAY_OF_EVENT = getEventDate();

const FeedbackPage = () => {
  const [initialValues, setInitialValues] = useState({});
  const [hasSubmitted, setSubmitted] = useState(false);
  const [dateSelect, setDateSelect] = useState(FIRST_DAY_OF_EVENT);
  const eventDate = dayjs(dateSelect).format("YYYY-MM-DD");
  const {
    data: dataSchema,
    newData: questions,
    loading: getQuestionLoading,
    // refetch,
  } = useGetFeedbackQuestion({
    feedbackQuestionInput: { eventDate },
  });
  const { submitFeedback, loading: submitLoading } = useSubmitFeedback();
  const {
    fetchFeedbackAnswers,
    data,
    loading: fetchingAnswers,
  } = useGetFeedbackAnswers();

  const generateSchema = (arr: IFeedbackQuestion[]) => {
    const obj = arr.reduce((prev, value) => {
      return {
        ...prev,
        [value.id]: string().required(
          "sorry, this question require your feedback!"
        ),
      };
    }, {});
    return object(obj);
  };

  useEffect(() => {
    // fetch submitted answers for this date's survey if there's any
    fetchFeedbackAnswers({
      variables: { feedbackAnswerInput: { eventDate } },
    });
  }, [fetchFeedbackAnswers, eventDate]);

  useEffect(() => {
    if (data) {
      const newValues: Record<string, string> = {};
      data.getfeedbackAnswer.forEach(({ questionId, answer }) => {
        newValues[questionId] = answer;
      });
      setInitialValues(newValues);
    }
  }, [data]);

  return (
    <Layout title="Feedback" isPrivate>
      <Box
        id="scrollableDiv"
        overflow="auto"
        as="article"
        bgPosition="bottom"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        h={{ base: "100%", md: "100%", lg: "100%" }}
        bgImage={{ base: mobileLandingPng.src, lg: desktopLandingPng.src }}
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
            Feedback
          </Text>
          <APCCAAndSPSIcons />
        </Flex>
        <Flex
          p={{ base: "0px 20px", xl: "20px 30px" }}
          flexDir="column"
          bg={isMobileOnly || isTablet ? "" : "rgba(255,255,255,0.6)"}
          sx={{
            "@media (orientation: portrait) and (min-width: 62em)": {
              h: "auto",
              flexDir: "column",
            },
          }}
        >
          <Tabs align="center" defaultIndex={getDefaultIndexDayTabs()}>
            <DayTabList onChangeTab={(e) => setDateSelect(e)} />
            <TabPanels pos="relative">
              {Array.from({ length: 5 }, (_, i) => (
                <TabPanel key={i} textAlign="left" bg="white" p="30px">
                  <Formik
                    validationSchema={() =>
                      dataSchema &&
                      generateSchema(dataSchema.getFeedbackQuestion)
                    }
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={async (
                      values: Record<string, string | string[]>
                    ) => {
                      let lastData: any = [];
                      for (const keys in values) {
                        lastData.push({
                          questionId: keys,
                          answer:
                            typeof values[keys] === "string"
                              ? values[keys]
                              : values[keys].toString(),
                        });
                      }
                      await submitFeedback({
                        variables: {
                          feedbackAnswerInput: { answers: lastData },
                        },
                      });

                      setSubmitted(true);
                    }}
                    component={(props: any) => {
                      // const date = FIRST_DAY_OF_EVENT.clone()
                      //   .add(i, "day")
                      //   .format("YYYY-MM-DD");

                      if (getQuestionLoading && fetchingAnswers) {
                        return (
                          <Center>
                            <Spinner size="xl" />
                          </Center>
                        );
                      }

                      return (
                        <FeedbackForm
                          questions={questions}
                          loading={getQuestionLoading || submitLoading}
                          date={dateSelect}
                          isDisabled={
                            hasSubmitted ||
                            !!(data && data.getfeedbackAnswer.length)
                          }
                          {...props}
                        />
                      );
                    }}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Layout>
  );
};

export default FeedbackPage;
