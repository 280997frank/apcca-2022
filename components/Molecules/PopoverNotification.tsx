import React, { ReactNode } from "react";
import {
  As,
  Button,
  ButtonProps,
  Center,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  // PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
// import CameraIcon from "@/components/Atoms/Icons/CameraIcon";
// import ChatBoxes from "@/components/Atoms/Icons/ChatBoxes";
// import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface IPopoverNotification extends ButtonProps {
  icons: As;
  title: string;
  totalNotif: number;
  onClose?: () => void;
  children: ReactNode;
}

const PopoverNotification = ({
  totalNotif,
  icons,
  title,
  onClose,
  children,
  ...rest
}: IPopoverNotification) => {
  return (
    <Popover placement="bottom-end" onClose={onClose} isLazy>
      <PopoverTrigger>
        <Button
          pos="relative"
          bg="transparent"
          h="auto"
          minW="auto"
          p="0"
          mr="20px"
          border="none"
          _focus={{ outline: "none" }}
          _hover={{}}
          {...rest}
        >
          <Icon as={icons} w="2.2rem" h="2.2rem" />
          {!!totalNotif && (
            <Center
              pos="absolute"
              right="-5px"
              bottom="-10px"
              as="span"
              h="20px"
              w="20px"
              lineHeight="15px"
              fontSize=".7rem"
              bg="red"
              color="white"
              p="5px"
              borderRadius="100%"
            >
              {totalNotif > 9 ? "9+" : totalNotif}
            </Center>
          )}
        </Button>
        {/* <Box {...rest} /> */}
      </PopoverTrigger>
      <PopoverContent
        // ref={ref}
        fontFamily="roboto"
        w={{ base: "100vw", lg: "30vw" }}
        border="none"
        outline="none"
        p="0"
        _focus={{}}
        borderRadius={10}
      >
        <PopoverHeader
          borderBottom="none"
          my="10px"
          fontWeight="bold"
          fontSize="1.4rem"
          pt="10px"
          px="20px"
        >
          {title}
        </PopoverHeader>
        <PopoverBody p="10px 0">{children}</PopoverBody>
        {/* <PopoverFooter
          display="flex"
          justifyContent="space-between"
          borderTop="none"
        >
          <Button
            variant="unstyled"
            fontSize=".8rem"
            _focus={{ outline: "none" }}
          >
            <ChevronLeftIcon />
            Prev{" "}
          </Button>
          <Button
            variant="unstyled"
            fontSize=".8rem"
            _focus={{ outline: "none" }}
          >
            Next <ChevronRightIcon />
          </Button>
        </PopoverFooter> */}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverNotification;
