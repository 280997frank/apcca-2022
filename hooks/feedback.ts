import {
  IFeedbackQuestion,
  IReqFeedbackQuestion,
  IResFeedbackQuestions,
  ISubmitFeedbackQuestion,
  FeedbackAnswersResponse,
  FeedbackAnswersPayload,
} from "@/types/feedback";
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const GET_FEEDBACK_QUESTION = gql`
  query getFeedbackQuestion($feedbackQuestionInput: FeedbackQuestionInput!) {
    getFeedbackQuestion(feedbackQuestionInput: $feedbackQuestionInput) {
      id
      eventDate
      title
      sequence
      answerType
      question
      choices
    }
  }
`;

const GET_FEEDBACK_ANSWERS = gql`
  query getfeedbackAnswer($feedbackAnswerInput: FeedbackAnswerInput!) {
    getfeedbackAnswer(feedbackAnswerInput: $feedbackAnswerInput) {
      questionId
      answer
      eventDate
    }
  }
`;

const SUBMIT_FEEDBACK = gql`
  mutation submitAnswer($feedbackAnswerInput: FeedbackAnswerSubmitInput!) {
    submitAnswer(feedbackAnswerInput: $feedbackAnswerInput) {
      id
    }
  }
`;

export const useGetFeedbackQuestion = (param: IReqFeedbackQuestion) => {
  const toast = useToast();
  const [newData, setData] = useState<Record<string, IFeedbackQuestion[]>>({});
  const query = useQuery<IResFeedbackQuestions, IReqFeedbackQuestion>(
    GET_FEEDBACK_QUESTION,
    {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
      variables: param,
      onError: (error) => {
        toast({
          title: "Error Get Feedback !",
          description: error.message,
          status: "error",
          position: "bottom",
        });
      },
    }
  );

  useEffect(() => {
    if (query && query.data) {
      let newData = query.data.getFeedbackQuestion.reduce((prev: any, item) => {
        const key = item["title"];
        if (!prev[key]) prev[key] = [];
        prev[key].push(item);
        return prev;
      }, {});
      setData(newData);
    }
  }, [query]);
  return { ...query, newData };
};

export const useGetFeedbackAnswers = () => {
  const toast = useToast();
  const [fetchFeedbackAnswers, { loading, data }] = useLazyQuery<
    FeedbackAnswersResponse,
    FeedbackAnswersPayload
  >(GET_FEEDBACK_ANSWERS, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
  });

  return {
    fetchFeedbackAnswers,
    loading,
    data,
  };
};

export const useSubmitFeedback = () => {
  const toast = useToast();
  const [submitFeedback, { loading }] = useMutation<
    any,
    ISubmitFeedbackQuestion
  >(SUBMIT_FEEDBACK, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Success !",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    submitFeedback,
    loading,
  };
};
