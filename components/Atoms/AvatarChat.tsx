import isNull from "lodash/isNull";
import React, { FC, useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Avatar, useChatContext } from "stream-chat-react";
import { ChannelMemberResponse } from "stream-chat";

interface IAvatarChat {
  members: ChannelMemberResponse[];
}

type TMember = {
  name: string;
  image: string;
};

const avatarStyle = {
  alignItems: "center",
  h: "50px",
  minW: "50px",
  maxW: "50px",
  borderRadius: "10px",
  overflow: "hidden",
  marginRight: "10px",
  marginLeft: "10px",
};

const AvatarChat: FC<IAvatarChat> = ({ members }) => {
  const { client } = useChatContext();
  // const [membersImage, setMembersImage] = useState<string[]>([]);
  const [membersData, setMembersData] = useState<TMember[]>([]);

  // useEffect(() => {
  //   if (members.length > 2) {
  //     const membersImg: any = members.map((member: ChannelMemberResponse) => {
  //       return !isNull(member.user?.image) ? member.user?.image : "";
  //     });
  //     setMembersImage(membersImg);
  //   } else {
  //     const membersImg: any = members
  //       .filter(({ user }: any) => user.id !== client.userID)
  //       .map((member: ChannelMemberResponse) => {
  //         return !isNull(member.user?.image) ? member.user?.image : "";
  //       });
  //     setMembersImage(membersImg);
  //   }
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if (members.length > 2) {
      const membersName: any = members.map((member: ChannelMemberResponse) => {
        return {
          image: !isNull(member.user?.image) ? member.user?.image : "",
          name: member.user?.name,
        };
      });
      setMembersData(membersName);
    } else {
      const membersImg: any = members
        .filter(({ user }: any) => user.id !== client.userID)
        .map((member: ChannelMemberResponse) => {
          return {
            image: !isNull(member.user?.image) ? member.user?.image : "",
            name: member.user?.name,
          };
        });
      setMembersData(membersImg);
    }
    // eslint-disable-next-line
  }, []);

  if (membersData.length === 1) {
    return (
      <Flex sx={avatarStyle}>
        <Avatar
          name={membersData[0].name}
          image={membersData[0].image}
          size={50}
          shape="square"
        />
        ;
      </Flex>
    );
  }

  if (membersData.length === 2) {
    return (
      <Flex
        sx={{
          ...avatarStyle,
          "div:first-child": {
            position: "relative",
            right: "10px",
          },
          "div:nth-child(2)": {
            position: "relative",
            right: "14px",
          },
          span: {
            w: "25px",
            overflow: "hidden",
          },
        }}
      >
        <span>
          <Avatar
            image={membersData[0].image}
            name={membersData[0].name}
            shape="square"
            size={50}
          />
        </span>
        <span>
          <Avatar
            image={membersData[1].image}
            name={membersData[1].name}
            shape="square"
            size={50}
          />
        </span>
      </Flex>
    );
  }

  if (membersData.length === 3) {
    return (
      <Flex
        sx={{
          ...avatarStyle,
          span: {
            w: "25px",
            overflow: "hidden",
          },
        }}
      >
        <span>
          <Avatar
            image={membersData[0].image}
            name={membersData[0].name}
            shape="square"
            size={50}
          />
        </span>
        <span>
          <Avatar
            image={membersData[1].image}
            name={membersData[1].name}
            shape="square"
            size={25}
          />
          <Avatar
            image={membersData[2].image}
            name={membersData[2].name}
            shape="square"
            size={25}
          />
        </span>
      </Flex>
    );
  }

  if (membersData.length >= 4) {
    return (
      <Flex
        sx={{
          ...avatarStyle,
          "span:nth-child(2)": {
            position: "relative",
            right: "14px",
          },
        }}
      >
        <span>
          <Avatar
            image={membersData[membersData.length - 1].image}
            name={membersData[membersData.length - 1].name}
            shape="square"
            size={28}
          />
          <Avatar
            image={membersData[membersData.length - 2].image}
            name={membersData[membersData.length - 2].name}
            shape="square"
            size={28}
          />
        </span>
        <span>
          <Avatar
            image={membersData[membersData.length - 3].image}
            name={membersData[membersData.length - 3].name}
            shape="square"
            size={28}
          />
          <Avatar
            image={membersData[membersData.length - 4].image}
            name={membersData[membersData.length - 4].name}
            shape="square"
            size={28}
          />
        </span>
      </Flex>
    );
  }

  return null;
};

export default AvatarChat;
