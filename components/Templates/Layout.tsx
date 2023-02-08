import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import type { ReactNode } from "react";
import React, { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import DrawerItems from "@/components/Molecules/DrawerItems";
import Navbar from "@/components/Organisms/Navbar";

import { useGetUser } from "@/hooks/auth";
import { actions as userActions } from "@/states/user/slice";
import { getAccessToken } from "@/utils";
import Joyride, { Step } from "react-joyride";
import { TooltipTutorial } from "@/components/Atoms/TooltipTutorial";
import { actions as tutorialAction } from "@/states/tutorial/slice";
import NotifChat from "@/components/Atoms/NotifChat";
// import { actions as agoraActions } from "@/states/agora/slices";
// import dynamic from "next/dynamic";
// import useAgoraRTM from "@/hooks/agora";
// import { RootState } from "@/states/store";

interface LayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  isPrivate?: boolean;
  contentOverflow?: string;
}

const tutorialState: Step[] = [
  {
    target: ".tutorial-1",
    disableBeacon: true,
    title: "MAIN MENU",
    content: "Navigation used to access various features",
    placement: "right",
  },
  {
    target: ".tutorial-2",
    disableBeacon: true,
    title: "HIGHLIGH OF THE DAY",
    content: "show the current highlight event",
    placement: "top",
  },
  {
    target: ".tutorial-3",
    disableBeacon: true,
    title: "LIVE CHAT",
    content: "a place for participants to interact",
    placement: "left",
  },
];

// const DynamicAgoraRTM = dynamic(
//   () => import("@/components/Atoms/Agora/AgoraRTMComponent"),
//   {
//     ssr: false,
//   }
// );

export default function Layout({
  children,
  title,
  description,
  isPrivate = false,
  ...props
}: LayoutProps) {
  const layoutRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { getUser, data: dataUser, loading, called } = useGetUser();

  // state
  const [isOpenSidebar, setOpenSidebar] = useState(false);
  const [isChecking, setChecking] = useState(true);
  // const { rtmToken } = useAgoraRTM({
  //   getUser: dataUser?.getUser,
  // });

  const { openTutorial /* agoraState */ } = useSelector(
    () => ({
      openTutorial: false,
      // agoraState: state.agora.agoraState,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (getAccessToken()) {
      getUser();
    }
  }, [getUser]);

  useEffect(() => {
    if (isPrivate && !getAccessToken()) {
      router.push("/login");
    }
  }, [isPrivate, router]);

  useEffect(() => {
    if (!isPrivate) {
      setChecking(false);
    } else if (!loading && called) {
      if (!dataUser) {
        dispatch(
          userActions.setProfile({
            id: "",
            email: "",
            firstName: "",
            lastName: "",
            profilePicture: "",
            orgUnit: "",
          })
        );
      }

      if (isPrivate && !dataUser) {
        // dispatch(agoraActions.setLoggedIn({ agoraState: "loggedOut" }));
        router.push("/login");
      }

      if (dataUser) {
        dispatch(
          userActions.setProfile({
            id: dataUser?.getUser?.id,
            email: dataUser?.getUser?.email,
            firstName: dataUser?.getUser?.firstName,
            lastName: dataUser?.getUser?.lastName,
            profilePicture: dataUser?.getUser?.profilePicture,
            orgUnit: dataUser?.getUser?.orgUnit,
          })
        );

        setChecking(false);
      }
    }
  }, [loading, dataUser, called, isPrivate, dispatch, router]);

  if (isChecking) {
    return null;
  }

  return (
    <>
      <Joyride
        steps={tutorialState}
        run={openTutorial}
        debug={false}
        disableOverlay={false}
        tooltipComponent={TooltipTutorial}
        styles={{
          options: {
            arrowColor: "none",
          },
        }}
      />
      {openTutorial && (
        <Box position="absolute" bottom="2%" right="5%" zIndex={500}>
          <Button
            bgColor="#FFFAE0"
            height="72px"
            px="70px"
            _hover={{ bg: "#FFFAE0" }}
            onClick={() => {
              dispatch(
                tutorialAction.setOpenTutorial({
                  isOpen: false,
                })
              );
              // setOpenTutorial(false)
            }}
          >
            {" "}
            SKIP INTRODUCTION
          </Button>
        </Box>
      )}
      <Head>
        <title>{title} | APCCA 2022</title>
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="/modernizr-webp.js" />
      {title === "Welcome" ? (
        <Box>{children}</Box>
      ) : (
        <Box
          as="main"
          ref={layoutRef}
          w={{ base: "100vw", lg: "100%" }}
          h="100vh"
          maxHeight="-webkit-fill-available"
          display="flex"
          flexDir={{ base: "column", lg: "row" }}
          bgRepeat="no-repeat"
          bgPosition="center"
          bgSize="cover"
          overflow="hidden"
          pb={{ base: 0, sm: 0 }}
          sx={{
            overflow: "hidden !important",
            "@supports (-webkit-touch-callout: none)": {
              paddingBottom: "0 !important",
            },
          }}
          {...props}
        >
          <Drawer
            placement="left"
            onClose={() => setOpenSidebar(false)}
            isOpen={isOpenSidebar}
          >
            <DrawerContent opacity="0.98" height="100%" mt="101px">
              <DrawerBody opacity="0.9" overflowY="auto" p="0px !important">
                <DrawerItems
                  onClose={(i) => {
                    setOpenSidebar(i);
                  }}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <Navbar onOpen={() => setOpenSidebar(true)} isOpen={isOpenSidebar} />
          <Box overflow="hidden auto" flex="1" mt={0}>
            {/* agoraState === "" && dataUser && (
              <DynamicAgoraRTM
                token={rtmToken}
                uid={dataUser.getUser.id}
                username={`${dataUser.getUser.firstName} ${dataUser.getUser.lastName}`}
                picture={
                  dataUser.getUser.profilePicture
                    ? dataUser.getUser.profilePicture
                    : "https://placebeard.it/200x200"
                }
              />
            )} */}
            {children}
          </Box>
          {isPrivate && <NotifChat />}
        </Box>
      )}
    </>
  );
}
