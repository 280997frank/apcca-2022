import {
  Box,
  Button,
  Img,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import Slido from "@/components/Atoms/Slido";
import ChatProvider from "@/components/Organisms/ChatProvider";

import { useChatToken } from "@/hooks/chat";

// import intercom from "@/assets/images/intercom-icon.png";
import poll from "@/assets/images/icon-poll.png";

interface ChatBoxHomeProps {
  slidoId: string;
}

const ChatBoxHome: FC<ChatBoxHomeProps> = ({ slidoId }) => {
  const [isDesktop] = useMediaQuery(
    "(min-width: 62em) and (orientation: landscape)"
  );
  const defaultOpen = useBreakpointValue({ base: false, lg: true });
  const [isOpen, setOpen] = useState(false);
  const { data } = useChatToken();

  useEffect(() => {
    if (defaultOpen) {
      setOpen(true);
    }
  }, [defaultOpen]);

  if (!data) return null;

  return (
    <ChatProvider data={data}>
      <Box
        h="100vh"
        w="100vw"
        pos="fixed"
        top={0}
        left={0}
        bgColor={"blackAlpha.600"}
        zIndex="docked"
        onClick={() => setOpen(false)}
        display={{ base: isOpen ? "block" : "none", md: "none" }}
      >
        &nbsp;
      </Box>
      <Box
        display={isOpen ? "block" : "none"}
        pos="fixed"
        h="80vh"
        w={{ base: "90%", md: "21%" }}
        minW={{ md: "200px", "2xl": "300px" }}
        overflow="hidden"
        top={{ base: "50%", md: 10 }}
        left={{ base: "50%", md: "unset" }}
        right={{ base: "unset", md: 4, "2xl": 8 }}
        transform={{ base: "translate(-50%, -50%)", md: "unset" }}
        rounded="xl"
        bgColor="#fff"
        zIndex={{ base: 100, lg: "docked" }}
        className="tutorial-3"
      >
        <Box
          h="100%"
          bgColor="white"
          sx={{
            "& > div": {
              h: "100%",
              p: 0,
            },
          }}
        >
          <Slido id={slidoId} /* "gkCwgjEYzVe58QEH3D2paV" */ />
        </Box>
      </Box>
      {/* <Button
        variant="ghost"
        pos="fixed"
        bottom={{ base: 6, md: 10 }}
        right={8}
        p="0"
        zIndex="docked"
        sx={{
          bgColor: "transparent !important",
          shadow: "none !important",
        }}
        onClick={() => setOpen(!isOpen)}
      >
        <Img w={16} h={16} src={intercom.src} />
      </Button> */}
      {!isDesktop && (
        <Button
          variant="ghost"
          pos="fixed"
          bottom={{ base: 6, md: 10 }}
          right={8}
          p="0"
          zIndex={100}
          sx={{
            bgColor: "transparent !important",
            shadow: "none !important",
          }}
          onClick={() => setOpen(!isOpen)}
        >
          <Img w={16} h={16} src={poll.src} />
        </Button>
      )}
    </ChatProvider>
  );
};

export default ChatBoxHome;
