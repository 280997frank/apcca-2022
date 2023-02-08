import React from "react";
import { useChatNotifList, useChatToken } from "@/hooks/chat";
import ChatProvider from "@/components/Organisms/ChatProvider";

const InitNotifChat = () => {
  useChatNotifList();
  return null;
};

const NotifChat = () => {
  const { data } = useChatToken();

  if (!data) return null;

  return (
    <ChatProvider data={data}>
      <InitNotifChat />
    </ChatProvider>
  );
};

export default NotifChat;
