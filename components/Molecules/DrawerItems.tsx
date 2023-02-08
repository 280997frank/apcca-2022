import { FC, useCallback, useEffect, useState } from "react";
import { Stack, useDisclosure } from "@chakra-ui/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// import { shallowEqual, useSelector } from "react-redux";
// import { useState } from "react";

import FeedbackPromptModal from "@/components/Atoms/FeedbackPromptModal";
import NavItem from "@/components/Atoms/NavItem";
import ChatProvider from "@/components/Organisms/ChatProvider";

import { menuScroll } from "@/constants/menu";
import agenda from "@/constants/agenda";

// import { auth } from "@/connections/firebase";
import logoutIcon from "@/assets/images/logout.png";

import { useLogout } from "@/hooks/auth";
import {
  useListNotificationNoticeboard,
  useNotificationUpdate,
} from "@/hooks/notification";
import { useChatToken } from "@/hooks/chat";
import { useGetFeedbackAnswers } from "@/hooks/feedback";

import { useNoticeboardDispatch } from "@/states/noticeboard/dispatch";

import { IUser } from "@/types/chat";
interface Tprops {
  onClose: (i: boolean) => void;
}
interface ITokenData {
  token: string;
  user: IUser;
}
const IS_BATCH_1 = JSON.parse(process.env.NEXT_PUBLIC_IS_BATCH_1 as string);

dayjs.extend(utc);
dayjs.extend(timezone);

const DrawerItems: FC<Tprops> = () => {
  const logout = useLogout();
  const [menus, setMenus] = useState(menuScroll);
  const { noticeboardBadge } = useNoticeboardDispatch();
  const { data: notifSubscription } = useNotificationUpdate();
  const { fetchListNotification } = useListNotificationNoticeboard({
    page: 1,
    limit: 25,
  });
  const { fetchFeedbackAnswers, data } = useGetFeedbackAnswers();
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

  useEffect(() => {
    if (data) {
    }
  }, [data, logout]);

  if (!dataChatToken) return null;

  return (
    <ChatProvider data={dataChatToken as ITokenData}>
      <Stack direction="column" height="100%" width="100%" transition=".5s">
        <Stack direction="column">
          <Stack direction="column" w="full" justifyContent="center">
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
      </Stack>
      <FeedbackPromptModal isOpen={isModalOpen} onClose={onClose} />
    </ChatProvider>
  );
};

export default DrawerItems;
