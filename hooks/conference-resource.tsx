import { IResponseGetConferenceResourceByDate } from "@/types/conference-resource";
import { gql, useLazyQuery } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

const GET_CONFERENCE_RESOURCE_BY_DATE = gql`
  query getConferenceResourceByDate(
    $getConferenceResourceInput: GetConferenceResourceInput!
  ) {
    getConferenceResourceByDate(
      getConferenceResourceInput: $getConferenceResourceInput
    ) {
      id
      startAt
      endAt
      title
      descriptionOne
      descriptionTwo
      videos {
        id
        title
        description
        url
        materialType
      }
      documents {
        id
        title
        description
        url
        materialType
      }
    }
  }
`;

export const useGetConferenceResourceByDate = () => {
  const toast = useToast();
  const [getConferenceResourceByDate, { data, loading, called }] =
    useLazyQuery<IResponseGetConferenceResourceByDate>(
      GET_CONFERENCE_RESOURCE_BY_DATE,
      {
        onError: (error) => {
          toast({
            title: error.message,
            position: "bottom",
            isClosable: true,
            status: "error",
          });
        },
      }
    );

  return {
    getConferenceResourceByDate,
    data,
    loading,
    called,
  };
};
