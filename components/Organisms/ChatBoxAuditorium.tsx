import { FC } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  Box,
} from "@chakra-ui/react";
import LiveChat from "@/components/Molecules/LiveChat";
import Attendee from "@/components/Molecules/Attendee";
import ChatTab from "@/components/Atoms/ChatTab";
import ChatProvider from "@/components/Organisms/ChatProvider";
import ChatIcon from "@/components/Atoms/Icons/ChatIcon";
import AttendeIcon from "@/components/Atoms/Icons/AttendeeIcon";
import EngageIcon from "@/components/Atoms/Icons/EngageIcon";
import { useChatToken } from "@/hooks/chat";

interface IChatBoxAuditorium {
  urlSlido?: string;
}

const ChatBoxAuditorium: FC<IChatBoxAuditorium> = ({ urlSlido }) => {
  const { data } = useChatToken();

  if (!data) return null;

  return (
    <ChatProvider data={data}>
      <Tabs
        isFitted
        h={{
          base: "80vh",
          lg: "65vh",
        }}
        w="100%"
        rounded="xl"
        bgColor="#fff"
        filter="drop-shadow(0px 3px 29px rgba(46, 46, 46, 0.07)) drop-shadow(0px 0.13784px 3.63125px rgba(46, 46, 46, 0.030687))"
      >
        <TabList border="none" padding="10px" gap={{ base: "5px", xl: "10px" }}>
          <ChatTab>
            <EngageIcon />
            <Text
              fontSize={{ base: "11px", "2xl": "12px", "3xl": "16px" }}
              lineHeight={{ base: "11px", "2xl": "24px" }}
            >
              Engage
            </Text>
          </ChatTab>
          <ChatTab>
            <ChatIcon />
            <Text
              fontSize={{ base: "11px", "2xl": "12px", "3xl": "16px" }}
              lineHeight={{ base: "11px", "2xl": "24px" }}
            >
              Live Chat
            </Text>
          </ChatTab>
          <ChatTab>
            <AttendeIcon />
            <Text
              fontSize={{ base: "11px", "2xl": "12px", "3xl": "16px" }}
              lineHeight={{ base: "11px", "2xl": "24px" }}
            >
              Attendee
            </Text>
          </ChatTab>
        </TabList>
        <TabPanels
          h="calc(100vh - 300px)"
          sx={{
            "& > div": {
              h: "100%",
              p: 0,
              outline: "none !important",
            },
          }}
        >
          <TabPanel>
            <Box height="100%" bgColor="#FAFAFA">
              {urlSlido && (
                <iframe src={urlSlido} width="100%" height="100%"></iframe>
              )}
            </Box>
          </TabPanel>
          <TabPanel>
            <LiveChat channelName="auditorium" />
          </TabPanel>
          <TabPanel>
            <Attendee />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ChatProvider>
  );
};

export default ChatBoxAuditorium;
