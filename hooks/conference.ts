import _ from "lodash";
import {
  IResponseGetConference,
  IResponseGetConferences,
} from "@/types/conference-resource";
import { gql, useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

const GET_CONFERENCE = gql`
  query getConference($getConferenceInput: GetConferenceInput) {
    getConference(getConferenceInput: $getConferenceInput) {
      id
      startAt
      endAt
      title
      descriptionOne
      descriptionTwo
      thumbnail
      url
      slidoUrl
      speakers {
        id
        name
        designation
        profilePicture
      }
    }
  }
`;
const GET_CONFERENCES = gql`
  query getConferences($getConferencesInput: GetConferencesInput) {
    getConferences(getConferencesInput: $getConferencesInput) {
      id
      startAt
      endAt
      title
      descriptionOne
      descriptionTwo
      thumbnail
      url
      slidoUrl
      type
      speakers {
        id
        name
        designation
        profilePicture
      }
    }
  }
`;

export const useGetConference = () => {
  const toast = useToast();
  const [getConference, { data, loading, called }] =
    useLazyQuery<IResponseGetConference>(GET_CONFERENCE, {
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
    getConference,
    data,
    loading,
    called,
  };
};
export const useGetConferences = () => {
  const toast = useToast();
  const [getConferences, { data, loading, called }] =
    useLazyQuery<IResponseGetConferences>(GET_CONFERENCES, {
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
    getConferences,
    data,
    loading,
    called,
  };
};
