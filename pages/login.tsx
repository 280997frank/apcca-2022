import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Link,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";

import { TiInfoLarge } from "react-icons/ti";

import landingDekstopBg from "@/assets/images/landing-desktop-bg.png";
import landingMobileBg from "@/assets/images/landing-mobile-bg.png";
import apccaLogo from "@/assets/images/apcca-logo.png";
import spsLogo from "@/assets/images/sps-logo.png";
import apccaEventLogo from "@/assets/images/apcca-event-logo.png";

import CountDown from "@/components/Molecules/CountDown";
import LoginForm from "@/components/Molecules/LoginForm";
import { useForgetPassword, useLoginSubmit } from "@/hooks/auth";
import { getAccessToken, storeAccessToken } from "../utils";
import Helpdesk from "@/components/Molecules/Helpdesk";
import RegistrationForm from "@/components/Molecules/RegistrationForm";
import { useCountdown, useWindowSize } from "../hooks";
import ForgotPasswordForm from "@/components/Molecules/ForgotPasswordForm";
import { actions as tutorialAction } from "@/states/tutorial/slice";
// import { actions as agoraActions } from "@/states/agora/slices";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

interface IRegisterButtonProps {
  setIsLauncing: (state: boolean) => void;
  onOpenRegistration: () => void;
}

const RegisterButton = ({
  onOpenRegistration,
  setIsLauncing,
}: IRegisterButtonProps) => {
  const [isDateAfter23Sept1PM, setDateAfter23Sept1PM] = useState(false);
  const countDown = useCountdown("2022-09-23T13:00:00.000+08:00");

  useEffect(() => {
    if (
      countDown[0] <= 0 &&
      countDown[1] <= 0 &&
      countDown[2] <= 0 &&
      countDown[3] <= 0
    ) {
      setDateAfter23Sept1PM(true);
    } else {
      setDateAfter23Sept1PM(false);
    }
  }, [countDown]);

  if (isDateAfter23Sept1PM) {
    return null;
  } else {
    return (
      <Button
        height={{ base: "57px", "3xl": "72px" }}
        width="full"
        background="transparent"
        borderRadius="16px"
        border="3px solid #222222"
        fontWeight="700"
        fontSize={{ base: "16px", "3xl": "20px" }}
        lineHeight={{ base: "20px", "3xl": "24px" }}
        color="#222222"
        textTransform="uppercase"
        _hover={{}}
        _active={{}}
        onClick={() => {
          setIsLauncing(false);
          onOpenRegistration();
        }}
      >
        register here
      </Button>
    );
  }
};

