import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { ErrorMessage, Form, FormikProps } from "formik";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";
dayjs.extend(isSameOrAfter);
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import FeedbackInput from "@/components/Atoms/FeedbackInput";

import { IFeedbackQuestion } from "@/types/feedback";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

const renderList = ({
  params,
  setFieldValue,
  isDisabled,
}: {
  params: Record<string, IFeedbackQuestion[]>;
  setFieldValue: (field: string, data: any) => void;
  isDisabled: boolean;
}) => {
  let components: ReactNode[] = [];
  for (const keys in params) {
    components.push(
      <Stack key={keys} gap={4} mb="20px">
        <Heading size="md">{keys}</Heading>
        {params[keys].map((item: IFeedbackQuestion) => {
          return (
            <FormControl key={item.id} w="100%" isDisabled={isDisabled}>
              <FormLabel fontSize="1.3rem" textAlign="left">
                {item.question}
                {/* <Box dangerouslySetInnerHTML={{__html: item.question}} /> */}
              </FormLabel>
              <FeedbackInput data={item} setFieldValue={setFieldValue} />
              <ErrorMessage
                name={item.id}
                render={(e) => (
                  <FormHelperText color="red.400">{e}</FormHelperText>
                )}
              />
            </FormControl>
          );
        })}
      </Stack>
    );
  }
  return components;
};

interface IFeedbackQuestionProps extends FormikProps<{}> {
  questions: Record<string, IFeedbackQuestion[]>;
  loading: boolean;
  date: string;
  isDisabled: boolean;
}

dayjs.extend(utc);
dayjs.extend(timezone);

const CURRENT_DATE = dayjs().tz("Asia/Singapore");

function FeedbackForm({
  questions,
  loading,
  errors,
  setFieldValue,
  date,
  isDisabled,
}: IFeedbackQuestionProps) {
  // if (date !== CURRENT_DATE.format("YYYY-MM-DD")) {
  if (dayjs(date).isAfter(CURRENT_DATE)) {
    return <Text>The feedback survey is not open for this date</Text>;
  }

  return (
    <Form>
      {renderList({
        params: questions as Record<string, IFeedbackQuestion[]>,
        setFieldValue,
        isDisabled,
      })}
      <VStack w="100%" justifyContent="center" alignContent="center">
        {Object.keys(errors).length && (
          <Box as="span" fontSize=".8rem" color="red.400">
            Complete today&apos;s feedback before submit!
          </Box>
        )}
        <Button
          size="lg"
          type={isDisabled ? "button" : "submit"}
          bg="brand.yellow"
          fontWeight="light"
          rightIcon={<ArrowForwardIcon />}
          _focus={{}}
          _hover={{}}
          _active={{ bg: "rgba(255,221,1, .5)" }}
          isLoading={loading}
          disabled={isDisabled}
        >
          SUBMIT FEEDBACK
        </Button>
      </VStack>
    </Form>
  );
}

export default FeedbackForm;
