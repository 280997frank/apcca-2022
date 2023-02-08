import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Center, useToast } from "@chakra-ui/react";
import "@zoomus/websdk/dist/css/bootstrap.css";
import "@zoomus/websdk/dist/css/react-select.css";

import { ZoomMtg } from "@zoomus/websdk";
import { useZoomToken } from "@/hooks/zoom";
import { RootState } from "@/states/store";
import { getAccessToken } from "@/utils";
import { actions as zoomActions } from "@/states/zoom/slice";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.6.0/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("en-US");
ZoomMtg.i18n.reload("en-US");

function ZoomMeeting() {
  const { loading, getZoomToken, token } = useZoomToken();
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const { meetingNumber, passWord, isReady, userName, userEmail } = useSelector(
    (state: RootState) => ({
      meetingNumber: state.zoom.meetingNumber,
      passWord: state.zoom.passWord,
      isReady: state.zoom.isReady,
      userName: `${state.user.firstName} ${state.user.lastName}`,
      userEmail: state.user.email,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!getAccessToken()) {
      router.push("/login");
    }

    if (!isReady) {
      window.location.href = "/breakout-rooms";
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (token) {
      startMeeting(token);
    }
    // eslint-disable-next-line
  }, [token]);

  const clearState = () => {
    dispatch(zoomActions.clear());
  };

  function startMeeting(signature: string) {
    const zoomroot = document.getElementById("zmmtg-root");
    if (zoomroot) {
      zoomroot.style.display = "block";
    }

    ZoomMtg.init({
      leaveUrl: "/breakout-rooms",
      success: (success: any) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: process.env.NEXT_PUBLIC_ZOOM_SDK_KEY as string,
          userEmail: userEmail,
          passWord: passWord,
          tk: "",
          success: () => {
            // console.log(success);
            clearState();
          },
          error: (error: any) => {
            // console.log(error);
            toast({
              title: error,
              position: "bottom",
              isClosable: true,
              status: "error",
            });
            clearState();
          },
        });
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  useEffect(() => {
    if (isReady) {
      getZoomToken({
        variables: {
          zoomTokenInput: {
            meetingNumber,
            role: 0,
          },
        },
      });
    }
    //eslint-disable-next-line
  }, [isReady]);

  if (loading) {
    return <Center h="100vh">Loading ......</Center>;
  }

  return <div className="App">&nbsp;</div>;
}

export default ZoomMeeting;
