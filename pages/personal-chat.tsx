import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";

import Layout from "@/components/Templates/Layout";

import landingMobileBg from "@/assets/images/landing-mobile-bg.png";
import apccaLogo from "@/assets/images/apcca-logo.png";
import spsLogo from "@/assets/images/sps-logo.png";
import ChatBoxNetworking from "@/components/Organisms/ChatBoxNetworking-old";
import { useAttendeList, useChatNotifList, useChatToken } from "@/hooks/chat";
import "@stream-io/stream-chat-css/dist/css/index.css";
import ChatProvider from "@/components/Organisms/ChatProvider";

import { RootState } from "@/states/store";
import { useSelector } from "react-redux";

interface TPropsData {
  id: string;
  imgUrl: string;
  name: string;
  country: string;
  orgainsation: string;
  isActive: boolean;
}
interface TPropsListAttendee {
  isOpenPC?: boolean;
  setOpenPC: (i: boolean) => void;
  setDataAttendee: (data: TPropsData) => void;
}
const ListAttendee: FC<TPropsListAttendee> = ({
  setOpenPC,
  setDataAttendee,
}) => {
  const { attendeeList } = useAttendeList();

  const { id } = useSelector((state: RootState) => state.user);

  return (
    <SimpleGrid
      columns={{
        base: 1,
        lg: 5,
      }}
      spacing={10}
    >
      {attendeeList.map((user, index: number) => {
        if (id === user.id) {
          return null;
        }
        return (
          <Button
            key={index}
            onClick={() => {
              setDataAttendee({
                id: user.id,
                imgUrl: user.image as string,
                // imgUrl: "https://bit.ly/dan-abramov",
                name: user.name ? user.name : "Anonymous",
                country: "Indonesia",
                orgainsation: "Zodiac Solution",
                isActive: user.online ? user.online : false,
              });
              setOpenPC(true);
            }}
          >
            {user.name}
          </Button>
        );
      })}
    </SimpleGrid>
  );
};
const BoxListAteendee: FC<TPropsListAttendee> = ({
  setOpenPC,
  setDataAttendee,
}) => {
  const { data } = useChatToken();

  if (!data) return null;
  return (
    <ChatProvider data={data}>
      <ListAttendee setOpenPC={setOpenPC} setDataAttendee={setDataAttendee} />
      <ChatNotifListBox
        setOpenPC={setOpenPC}
        setDataAttendee={setDataAttendee}
      />
    </ChatProvider>
  );
};

const PersonalChat: FC = () => {
  const [isOpenPC, setOpenPC] = useState(false);
  const [dataAttendee, setDataAttendee] = useState({
    id: "",
    imgUrl: "",
    name: "",
    country: "",
    orgainsation: "",
    isActive: true,
  });

  return (
    <Layout title="Personal Chat" isPrivate>
      <Box
        p={{ base: "20px", xl: "30px 60px" }}
        backgroundImage={{
          base: landingMobileBg.src,
          lg: "",
        }}
        backgroundPosition="bottom right"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        minHeight="88vh"
      >
        <Flex
          flexDir={{ base: "column", md: "row" }}
          alignItems="center"
          my="40px"
          gap="36px"
          px={{ sm: "20px", lg: "0px" }}
        >
          <Text
            fontWeight="700"
            fontSize={{ sm: "28px", md: "32px" }}
            lineHeight={{ sm: "28px", md: "30px" }}
            color="#222222"
            flex="1"
          >
            Chat Personal Example
          </Text>
          <Flex gap="55px">
            <Image
              src={apccaLogo.src}
              height={{
                base: "40px",
                sm: "30px",
                xl: "40px",
                "3xl": "43px",
              }}
              alt="Apcca Logo"
            />
            <Image
              src={spsLogo.src}
              height={{
                base: "40px",
                sm: "30px",
                xl: "40px",
                "3xl": "43px",
              }}
              alt="Apcca Logo"
            />
          </Flex>
        </Flex>

        <BoxListAteendee
          isOpenPC={isOpenPC}
          setOpenPC={(i) => setOpenPC(i)}
          setDataAttendee={(i) => setDataAttendee(i)}
        />
        {/* notif chat */}
        <Stack
          direction="column"
          maxH="400px"
          h="auto"
          w="50%"
          align="flex-start"
          my="1rem"
        >
          <Text
            fontWeight="700"
            fontSize={{ sm: "28px", md: "32px" }}
            lineHeight={{ sm: "28px", md: "30px" }}
            color="#222222"
            flex="1"
          >
            Notif chat
          </Text>
          <Stack
            direction="column"
            maxH="400px"
            h="auto"
            w="50%"
            align="flex-start"
            my="1rem"
          ></Stack>
        </Stack>
        {/* <Button
          onClick={() => {
            setDataAttendee({
              id: "2ec598ca-1386-4da8-91bb-9a50e3b6db3a",
              imgUrl: "https://bit.ly/dan-abramov",
              name: "Zodiac Solution",
              country: "Singapore",
              orgainsation: "Zodiac Solution",
              isActive: true,
            });
            setOpenPC(true);
          }}
        >
          chat to test akun
        </Button>{" "} */}
        <ChatBoxNetworking
          isOpen={isOpenPC}
          onClose={() => setOpenPC(false)}
          dataAttendee={dataAttendee}
        />
      </Box>
    </Layout>
  );
};
interface TPropsItem {
  // userListId: string[];
  setOpenPC: (i: boolean) => void;
  setDataAttendee: (data: TPropsData) => void;
}
const ChatNotifListItem: FC<TPropsItem> = ({ setOpenPC, setDataAttendee }) => {
  const { chatNotifList, totalUnread } = useChatNotifList();
  const [isShow, setShow] = useState(false);
  return (
    <>
      <Button
        my="5"
        onClick={() => {
          setShow(!isShow);
        }}
      >
        Total Notif ({totalUnread.toString()})
      </Button>
      <Box
        height={"300px"}
        w="300px"
        overflowX="hidden"
        overflowY="auto"
        display={isShow ? "block" : "none"}
      >
        {chatNotifList.map((item, index: number) => {
          return (
            <Box
              key={index}
              bgColor="gray.100"
              my="2"
              cursor={"pointer"}
              onClick={() => {
                setDataAttendee({
                  id: item.id,
                  // imgUrl: item.image as string,
                  imgUrl: "https://bit.ly/dan-abramov",
                  name: item.name ? item.name : "Anonymous",
                  country: "Indonesia",
                  orgainsation: "Zodiac Solution",
                  isActive: false,
                });
                setOpenPC(true);
              }}
            >
              <Text>{item.name}</Text>
              {/* <Text>{item.isRead.toString()}</Text> */}
              <Text>{item.msg}</Text>
            </Box>
          );
        })}
      </Box>
    </>
  );
};
const ChatNotifListBox: FC<TPropsListAttendee> = ({
  setDataAttendee,
  setOpenPC,
}) => {
  // const { attendeeList } = useAttendeList();
  // const userListId = attendeeList.map((user) => user.id);
  // console.log("userListId", userListId);
  return (
    <>
      {/* {userListId.length > 0 && ( */}
      <ChatNotifListItem
        // userListId={userListId}
        setOpenPC={setOpenPC}
        setDataAttendee={setDataAttendee}
      />
      {/* )} */}
    </>
  );
};

export default PersonalChat;
