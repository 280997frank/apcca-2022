import {
  Box,
  Flex,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useTab,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdTouchApp } from "react-icons/md";
import { BsChatLeftTextFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

import ContentAuditorium, {
  IContentAuditorium,
} from "@/components/Molecules/ContentAuditorium";

import LiveChat from "../Molecules/LiveChat";
import Attendee from "../Molecules/Attendee";
import ChatProvider from "./ChatProvider";
import { useChatToken } from "@/hooks/chat";

const TabsAuditoriumMobile: FC<IContentAuditorium & { urlSlido?: string }> = ({
  title,
  startAt,
  endAt,
  speakers,
  description,
  urlSlido,
}) => {
  const { data } = useChatToken();

  if (!data) return null;

  const CustomTab = React.forwardRef((props: any, ref: any) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];

    return (
      <Box
        {...tabProps}
        background={isSelected ? "#FFDD00" : "transparent"}
        borderRadius="0.5rem"
        p="0.625rem"
        flex={1}
        cursor="pointer"
        outline="none"
      >
        <Flex
          flexDir="column"
          alignItems="center"
          gap="0.25rem"
          color={isSelected ? "#222222" : "#757575"}
        >
          {tabProps.children}
        </Flex>
      </Box>
    );
  });

  CustomTab.displayName = "Custom Tab";

  return (
    <ChatProvider data={data}>
      <Tabs px="0.5rem">
        <TabList border="none">
          <CustomTab>
            <AiFillInfoCircle fontSize="1.5rem" />
            <span>Info</span>
          </CustomTab>
          <CustomTab>
            <MdTouchApp fontSize="1.5rem" />
            <span>Engage</span>
          </CustomTab>
          <CustomTab>
            <BsChatLeftTextFill fontSize="1.5rem" />
            <span>Live Chat</span>
          </CustomTab>
          <CustomTab>
            <FaUserFriends fontSize="1.5rem" />
            <span>Attendee</span>
          </CustomTab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <ContentAuditorium
              title={title}
              startAt={startAt}
              endAt={endAt}
              speakers={speakers}
              description={description}
            />
          </TabPanel>
          <TabPanel px={0} h="85vh">
            {urlSlido && (
              <iframe src={urlSlido} width="100%" height="100%"></iframe>
            )}
          </TabPanel>
          <TabPanel px={0}>
            <LiveChat channelName="auditorium" />
          </TabPanel>
          <TabPanel px={0}>
            <Attendee />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ChatProvider>
  );
};

export default TabsAuditoriumMobile;