const LoginPage: FC = () => {
  // state
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenRegistration, onToggle: onOpenRegistration } =
    useDisclosure();
  const { isOpen: isOpenForgotPassword, onToggle: onOpenForgotPassword } =
    useDisclosure();
  const dispatch = useDispatch();
  const { height, width } = useWindowSize();
  const [show, setShow] = useState(false);
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [isCheckingLoginStatus, setLoginCheckingStatus] = useState(true);
  const [isLauncing, setIsLauncing] = useState(false);
  const router = useRouter();

  const {
    loginSubmit,
    responseLogin,
    loading: loadingLogin,
  } = useLoginSubmit();

  const {
    forgetPassword,
    data: responseForgetPassword,
    loading: loadingForgetPassword,
  } = useForgetPassword();

  // actions
  const handleClickShow = () => setShow(!show);

  // lifecycle
  useEffect(() => {
    const token = getAccessToken();

    if (token.length > 0) {
      setLoginStatus(true);
    } else {
      setLoginCheckingStatus(false);
    }
  }, []);

  useEffect(() => {
    if (responseLogin) {
      storeAccessToken(responseLogin.login.token);
      setLoginStatus(true);
    }
  }, [toast, responseLogin]);

  useEffect(() => {
    if (responseForgetPassword?.forgetPassword.success) {
      toast({
        title: "We've sent a link to reset your password to your email",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    }
  }, [toast, responseForgetPassword]);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(
        tutorialAction.setOpenTutorial({
          isOpen: true,
        })
      );
      // dispatch(agoraActions.setLoggedIn({ agoraState: "" }));

      // router.push("lobby");
      window.location.href = "/lobby";
    }
  }, [dispatch, isLoggedIn, router]);

  if (isCheckingLoginStatus) {
    return <Center h="100vh">Loading ......</Center>;
  }

  return (
    <>
      <Head>
        <title>Login | APCCA 2022</title>
        <meta name="description" content="Login Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        backgroundImage={{
          base: landingMobileBg.src,
          lg: landingDekstopBg.src,
        }}
        backgroundPosition="bottom right"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Flex
          width="100%"
          minHeight="100vh"
          justifyContent="center"
          gap="20px"
          flexDir={{ base: "column", lg: "row" }}
        >
          {isOpenRegistration && (
            <RegistrationForm
              onToggle={onOpenRegistration}
              height={height}
              width={width}
            />
          )}
          {isLauncing && (
            <Box
              zIndex={20}
              position="absolute"
              top="50vh"
              transform="translateY(-50%)"
              width="100%"
              px="5px"
            >
              <Box
                maxWidth="410px"
                bgColor="white"
                borderRadius="10px"
                p="20px"
                margin="0 auto"
              >
                <Text>
                  For APCCA members, please contact your APCCA 2022 Liaison
                  Officer if you require clarifications or more information. For
                  local guests, please contact Nabil at{" "}
                  <Link
                    fontWeight={600}
                    href={"mailto:nabil_fikri_jawahir@pris.gov.sg"}
                    _hover={{ textDecoration: "none" }}
                    _focus={{ outline: "0" }}
                    textDecoration="none"
                  >
                    nabil_fikri_jawahir@pris.gov.sg
                  </Link>{" "}
                  if you need further assistance.
                </Text>
                <Box display="flex" justifyContent="center" mt="10px">
                  <Button
                    bgColor="#FFDD00"
                    onClick={() => setIsLauncing(false)}
                  >
                    OK
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
          {!isOpenRegistration && (
            <>
              <Flex
                width={{ base: "100%", lg: "43%", "3xl": "42%" }}
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                gap={{ base: "40px", sm: "63px", "3xl": "80px" }}
                mt={{ base: "30px", lg: "0px" }}
              >
                <Flex
                  alignItems="center"
                  gap={{ base: "20px", sm: "63px", "3xl": "80px" }}
                >
                  <Image
                    src={apccaLogo.src}
                    height={{
                      base: "40px",
                      sm: "60px",
                      xl: "80px",
                      "3xl": "101px",
                    }}
                    alt="Apcca Logo"
                  />
                  <Image
                    src={spsLogo.src}
                    height={{
                      base: "40px",
                      sm: "60px",
                      xl: "80px",
                      "3xl": "101px",
                    }}
                    alt="Apcca Logo"
                  />
                </Flex>
                <CountDown />
              </Flex>
              <Flex
                width={{ base: "100%", lg: "43%", "3xl": "45%" }}
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  background="rgba(255, 255, 255, 0.5)"
                  borderRadius={{ base: "40px 40px 0px 0px", md: "40px" }}
                  padding={{ base: "32px", lg: "32px 76px" }}
                  boxShadow={{
                    base: "inset 0px 6px 4px rgba(255, 255, 255, 0.25)",
                    lg: "none",
                  }}
                >
                  <Flex
                    flexDir="column"
                    align="center"
                    gap={{ base: "18px", "3xl": "32px" }}
                  >
                    <Image
                      src={apccaEventLogo.src}
                      alt="apcca event logo"
                      width={{ base: "147px", lg: "200px", "3xl": "310px" }}
                      height={{ base: "147px", lg: "200px", "3xl": "310px" }}
                    />
                    <Text
                      fontWeight="400"
                      fontSize={{ base: "16px", "3xl": "20px" }}
                      lineHeight="24px"
                      color="#333333"
                      textAlign="center"
                    >
                      Please fill in the email address that was registered for
                      APCCA 2022 to reset your password
                    </Text>

                    {!isOpenForgotPassword && (
                      <LoginForm
                        show={show}
                        loading={loadingLogin}
                        onClickShow={handleClickShow}
                        onShowForgotPassword={onOpenForgotPassword}
                        loginSubmit={loginSubmit}
                      />
                    )}

                    {isOpenForgotPassword && (
                      <ForgotPasswordForm
                        onClickShow={onOpenForgotPassword}
                        loading={loadingForgetPassword}
                        submit={async (values) =>
                          await forgetPassword({
                            variables: { forgetPasswordInput: values },
                          })
                        }
                      />
                    )}

                    {!isOpenForgotPassword && (
                      <RegisterButton
                        onOpenRegistration={() => router.push("/registration")}
                        setIsLauncing={setIsLauncing}
                      />
                    )}
                  </Flex>
                </Box>
              </Flex>
            </>
          )}
        </Flex>
        <Box
          position="absolute"
          bottom={{ base: "20px", "3xl": "40px" }}
          right={{ base: "20px", "3xl": "40px" }}
          width={{ base: "50px", xl: "65px" }}
          height={{ base: "50px", xl: "65px" }}
          background="#FFDD00"
          borderRadius="50%"
          fontSize="48px"
          display={{ base: "none", lg: "flex" }}
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={onOpen}
        >
          <TiInfoLarge />
        </Box>
        <Helpdesk isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default LoginPage;
