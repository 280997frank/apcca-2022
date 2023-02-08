import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import { TiInfoLarge } from "react-icons/ti";

import apccaEventLogo from "@/assets/images/apcca-event-logo.png";
import apccaLogo from "@/assets/images/apcca-logo.png";
import landingDekstopBg from "@/assets/images/landing-desktop-bg.png";
import landingMobileBg from "@/assets/images/landing-mobile-bg.png";
import spsLogo from "@/assets/images/sps-logo.png";

import CountDown from "@/components/Molecules/CountDown";
import Helpdesk from "@/components/Molecules/Helpdesk";
import ResetPasswordForm from "@/components/Molecules/ResetPasswordForm";
import { useSetPassword } from "@/hooks/auth";
import { useRouter } from "next/router";
import { removeAccessToken, storeAccessToken } from "@/utils";
import Head from "next/head";

const ResetPasswordPage: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { token } = router.query;

  const [show, setShow] = useState(false);

  const { setPassword, data, loading } = useSetPassword();

  useEffect(() => {
    if (token) {
      storeAccessToken(token.toString());
    }
  }, [token]);

  const handleClickShow = () => setShow(!show);

  useEffect(() => {
    if (data && data.setPassword.success) {
      removeAccessToken();
      router.push("/login");
    }
  }, [data, router]);

  return (
    <>
      <Head>
        <title>Reset Password | APCCA 2022</title>
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
          gap="1.25rem"
          flexDir={{ base: "column", lg: "row" }}
        >
          <Flex
            width={{ base: "100%", lg: "43%", "3xl": "42%" }}
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            gap={{ base: "2.5rem", sm: "3.9375rem", "3xl": "5rem" }}
            mt={{ base: "1.875rem", lg: "0rem" }}
          >
            <Flex
              alignItems="center"
              gap={{ base: "1.25rem", sm: "3.9375rem", "3xl": "5rem" }}
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
              w="100%"
              background="rgba(255, 255, 255, 0.5)"
              borderRadius={{ base: "40px 40px 0px 0px", md: "40px" }}
              padding={{ base: "2rem", lg: "2rem 4.75rem" }}
              boxShadow={{
                base: "inset 0px 6px 4px rgba(255, 255, 255, 0.25)",
                lg: "none",
              }}
            >
              <Flex
                flexDir="column"
                align="center"
                gap={{ base: "1.125rem", "3xl": "2rem" }}
              >
                <Image
                  src={apccaEventLogo.src}
                  alt="apcca event logo"
                  width={{ base: "147px", lg: "200px", "3xl": "310px" }}
                  height={{ base: "147px", lg: "200px", "3xl": "310px" }}
                />
                <Text
                  fontWeight="700"
                  fontSize={{ base: "1rem", "3xl": "2.5rem" }}
                  lineHeight="3rem"
                  color="#222222"
                  textAlign="center"
                >
                  Reset Password
                </Text>

                <ResetPasswordForm
                  show={show}
                  loading={loading}
                  onClickShow={handleClickShow}
                  setPassword={setPassword}
                />
              </Flex>
            </Box>
          </Flex>
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

export default ResetPasswordPage;
