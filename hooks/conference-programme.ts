import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import {
  IPayloadConferenceByDate,
  IResConferenceByDate,
} from "@/types/conference";
import { gql, useLazyQuery } from "@apollo/client";
import { useErrorMessage } from ".";

const GET_CONFERENCE_BY_DATE = gql`
  query getConferenceByDate(
    $getConferenceByDateInput: GetConferenceByDateInput!
  ) {
    getConferenceByDate(getConferenceByDateInput: $getConferenceByDateInput) {
      id
      startAt
      endAt
      title
      descriptionOne
      descriptionTwo
      thumbnail
      isLive
      slidoUrl
    }
  }
`;

export const useGetConferenceByDate = () => {
  const [fetchConferenceByDate, { data, loading, error }] = useLazyQuery<
    IResConferenceByDate,
    IPayloadConferenceByDate
  >(GET_CONFERENCE_BY_DATE, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  });

  useErrorMessage(error);

  return {
    fetchConferenceByDate,
    data,
    loading,
    error,
  };
};

export const getDisabledButton = (
  index: number,
  currentTime: string,
  startAt: string,
  endAt: string
) => {
  let isDisabled = true;

  if (index === 0) {
    if (
      dayjs(currentTime).isBefore(dayjs(endAt)) &&
      dayjs(startAt).diff(dayjs(currentTime), "minutes") <= 30
    ) {
      isDisabled = false;
    }
  } else if (dayjs(currentTime).isBetween(dayjs(startAt), dayjs(endAt))) {
    isDisabled = false;
  }
  return isDisabled;
};
