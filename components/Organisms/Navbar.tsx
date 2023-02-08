import {
  Box,
  Button,
  IconButton,
  Image,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

import FeedbackPromptModal from "@/components/Atoms/FeedbackPromptModal";
import NavItem from "@/components/Atoms/NavItem";

import { menuScroll } from "@/constants/menu";
import agenda from "@/constants/agenda";

import logo from "@/assets/images/APCCA_event logo_v5_FINAL 1.png";
import logoutIcon from "@/assets/images/logout.png";

import { useLogout } from "@/hooks/auth";
import {
  useListNotificationNoticeboard,
  useNotificationUpdate,
} from "@/hooks/notification";
import { useChatToken } from "@/hooks/chat";
import { useGetFeedbackAnswers } from "@/hooks/feedback";

import { useNoticeboardDispatch } from "@/states/noticeboard/dispatch";

interface Props {
  onOpen: () => void;
  isOpen: boolean;
}
const IS_BATCH_1 = JSON.parse(process.env.NEXT_PUBLIC_IS_BATCH_1 as string);

dayjs.extend(utc);
dayjs.extend(timezone);

const Navbar: FC<Props> = ({ onOpen, isOpen }) => {
  const { push } = useRouter();
  const logout = useLogout();
  const [menus, setMenus] = useState(menuScroll);
  const { noticeboardBadge } = useNoticeboardDispatch();
  const { data: notifSubscription } = useNotificationUpdate();
  const { fetchListNotification } = useListNotificationNoticeboard({
    page: 1,
    limit: 25,
  });
  const { fetchFeedbackAnswers } = useGetFeedbackAnswers();
  const { data: dataChatToken } = useChatToken();
  const { onOpen: onModalOpen, onClose, isOpen: isModalOpen } = useDisclosure();

  const handleUpdateMenuBadge = useCallback(() => {
    setMenus((prevState) => {
      const newObj = [...prevState];
      newObj.forEach((item) => {
        if (item.label === "Noticeboard") {
          item.badge = "" + noticeboardBadge;
        }
      });
      return newObj;
    });
  }, [noticeboardBadge]);

  useEffect(() => {
    fetchListNotification();
  }, [fetchListNotification]);

  useEffect(() => {
    // fetch after subscription
    if (notifSubscription) {
      fetchListNotification();
    }
  }, [notifSubscription, fetchListNotification]);

  useEffect(() => {
    handleUpdateMenuBadge();
  }, [handleUpdateMenuBadge]);

  if (!dataChatToken) return null;

  return (
    <>
      <Box
        width={{ base: "100vw", lg: "22vw" }}
        display="flex"
        flexDir="row"
        transition=".5s"
        // zIndex="banner"
        height="unset"
        bgColor="transparent"
        overflowY="auto"
      >
        <Stack
          display={{
            base: "none",
            lg: "flex",
          }}
          direction="column"
          width={{
            base: "95%",
            lg: "100%",
          }}
          align="start"
          px="3%"
        >
          <Stack pt="10" mb="20px" justifyContent="center" width="full">
            <Image
              alignSelf="center"
              src={logo.src}
              w="40%"
              alt=""
              htmlWidth={logo.width}
              htmlHeight={logo.height}
              onClick={() => push("/lobby")}
              cursor="pointer"
            />
          </Stack>
          <Box className="tutorial-1" w="100%" borderRadius="24px">
            <Stack p="1" direction="column" w="full">
              <Stack direction="column" w="100%">
                {menus
                  .filter(({ isBatch1 }) => {
                    if (IS_BATCH_1) {
                      return isBatch1;
                    }

                    return true;
                  })
                  .map((item, index: number) => {
                    return <NavItem key={index} {...item} />;
                  })}
              </Stack>
            </Stack>
          </Box>
          <Stack flex="1" w="full" justifyContent="flex-end" pb={5}>
            <NavItem
              onClick={async () => {
                const today = dayjs().tz("Asia/Singapore").format("YYYY-MM-DD");
                const isEventOngoing = agenda
                  .map(({ time }) => time)
                  .includes(today);

                if (isEventOngoing) {
                  const { data } = await fetchFeedbackAnswers({
                    variables: { feedbackAnswerInput: { eventDate: today } },
                  });

                  if (
                    data?.getfeedbackAnswer.find(
                      ({ eventDate }) => eventDate === today
                    )
                  ) {
                    logout();
                  } else {
                    onModalOpen();
                  }
                } else {
                  logout();
                }
              }}
              label="Logout"
              id="logout"
              url="/"
              img={logoutIcon.src}
            />
          </Stack>
        </Stack>
        {/* mobile */}
        <Stack
          w="100%"
          height="12vh"
          display={{
            base: "flex",
            lg: "none",
          }}
          direction="row"
          justifyContent="center"
          h="101px"
        >
          <Stack pos="relative">
            <Button
              left="50%"
              top="50%"
              transform="translate(10%, -50%)"
              pos="absolute"
              bgColor="transparent"
              as={IconButton}
              aria-label="Options"
              icon={
                isOpen ? (
                  <AiOutlineClose fill="#2E4924" size="30px" />
                ) : (
                  <GiHamburgerMenu fill="#2E4924" size="30px" />
                )
              }
              colorScheme="transparent"
              _focus={{
                bgColor: "transparent",
                outline: "0",
              }}
              onClick={onOpen}
              textDecoration="none"
              userSelect="none"
              _hover={{ textDecoration: "none", bgColor: "transparent" }}
              _active={{
                bgColor: "transparent",
                outline: "0",
              }}
              outline="0"
              boxShadow="none !important"
            />
          </Stack>
          <Stack w="100%" justifyContent="center">
            <Image
              p={{ base: 2, md: 0 }}
              alignSelf="center"
              src={logo.src}
              w="100px"
              alt=""
              htmlWidth={logo.width}
              htmlHeight={logo.height}
              onClick={() => push("/lobby")}
              cursor="pointer"
            />
          </Stack>
          {/* <Spacer /> */}
        </Stack>
      </Box>
      <FeedbackPromptModal isOpen={isModalOpen} onClose={onClose} />
    </>
  );
};

export default Navbar;
