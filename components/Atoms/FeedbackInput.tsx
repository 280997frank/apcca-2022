import React from "react";
import {
  Checkbox,
  CheckboxGroup,
  Divider,
  HStack,
  Radio,
  RadioGroup,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field } from "formik";
import { EInputType, IFeedbackQuestion } from "@/types/feedback";

function FeedbackInput({
  data,
  setFieldValue,
}: {
  data: IFeedbackQuestion;
  setFieldValue: (field: string, data: any) => void;
}) {
  if (data.answerType === EInputType.RADIO_BUTTON) {
    return (
      <Field
        as={RadioGroup}
        name={data.id}
        onChange={(e: string) => setFieldValue(data.id, e)}
      >
        <HStack
          w="100%"
          justify={
            data.choices.split(",").length > 2 ? "space-between" : "flex-start"
          }
        >
          {data.choices.split(",").map((choice: string, i: number) => {
            return (
              <Radio
                key={`choices-${i}`}
                _focus={{}}
                outline="none"
                fontSize=".8rem"
                display="flex"
                flexDir={data.choices.split(",").length > 2 ? "column" : "row"}
                colorScheme="yellow"
                value={choice}
              >
                {choice}
              </Radio>
            );
          })}
        </HStack>
      </Field>
    );
  } else if (data.answerType === EInputType.CHECKBOX) {
    return (
      <Field
        as={CheckboxGroup}
        name={data.id}
        onChange={(e: string) => setFieldValue(data.id, e)}
      >
        <VStack w="100%" alignItems="flex-start">
          {data.choices.split(",").map((choice: string, i: number) => {
            return (
              <Checkbox
                key={`checkbox-${i}`}
                _focus={{}}
                outline="none"
                fontSize=".8rem"
                colorScheme="yellow"
                value={choice}
              >
                {choice}
              </Checkbox>
            );
          })}
        </VStack>
      </Field>
    );
  } else {
    return (
      <>
        <Field
          as={Textarea}
          name={data.id}
          shadow="md"
          outline="none"
          borderColor="#787878"
          resize="vertical"
          placeholder="Type here"
          _focus={{}}
          _hover={{}}
        />
        <Divider mt="20px" orientation="horizontal" bg="#787878" />
      </>
    );
  }
}

export default FeedbackInput;
