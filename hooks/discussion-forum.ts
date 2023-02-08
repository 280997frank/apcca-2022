import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useErrorMessage } from "@/hooks";

import type {
  DiscussionForumItem,
  DiscussionForumParams,
  DiscussionForumByIdResponse,
  RepliesParams,
} from "@/types/discussion-forum";

interface DiscussionForumListResponse {
  listThreads: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    data: DiscussionForumItem[];
  };
}

interface ListRepliesResponse {
  listReplies: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    data: DiscussionForumItem[];
  };
}

const GET_DISCUSSION_LIST = gql`
  query listThreads($param: ListThreadsInput!) {
    listThreads(param: $param) {
      data {
        id
        text
        title
        status
        createdAt
        creator {
          firstName
        }
        totalReplies
      }
      total
      totalPage
    }
  }
`;

export function useDiscussionForumList(params: DiscussionForumParams) {
  const [fetchDiscussionForumList, { loading, error, data }] =
    useLazyQuery<DiscussionForumListResponse>(GET_DISCUSSION_LIST, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: {
        param: params,
      },
    });

  useErrorMessage(error);

  return {
    fetchDiscussionForumList,
    loading,
    data,
  };
}

//========== INSERT MUTATION ==========
export const useAddPost = () => {
  const MUTATION_ADD_POST = gql`
    mutation createThread($createThreadInput: CreateThreadInput!) {
      createThread(createThreadInput: $createThreadInput) {
        text
      }
    }
  `;
  const toast = useToast();

  const [mutationAddPost, { loading, error, data }] = useMutation(
    MUTATION_ADD_POST,
    {
      onCompleted: () => {
        toast({
          title: "Success",
          position: "bottom",
          isClosable: true,
          status: "success",
        });
        // router.push("/");
      },
    }
  );

  useErrorMessage(error);

  return {
    mutationAddPost,
    loading,
    data,
  };
};

const GET_DISCUSSION_BY_ID = gql`
  query getThreadById($id: String!) {
    getThreadById(id: $id) {
      id
      text
      title
      createdAt
      status
      creator {
        firstName
        profilePicture
        jurisdiction {
          id
          country
        }
      }
      likes {
        id
      }
      totalReplies
      createdAt
    }
  }
`;

export function useDiscussionForumById() {
  const [fetchDiscussionForumById, { loading, error, data }] =
    useLazyQuery<DiscussionForumByIdResponse>(GET_DISCUSSION_BY_ID, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    });

  useErrorMessage(error);

  return {
    fetchDiscussionForumById,
    loading,
    data,
  };
}

// list replies

const GET_LIST_REPLIES_BY_ID = gql`
  query listReplies($param: ListRepliesInput!) {
    listReplies(param: $param) {
      data {
        id
        createdAt
        text
        creator {
          firstName
          profilePicture
          jurisdiction {
            id
            country
          }
        }
        likes {
          id
        }
        replies {
          id
          createdAt
          text
          likes {
            id
          }
          creator {
            firstName
            profilePicture
            jurisdiction {
              id
              country
            }
          }
        }
      }
      total
      totalPage
      page
      limit
    }
  }
`;

export function useListRepliesById(params: RepliesParams) {
  const [fetchListRepliesById, { loading, error, data }] =
    useLazyQuery<ListRepliesResponse>(GET_LIST_REPLIES_BY_ID, {
      notifyOnNetworkStatusChange: true,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: {
        param: params,
      },
    });

  useErrorMessage(error);

  return {
    fetchListRepliesById,
    loading,
    data,
  };
}

//========== INSERT MUTATION ==========
export const useLikeThread = () => {
  const MUTATION_LIKE_THREAD = gql`
    mutation toggleLikeThreadOrReply($id: String!) {
      toggleLikeThreadOrReply(id: $id) {
        success
      }
    }
  `;
  const toast = useToast();

  const [mutationLikeThread, { loading, error, data }] = useMutation(
    MUTATION_LIKE_THREAD,
    {
      onCompleted: () => {
        toast({
          title: "Success",
          position: "bottom",
          isClosable: true,
          status: "success",
        });
        // router.push("/");
      },
    }
  );

  useErrorMessage(error);

  return {
    mutationLikeThread,
    loading,
    data,
  };
};

export const useReplyThread = () => {
  const MUTATION_REPLY_THREAD = gql`
    mutation createReply($createReplyInput: CreateReplyInput!) {
      createReply(createReplyInput: $createReplyInput) {
        id
      }
    }
  `;
  const toast = useToast();

  const [mutationReplyThread, { loading, error, data }] = useMutation(
    MUTATION_REPLY_THREAD,
    {
      onCompleted: () => {
        toast({
          title: "Success",
          position: "bottom",
          isClosable: true,
          status: "success",
        });
      },
    }
  );

  useErrorMessage(error);

  return {
    mutationReplyThread,
    loading,
    data,
  };
};
