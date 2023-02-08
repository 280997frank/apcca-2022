import { TMsgNotif } from "@/hooks/chat";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { actions } from "./slice";

const useChatDispatch = () => {
  const dispatch = useDispatch();

  const { chatNotifList, totalUnread } = useSelector(
    (state: RootState) => ({
      chatNotifList: state.chat.notification,
      totalUnread: state.chat.totalUnread,
    }),
    shallowEqual
  );

  const setNotification = (msgNotif: TMsgNotif[]) => {
    dispatch(actions.setNotification(msgNotif));
    dispatch(actions.setTotalUnread(msgNotif.length));
  };

  const setOpen = (isOpen: boolean) => {
    dispatch(actions.setOpen(isOpen));
  };

  return {
    chatNotifList,
    totalUnread,
    setNotification,
    setOpen,
  };
};

export default useChatDispatch;
