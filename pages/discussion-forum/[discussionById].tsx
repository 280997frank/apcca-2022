import React, { useState, useEffect, useRef } from "react";
import { Form, Formik } from "formik";
import Layout from "@/components/Templates/Layout";
import { INITIAL_PAGINATION } from "@/constants/pagination";
import desktopLandingPng from "@/assets/images/landing-desktop-bg.png";
import mobileLandingPng from "@/assets/images/landing-mobile-bg.png";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Heading,
  Spacer,
  Divider,
  Button,
  Img,
} from "@chakra-ui/react";
import TextInput from "@/components/Atoms/TextInput";
import { object } from "yup";
import { requiredString } from "@/constants/validationSchema";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import { isMobileOnly } from "react-device-detect";
import {
  useDiscussionForumById,
  useListRepliesById,
  useLikeThread,
  useReplyThread,
} from "@/hooks/discussion-forum";

import { DiscussionForumItem } from "types/discussion-forum";
import ThumbIcon from "@/components/Atoms/Icons/ThumbIcon";
import iconArrowLeft from "@/assets/icons/icon-arrow-left.svg";
dayjs.extend(relativeTime);

interface IInitialValueOfForm {
  text: string;
}
const validateForm = object({
  text: requiredString,
});

export default function DiscussionForum() {
  const { query, push } = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const [totalData, setTotalData] = useState<number>(0);
  const [listRepliesData, setListRepliesData] = useState([]);
  const { mutationLikeThread } = useLikeThread();
  const { mutationReplyThread } = useReplyThread();
  const { fetchDiscussionForumById, loading, data } = useDiscussionForumById();
  const [pagination, setPagination] = useState(INITIAL_PAGINATION);
  const [initialValueOfForm] = useState<IInitialValueOfForm>({
    text: "",
  });
  useEffect(() => {
    if (query.discussionById) {
      fetchDiscussionForumById({
        variables: { id: query.discussionById },
      });
    }
  }, [fetchDiscussionForumById, query.discussionById]);

  // list of repleis
  const { fetchListRepliesById, data: replies } = useListRepliesById({
    limit: 10,
    page: pagination.page,
    threadId: query.discussionById as string,
  });

  useEffect(() => {
    if (query.discussionById) {
      fetchListRepliesById();
    }
  }, [fetchListRepliesById, query.discussionById]);

  useEffect(() => {
    if (replies) {
      const {
        listReplies: { data: res, total },
      } = replies;
      setTotalData(total);
      if (pagination.page === 1) {
        setListRepliesData(res as any);
      } else {
        setListRepliesData((prevState): any => {
          if (prevState) {
            return [...prevState, ...res];
          } else {
            return res;
          }
        });
      }
    }
  }, [replies, pagination]);

  const getThreadById = data?.getThreadById;
  const repliesData = replies?.listReplies?.data || [];

  const focusText = () => {
    ref && ref.current && ref.current.focus();
  };

  return (
    <Layout title="Discussion Forum">
      {loading ? (
        <Text>Loading ...</Text>
      ) : (
        <Box
          bgPosition="bottom"
          bgRepeat="no-repeat"
          bgSize="100% 100%"
          bgImage={{ base: mobileLandingPng.src, lg: desktopLandingPng.src }}
          height={{ base: "88vh", lg: "100%" }}
          overflowY="scroll"
          px={{ base: 6, lg: "unset" }}
          p={{ base: "20px", xl: "10px 60px" }}
          id="scrollableDiv"
        >
          <Box my={8}>
            <Button
              variant="ghost"
              leftIcon={<Img src={iconArrowLeft.src} />}
              onClick={() => push("/discussion-forum")}
            >
              Back
            </Button>
          </Box>
          <Box>
            {!isMobileOnly && (
              <Flex alignItems="center">
                <Heading fontSize={24} w="90%">
                  {getThreadById?.title}{" "}
                </Heading>
                <Spacer />
                <Text fontSize={16}>
                  {dayjs(getThreadById?.createdAt).fromNow()}
                </Text>
              </Flex>
            )}

            <Text
              fontSize="24px"
              pt="2"
              dangerouslySetInnerHTML={{ __html: getThreadById?.text || "" }}
            />
            <Box display="flex" alignItems="center" gap="2" mt="1rem">
              <Avatar src={getThreadById?.creator?.profilePicture} />
              <Box lineHeight="18px" pt="8px">
                <Text fontSize="19px">{getThreadById?.creator?.firstName}</Text>
                <Text fontSize="16px">
                  {getThreadById?.creator?.jurisdiction?.country}
                </Text>
              </Box>
            </Box>
            <Box mt="1rem" display="flex" alignItems="center" gap="6">
              <Box display="flex" alignItems="center" gap="2">
                <ThumbIcon
                  cursor="pointer"
                  onClick={async () => {
                    await mutationLikeThread({
                      variables: { id: query.discussionById },
                    });
                    fetchDiscussionForumById({
                      variables: { id: query.discussionById },
                    });
                  }}
                />
                <Text fontSize="14px">{getThreadById?.likes?.length || 0}</Text>
              </Box>
              {getThreadById?.status !== "LOCKED" && (
                <Text fontSize="14px" fontWeight="bold" onClick={focusText}>
                  Reply
                </Text>
              )}
            </Box>
            {getThreadById?.status !== "LOCKED" && (
              <Box display="flex" alignItems="center" gap="2" mt="1rem">
                <Avatar src={getThreadById?.creator?.profilePicture} />
                <Box lineHeight="18px" w="100%">
                  <Formik
                    enableReinitialize
                    initialValues={initialValueOfForm}
                    validationSchema={validateForm}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      setSubmitting(true);
                      setSubmitting(false);

                      await mutationReplyThread({
                        variables: {
                          createReplyInput: {
                            text: values.text,
                            threadId: query.discussionById,
                          },
                        },
                      });
                      fetchListRepliesById();
                      resetForm();
                    }}
                  >
                    {({ isSubmitting }) => (
                      <>
                        <Form style={{ width: "100%" }}>
                          <TextInput
                            ref={ref}
                            isDisabled={isSubmitting}
                            backgroundColor="white"
                            minHeight="30px"
                            name="text"
                            id="text"
                            shadow="md"
                            outline="none"
                            borderColor="#787878"
                            resize="vertical"
                            placeholder="Reply"
                            _hover={{}}
                          />
                        </Form>
                      </>
                    )}
                  </Formik>
                </Box>
              </Box>
            )}

            <Divider mt="1.5rem" mb="1.5rem" borderColor="#787878" />
            {repliesData.length === 0 ? (
              <Text></Text>
            ) : (
              <InfiniteScroll
                dataLength={repliesData.length}
                next={() => {
                  setPagination({
                    page: pagination.page + 1,
                    limit: pagination.limit,
                  });
                }}
                hasMore={repliesData.length < totalData}
                loader={<Text color="white">Loading...</Text>}
                scrollableTarget="scrollableDiv"
              >
                {listRepliesData.map(
                  (item: DiscussionForumItem, index: number) => (
                    <Box bgColor="white" p="1rem" key={index}>
                      <Flex alignItems="center">
                        <Box display="flex" alignItems="center" gap="2">
                          <Avatar src={item?.creator?.profilePicture} />
                          <Box lineHeight="18px">
                            <Text fontSize="19px">
                              {item?.creator?.firstName}
                            </Text>
                            <Text fontSize="16px">
                              {item?.creator?.jurisdiction?.country}
                            </Text>
                          </Box>
                        </Box>
                        <Spacer />
                      </Flex>
                      <Text
                        fontSize="24px"
                        pt="2"
                        dangerouslySetInnerHTML={{
                          __html: item?.text || "",
                        }}
                      />
                      <Box mt="1rem" display="flex" alignItems="center" gap="6">
                        <Box display="flex" alignItems="center" gap="2">
                          <ThumbIcon
                            onClick={async () => {
                              await mutationLikeThread({
                                variables: { id: item.id },
                              });
                              fetchListRepliesById();
                            }}
                            cursor="pointer"
                          />
                          <Text fontSize="14px">
                            {item?.likes?.length || 0}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  )
                )}
              </InfiniteScroll>
            )}
          </Box>
        </Box>
      )}
    </Layout>
  );
}
