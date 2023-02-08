import {
  Box,
  BoxProps,
  // Button,
  CloseButton,
  Heading,
  // Avatar,
  // HStack,
  // Input,
  Slide,
  // Text,
  // VStack,
} from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface IModalsCustume extends BoxProps {
  title: string;
  alignHeader?: "center" | "left" | "right" | "justify";
  isOpen: boolean;
  onToggle: () => void;
  onClose?: () => void;
  children: ReactNode;
}

const ModalsCustume: FC<IModalsCustume> = ({
  title,
  isOpen,
  onToggle,
  alignHeader = "center",
  children,
  ...rest
}) => {
  return (
    <>
      <Box
        display={isOpen ? "block" : "none"}
        w="full"
        h="full"
        m="0"
        marginInlineStart="0 !important"
        bg="rgba(0,0,0, .6)"
        position="fixed"
        top="0"
        left="0"
        bottom="0"
        right="0"
        zIndex="9998"
        onClick={onToggle}
      />
      <Slide
        direction="bottom"
        in={isOpen}
        style={{
          zIndex: 9999,
          margin: "auto",
          width: "fit-content",
          display: "flex",
          height: "100%",
        }}
        unmountOnExit
      >
        <Box
          p="20px"
          color="white"
          w={{ base: "100vw", lg: "inherit" }}
          // margin={{base: "auto auto 0 auto", lg: "auto auto 30vh auto"}}
          bg="white"
          rounded="md"
          marginX="auto"
          maxW={{ base: "inherit", lg: "35vw" }}
          alignSelf={{
            base: "end",
            lg: "center",
          }}
          // marginBottom={{
          //   base: "0",
          //   lg: "15.5vh",
          //   xl: "14vh",
          //   "2xl": "25vh",
          // }}
          // ml={{ base: "-.5rem", lg: "auto" }}
          borderRadius={{ base: "35px 35px 0 0", lg: "15px" }}
          display="flex"
          flexDir="column"
          alignItems="center"
          gap="20px"
          {...rest}
        >
          <Box color="#000" pos="relative" textAlign={alignHeader}>
            <Heading
              fontSize={{
                base: "1.3em",
                lg: "1em",
                xl: "1.3em",
              }}
              px="8vh"
              w="100%"
              fontFamily="Avenir Next"
              fontWeight="normal"
              py="15px"
              textTransform="uppercase"
            >
              {title}
            </Heading>
            <CloseButton
              pos="absolute"
              p="0"
              fontSize=".8rem"
              right="-10px"
              top="-10px"
              _focus={{ outline: "none" }}
              onClick={onToggle}
              borderRadius="50%"
              bg="#D9D9D9"
              color="#757575"
            />
          </Box>
          {children}
        </Box>
      </Slide>
    </>
  );
};

export default ModalsCustume;
