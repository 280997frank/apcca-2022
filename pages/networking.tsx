import _, { remove } from "lodash";
import React, { /* useCallback, */ useEffect, useState } from "react";
import {
  Alert,
  // AlertDescription,
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Stack,
  HStack,
} from "@chakra-ui/react";

import { ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import { useGetAttendeeList } from "@/hooks/networking";
import Layout from "@/components/Templates/Layout";
// import SPS_logo from "@/assets/images/sps-logo.png";
import { isMobileOnly, isTablet } from "react-device-detect";
import UserItemCard from "@/components/Molecules/UserItemCard";
// import APCCA_hr_logo from "@/assets/images/APCCA logo HR 1.png";
import mobileLandingPng from "@/assets/images/landing-mobile-bg.png";
import desktopLandingPng from "@/assets/images/landing-desktop-bg.png";
import UpdateProfileModals from "@/components/Organisms/networking/UpdateProfile";
import MessageNotification from "@/components/Organisms/networking/MessageNotification";
// import VideoCallNotification from "@/components/Organisms/networking/VideoCallNotification";
import ChatBoxNetworking from "@/components/Organisms/ChatBoxNetworking";
import InfiniteScroll from "react-infinite-scroll-component";
import { TMsgNotif, useChatToken, useMessagingChannel } from "@/hooks/chat";
import ChatProvider from "@/components/Organisms/ChatProvider";
// import AgoraVideoCall from "@/components/Organisms/AgoraVideoCall";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { RootState } from "@/states/store";
import { actions as chatAction } from "states/chat/slice";
// import {
//   useAgoraRTCInitiateVideoCall,
//   useListNotificationVideoCall,
//   useReadVideoCallNotification,
// } from "@/hooks/agora";
// import { useDispatch } from "react-redux";
// import { actions as agoraActions } from "@/states/agora/slices";
import useChatDispatch from "@/states/chat/dispatch";
import APCCAAndSPSIcons from "@/components/Atoms/APCCAAndSPSIcons";

// const VIDEO_CALL_NOTIFICATIONS_LIMIT = 4;

const tabActiveStyle = {
  color: "#333",
  borderColor: "#FFDD00",
  borderBottomWidth: "4px",
};

const tabStyle = {
  shadow: "none !important",
  bgColor: "transparent !important",
  color: "#9B9B9B",
};

const btnStyle = {
  fontWeight: "normal",
  fontSize: "sm",
  bgColor: "#FFDD00 !important",
  mr: "5",
  shadow: "none !important",
};

const ContentPage = () => {
  // const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();
  const [isCreating, setCreating] = useState(false);
  const [checkedUser, setCheckedUser] = useState<string[]>([]);
  const { initChannel, openChannel } = useMessagingChannel();
  const dispatch = useDispatch();
  const { totalUnread } = useChatDispatch();

  const [tabIndex, setTabIndex] = React.useState(0);

  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  // const [pageVideoCallNotification, setPageVideoCallNotification] = useState(1);
  const [search, setSearch] = useState("");
  // const [channelName, setChannelName] = useState("");
  // const [isVideoCallOpen, setVideoCallOpen] = useState(false);
  // const [isInitialCall, setInitialCall] = useState(false);

  // const [isOpenPC, setOpenPC] = useState(false);
  // const [dataAttendee, setDataAttendee] = useState({
  //   id: "",
  // });

  const { firstName, lastName } = useSelector(
    (state: RootState) => state.user,
    shallowEqual
  );

  const {
    fetchAttendeeList,
    data,
    loading: queryLoading,
    hasMore,
    setListData,
  } = useGetAttendeeList();

  // const {
  //   fetchListNotification,
  //   data: videoCallNotificationData,
  //   loading: videoCallNotificationLoading,
  // } = useListNotificationVideoCall({
  //   id: id,
  //   page: pageVideoCallNotification,
  //   limit: VIDEO_CALL_NOTIFICATIONS_LIMIT,
  // });

  // const { readVideoCallNotification } = useReadVideoCallNotification();

  // const { initiateVideoCall } = useAgoraRTCInitiateVideoCall();

  const handleSearch = _.debounce(async (e: any) => {
    setListData([]);
    setPage(1);
    setSearch(e.target.value);
  }, 1000);

  const handleChat = async (members: string[]) => {
    // setDataAttendee({
    //   id: user.id,
    // });
    // setOpenPC(true);
    await initChannel(members);
    setTabIndex(1);
    dispatch(chatAction.setOpen(true));
    cancelCreateGroup();
  };

  const cancelCreateGroup = () => {
    setCreating(false);
    setCheckedUser([]);
  };

  const handleChatOnNotifList = (msgNotif: TMsgNotif) => {
    openChannel(msgNotif.cid.replace("messaging:", ""));
    setTabIndex(1);
    dispatch(chatAction.setOpen(true));
    // console.log(msgNotif);
    // setDataAttendee({
    //   id: user.id,
    // });
    // setOpenPC(true);
  };

  // const handleVideoCall = useCallback(
  //   (originalChannelName: string) => {
  //     initiateVideoCall({
  //       variables: {
  //         videoCallInput: {
  //           recipientId: originalChannelName,
  //           recipientName: "",
  //         },
  //       },
  //     }).then((result) => {
  //       if (result && result.data) {
  //         setChannelName(result.data.initialVideoCall);
  //         setInitialCall(false);
  //         setVideoCallOpen(true);
  //       }
  //     });
  //   },
  //   [initiateVideoCall]
  // );

  // const videoNotificationClickHandle = useCallback(
  //   ({
  //     notificationId,
  //     videoCallId,
  //   }: {
  //     notificationId: string;
  //     videoCallId: string;
  //   }) => {
  //     readVideoCallNotification({
  //       variables: {
  //         readNotificationInput: {
  //           notificationId: notificationId,
  //         },
  //       },
  //       onCompleted: () => {
  //         fetchListNotification();
  //         setChannelName(videoCallId);
  //         setInitialCall(false);
  //         setVideoCallOpen(true);
  //       },
  //     });
  //   },
  //   [readVideoCallNotification, fetchListNotification]
  // );

  useEffect(() => {
    fetchAttendeeList({
      variables: { listAttendeeInput: { page, limit, search } },
    });
    // setPageVideoCallNotification(1);
    // fetchListNotification();
  }, [fetchAttendeeList, limit, page, search]);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(agoraActions.setUsers({ users: data }));
  //   }
  // }, [data, dispatch]);

  return (
    <Box
      id="scrollableDiv"
      overflow="auto"
      as="article"
      bgPosition="bottom"
      bgRepeat="no-repeat"
      bgSize="100% 100%"
      h={{ base: "100%", md: "100%", lg: "100%" }}
      bgImage={{ base: mobileLandingPng.src, lg: desktopLandingPng.src }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={async () => {
          setPage((prev) => prev + 1);
          // await fetchAttendeeList({
          //   variables: { listAttendeeInput: { page: page+1, limit, search } },
          // });
        }}
        hasMore={hasMore}
        scrollableTarget="scrollableDiv"
        loader={
          hasMore && (
            <Box
              h="40vh"
              pt="10px"
              bg={isMobileOnly || isTablet ? "" : "rgba(255,255,255,0.6)"}
            >
              &nbsp;
            </Box>
          )
        }
      >
        <Flex
          minH="100vh"
          p={{ base: "0px 20px", xl: "20px 30px" }}
          flexDir="column"
          bg={isMobileOnly || isTablet ? "" : "rgba(255,255,255,0.6)"}
          sx={{
            "@media (orientation: portrait) and (min-width: 62em)": {
              h: "auto",
              flexDir: "column",
            },
          }}
        >
          {/* first navbar */}
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            justifyContent="space-between"
            alignItems="center"
            w="full"
            gap={{ base: "36px", lg: 0 }}
            py="40px"
          >
            <Heading
              fontWeight="700"
              fontSize={{ base: "19px", md: "32px" }}
              lineHeight="normal"
              color="#222222"
              flex="1"
            >
              Networking
            </Heading>
            <APCCAAndSPSIcons />
          </Flex>
          <Box w="100%">
            <Heading
              textTransform="uppercase"
              fontWeight="700"
              fontSize={{ base: "18px", md: "20px" }}
              lineHeight="normal"
              color="#222222"
            >
              instructions
            </Heading>
            <Text
              my={{
                base: "1rem",
                lg: "2rem",
              }}
              fontSize={{ base: "16px", md: "20px" }}
              lineHeight="normal"
              textAlign="justify"
            >
              Connect with participants from around the world!
            </Text>
            <Alert
              my={{
                base: "1rem",
                lg: "2rem",
              }}
              backgroundColor="#FFFAE0"
              borderRadius={{ base: "16px", md: "0px" }}
              fontWeight="600"
              letterSpacing=".3px"
              textAlign="justify"
              display="flex"
              flexDir="column"
              gap="15px"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Text>
                Choose a profile photo (at the top right icon) and navigate
                through the different attendees.
                <br />
                Those with green icons indicated on their profile are online!
              </Text>
              <Text>
                Click on the Chat icon to reach out to a presenter or fellow
                participant.
                <br />
                You can invite others into the chat for group discussions and
                sharing too!
                <br />
                Should there be attendees who would like to chat with you, a
                notification alert will appear to inform you of an incoming
                message.
              </Text>
            </Alert>
          </Box>
          <Tabs
            index={tabIndex}
            isFitted
            onChange={(index) => setTabIndex(index)}
          >
            <Stack
              flexDirection={["column", "row"]}
              justifyContent="space-between"
            >
              {/* subnavbar */}
              <TabList borderBottom="none">
                <Tab sx={tabStyle} _selected={tabActiveStyle}>
                  PARTICIPANTS
                </Tab>
                <Tab
                  isDisabled={isCreating}
                  sx={tabStyle}
                  _selected={tabActiveStyle}
                >
                  CHAT
                  {totalUnread > 0 && (
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      w="20px"
                      h="20px"
                      rounded="full"
                      bgColor="#DA2229"
                      mx="2"
                    >
                      <Text fontSize="xs" color="#fff" fontWeight="bold">
                        {totalUnread}
                      </Text>
                    </Flex>
                  )}
                </Tab>
              </TabList>
              <Flex
                flexDir="row"
                justifyContent={["space-between", "flex-end"]}
                alignItems="center"
                // w="full"
                h="100%"
                py={4}
              >
                {isCreating ? (
                  <>
                    <Button
                      sx={{
                        ...btnStyle,
                        color: "#DA2229",
                        bgColor: "#FFD1D1 !important",
                      }}
                      onClick={cancelCreateGroup}
                    >
                      Cancel
                    </Button>
                    <Button
                      sx={btnStyle}
                      rightIcon={<ArrowForwardIcon />}
                      isDisabled={checkedUser.length < 2}
                      onClick={() => handleChat(checkedUser)}
                    >
                      Create Group Chat
                    </Button>
                  </>
                ) : (
                  <Button
                    sx={btnStyle}
                    onClick={() => {
                      setCreating(true);
                      setTabIndex(0);
                    }}
                  >
                    New Group Chat
                  </Button>
                )}
                <HStack>
                  {/* {notificationList && notificationList.listNotifications && ( */}
                  <MessageNotification handleChat={handleChatOnNotifList} />
                  {/* )} */}
                  {/* <VideoCallNotification
                data={videoCallNotificationData}
                loading={videoCallNotificationLoading}
                handleClick={videoNotificationClickHandle}
              /> */}
                  <Avatar
                    borderRadius="5px"
                    cursor="pointer"
                    boxSize="2.2rem"
                    fontSize="1rem"
                    size="md"
                    fontWeight="bold"
                    name={
                      firstName && lastName ? `${firstName} ${lastName}` : "E D"
                    }
                    bg="#6C6E80"
                    color="white"
                    // src="https://bit.ly/broken-link"
                    // ref={btnRef}
                    onClick={onToggle}
                  />
                  <UpdateProfileModals onToggle={onToggle} isOpen={isOpen} />
                </HStack>
              </Flex>
            </Stack>

            <TabPanels>
              <TabPanel>
                {/* Input search */}
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none" fontSize=".9rem">
                    <SearchIcon />
                  </InputLeftElement>
                  <Input
                    bg="white"
                    fontSize=".9rem"
                    type="search"
                    fontFamily="roboto"
                    name="q"
                    placeholder="Search for attendees"
                    _focus={{ outline: "none" }}
                    autoComplete="off"
                    onChange={handleSearch}
                  />
                </InputGroup>
                {/* Content */}
                <Grid
                  mt={5}
                  gap={5}
                  gridTemplateColumns={{
                    base: "1fr",
                    md: "repeat(auto-fill, minmax(18rem, auto))",
                  }}
                >
                  {data &&
                    data.map((item, i) => {
                      return (
                        <UserItemCard
                          key={i}
                          onCheck={(id) => setCheckedUser([...checkedUser, id])}
                          onUnCheck={(id) => {
                            // const arr = [...checkedUser];
                            // const index = arr.findIndex(
                            //   (value) => value === id
                            // );
                            // if (index > -1) {
                            //   arr.splice(index, 1);
                            // }
                            // setCheckedUser(arr);
                            const newCheckedUser = remove(
                              [...checkedUser],
                              (val) => val === id
                            );
                            setCheckedUser(newCheckedUser);
                          }}
                          data={item}
                          showCheckbox={isCreating}
                          handleChat={(userId) => handleChat([userId])}
                          handleVideoCall={(channelName) => {
                            console.log({ channelName });
                            // handleVideoCall(channelName);
                          }}
                        />
                      );
                    })}
                </Grid>
                {queryLoading && (
                  <Center mt="20px">
                    <Spinner />
                  </Center>
                )}
              </TabPanel>
              <TabPanel p={0}>
                <Box h="100%">
                  <ChatBoxNetworking />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
        {/* subnavbar */}
      </InfiniteScroll>
    </Box>
  );
};

export default function NetworkingPage() {
  const { data, loading } = useChatToken();

  return (
    <Layout title="Networking" isPrivate>
      {loading && (
        <Center h="100vh">
          <Spinner size="lg" />
        </Center>
      )}
      {data && (
        <ChatProvider data={data}>
          <ContentPage />
        </ChatProvider>
      )}
      {/* <ChatBoxNetworking
        isOpen={isOpenPC}
        onClose={() => setOpenPC(false)}
        dataAttendee={dataAttendee}
      /> */}
      {/* <AgoraVideoCall
        channelName={channelName}
        id={id}
        isOpen={isVideoCallOpen}
        name={`${firstName} ${lastName}`}
        setChannelName={setChannelName}
        setOpen={setVideoCallOpen}
        initial={isInitialCall}
      /> */}
    </Layout>
  );
}
