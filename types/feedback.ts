export interface IReqFeedbackQuestion {
  feedbackQuestionInput: {
    eventDate: string;
  };
}

export enum EInputType {
  TEXT = "TEXT",
  RADIO_BUTTON = "RADIO_BUTTON",
  CHECKBOX = "CHECKBOX",
}

export interface IFeedbackQuestion {
  id: string;
  evenDate: string;
  title: string;
  sequence: number;
  answerType: EInputType;
  question: string;
  choices: string;
}

export interface IResFeedbackQuestions {
  getFeedbackQuestion: IFeedbackQuestion[];
}

export interface IAnswer {
  questionId: string;
  answer: string;
}

export interface ISubmitFeedbackQuestion {
  feedbackAnswerInput: {
    answers: IAnswer[];
  };
}

export interface FeedbackAnswersResponse {
  getfeedbackAnswer: {
    questionId: string;
    answer: string;
    eventDate: string;
  }[];
}

export interface FeedbackAnswersPayload {
  feedbackAnswerInput: {
    eventDate: string;
  };
}
