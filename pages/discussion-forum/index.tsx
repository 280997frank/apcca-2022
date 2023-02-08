import React, { useState, useEffect } from "react";
import Layout from "@/components/Templates/Layout";
import desktopLandingPng from "@/assets/images/landing-desktop-bg.png";
import mobileLandingPng from "@/assets/images/landing-mobile-bg.png";
import {
  Box,
  Flex,
  Text,
  Alert,
  AlertDescription,
  Heading,
  Spacer,
  Button,
  useDisclosure,
  Td,
} from "@chakra-ui/react";
// import { isMobileOnly } from "react-device-detect";
import AddDiscussion from "@/components/Molecules/AddDiscussion";
import Table from "@/components/Atoms/Table";
import Pagination from "@/components/Atoms/Pagination";
import Router from "next/router";
import PlusIcon from "@/components/Atoms/Icons/PlusIcon";
import { useDiscussionForumList } from "@/hooks/discussion-forum";
import { DiscussionForumItem } from "@/types/discussion-forum";
import APCCAAndSPSIcons from "@/components/Atoms/APCCAAndSPSIcons";
const LIMIT = 10;

export default function DiscussionForum() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchDiscussionForumList, loading, data } = useDiscussionForumList({
    limit: LIMIT,
    page: currentPage,
    statusArray: ["LOCKED", "ACTIVE"],
  });

  useEffect(() => {
    fetchDiscussionForumList();
  }, [fetchDiscussionForumList, onClose]);

  const COLUMN_HEADERS = [
    {
      name: "title",
      label: "DISCUSSION",
      type: "onClick",
      bgColor: "#FFDD00",
      width: "60%",
    },
    { name: "creator", label: "STARTED BY", bgColor: "transparant" },
    { name: "totalReplies", label: "REPLIES", bgColor: "transparant" },
  ];
  const totalPage = data?.listThreads?.totalPage || 0;
  const newData = data?.listThreads?.data || [];

  const newDatas: any = [];

  newData.map((item: DiscussionForumItem) => {
    const { title, text, creator, totalReplies, id } = item;
    newDatas.push({
      creator: creator.firstName,
      title,
      text,
      totalReplies,
      id,
    });
  });

  return (
    <Layout title="Discussion Forum">
      <Box
        bgPosition="bottom"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        bgImage={{ base: mobileLandingPng.src, lg: desktopLandingPng.src }}
        height={{ base: "88vh", lg: "100%" }}
        overflowY="scroll"
        px={{ base: 6, lg: "unset" }}
        p={{ base: "20px", xl: "20px 30px" }}
      >
        <Flex
          flexDir={{ base: "column", md: "row" }}
          alignItems="center"
          my={{
            base: "20px",
            lg: "40px",
          }}
          gap="36px"
          // px={{ base: "20px", lg: "0px" }}
          // p={{ base: "20px", xl: "20px 30px" }}
        >
          <Text
            fontWeight="700"
            fontSize={{ base: "16px", md: "32px" }}
            lineHeight="normal"
            color="#222222"
            flex="1"
          >
            Discussion Forum
          </Text>
          <APCCAAndSPSIcons />
        </Flex>
        {/* {!isMobileOnly && ( */}
        <Box>
          <Heading pb="2rem" textTransform="uppercase" size="20px">
            instructions
          </Heading>
          <Box w="100%" display="flex" justifyContent="center" mb="2rem">
            <Alert
              backgroundColor="#FFFAE0"
              justifyContent="center"
              // height="63px"
              // maxW={{ base: "348px", md: "100%" }}
              borderRadius={{ base: "16px", md: "0px" }}
            >
              <AlertDescription
                fontWeight="600"
                letterSpacing=".2px"
                fontSize="16px"
                lineHeight="25px"
                color="#000000"
                textAlign="justify"
              >
                {/* Participants may start a new discussion thread or reply to
                  posts on existing threads, for follow-up discussions and
                  questions on the APCCA presentations */}
                This forum offers a platform to continue discussions following
                the presentations. It is our hope to create a safe space and a
                supportive community for learning and sharing.
                {/* <br /> */}
                Click on the different discussion headers below to see more
                details or reply to existing discussions!
                {/* <br /> */}
                You may also start a new discussion using the “+ Add Discussion”
                button.
                <br />
                <br />
                Please note:
                <br />
                The views expressed are those of individual contributors and not
                necessarily those of the host country.
                {/* <br /> */}
                You are encouraged to engage in polite, professional
                discussions. Posts seeking to inflame or instigate will not be
                welcomed.
                {/* <br /> */}
                We wish to keep discussions inclusive and request that you carry
                out your discussions in English. The discussion forum will be
                monitored, and posts may be moderated where deemed necessary.
              </AlertDescription>
            </Alert>
          </Box>
        </Box>
        {/* )} */}

        <Flex mb="1rem" alignItems="center">
          <Button
            colorScheme="black"
            variant="outline"
            minWidth="auto"
            onClick={() => onOpen()}
          >
            <Flex>
              <PlusIcon pt="2px" />
              <Text pt="2px" pl="10px">
                Add Discussion
              </Text>
            </Flex>
          </Button>
          <Spacer />
          <Pagination
            onPrevClick={() =>
              currentPage <= 1
                ? setCurrentPage(1)
                : setCurrentPage(currentPage - 1)
            }
            onNextClick={() =>
              currentPage < totalPage
                ? setCurrentPage(currentPage + 1)
                : setCurrentPage(totalPage)
            }
            total={totalPage}
            currentPage={currentPage}
            onChange={(e) => {
              if (e.currentTarget.value === "") return;
              setCurrentPage(parseInt(e.currentTarget.value));
            }}
          />
        </Flex>

        <Box mt="2rem" overflow="scroll">
          <Table<DiscussionForumItem>
            loading={loading}
            columnHeaders={COLUMN_HEADERS}
            onTitleClick={(id: string, title: string) => (
              <Td
                cursor="pointer"
                onClick={() =>
                  Router.push(`/discussion-forum/${encodeURIComponent(id)}`)
                }
              >
                {title}
              </Td>
            )}
            data={newDatas}
          />
        </Box>
      </Box>
      <AddDiscussion
        isOpen={isOpen}
        onClose={onClose}
        reRenderDataList={fetchDiscussionForumList}
      />
    </Layout>
  );
}
