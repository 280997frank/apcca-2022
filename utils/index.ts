import dayjs, { Dayjs } from "dayjs";
import { Channel, ChannelMemberResponse, UserResponse } from "stream-chat";
import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";

export const getAccessToken = (): string => {
  if ((process.env.NEXT_PUBLIC_COOKIE_NAME as string) !== "") {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(
        process.env.NEXT_PUBLIC_COOKIE_NAME as string
      );
      return token !== null ? token : "";
    }
  }

  return "";
};
export const storeAccessToken = async (accessToken: string): Promise<void> => {
  if (typeof process.env.NEXT_PUBLIC_COOKIE_NAME === "string") {
    await window.localStorage.setItem(
      process.env.NEXT_PUBLIC_COOKIE_NAME,
      accessToken
    );
  } else {
    throw new Error("Token cannot be stored");
  }
};

export const removeAccessToken = (): void => {
  if (typeof process.env.NEXT_PUBLIC_COOKIE_NAME === "string") {
    window.localStorage.removeItem(process.env.NEXT_PUBLIC_COOKIE_NAME);
  }
};

export const checkErrorResponse = async (
  response: Response
): Promise<string> => {
  let errorMessage = "";
  const clonedResponse = response.clone();

  if (!response.ok) {
    try {
      const json = await response.json();
      errorMessage = json.message;
    } catch (error) {
      const text = await clonedResponse.text();
      errorMessage = text;
    }
  }

  return errorMessage;
};
export const getFileExtension = (url: string) => {
  return url.split(".").pop();
};

export const isPDFFile = (url: string) => {
  const extension = getFileExtension(url);
  if (extension === "pdf") {
    return true;
  }
  return false;
};

export const isPPTFile = (url: string) => {
  const extension = getFileExtension(url);
  if (extension === "ppt" || extension === "pptx") {
    return true;
  }
  return false;
};

export const getDefaultIndexDayTabs = () => {
  const EVENT_DATES = [
    dayjs("2022-09-19"),
    dayjs("2022-09-20"),
    dayjs("2022-09-21"),
    dayjs("2022-09-22"),
    dayjs("2022-09-23"),
  ];
  const CURRENT_DATE = dayjs();

  const tabIndex = EVENT_DATES.findIndex((e) => CURRENT_DATE.isSame(e, "day"));

  if (tabIndex === -1) {
    return 0;
  } else {
    return tabIndex;
  }
};

export const getEventDate = (): Dayjs => {
  const EVENT_DATES = [
    dayjs("2022-09-19"),
    dayjs("2022-09-20"),
    dayjs("2022-09-21"),
    dayjs("2022-09-22"),
    dayjs("2022-09-23"),
  ];
  const CURRENT_DATE = dayjs();

  const EVENT_DATE = EVENT_DATES.find((e) => e.isSame(CURRENT_DATE, "day"));

  if (typeof EVENT_DATE === "undefined") {
    return EVENT_DATES[0];
  } else {
    return EVENT_DATE as Dayjs;
  }
};

export const showTimeChannelPreview = (dateInput: Date) => {
  const date = dayjs(dateInput);
  if (dayjs().isSame(date, "date")) {
    return date.format("HH:mm");
  } else {
    return date.format("D MMM");
  }
};

export const getGroupDisplayTitle = (
  channel: Channel,
  currentUser: UserResponse<DefaultStreamChatGenerics> | undefined
): string => {
  if (!currentUser) return "";
  let title: string = "";
  const members = Object.values(channel.state.members);
  const otherMember = members.filter(
    (m: ChannelMemberResponse) => m.user?.id !== currentUser.id
  );

  otherMember.map((member, index) => {
    if (index < 4) {
      title += `${member.user?.name}, `;
    }
  });

  let result = title.substring(0, title.length - 2);

  if (otherMember.length > 4) {
    result += "...";
  }

  return result;
};
