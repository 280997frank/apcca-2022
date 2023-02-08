import React, { FC } from "react";
import { HStack, TabProps, useTab, Tab } from "@chakra-ui/react";

const ChatTab: FC<TabProps> = (props) => {
  const tabProps = useTab(props);
  const isSelected = !!tabProps["aria-selected"];

  return (
    <Tab
      fontWeight="bold"
      borderWidth="1px"
      rounded="lg"
      bgColor={isSelected ? "#FFDD00" : "none"}
      fontSize={{ base: "11px", "2xl": "12px", "3xl": "16px" }}
      sx={{
        color: isSelected ? "#222222 !important" : "#757575",
        borderColor: `${isSelected ? "#FFDD00" : "#D7D7D7"} !important`,
        span: {
          fontFamily: "Roboto",
          fontSize: "sm",
        },
      }}
      _focus={{ outline: "none" }}
      {...tabProps}
    >
      <HStack justifyContent="center" alignItems="center" spacing="1">
        {tabProps.children}
      </HStack>
    </Tab>
  );
};

export default ChatTab;
