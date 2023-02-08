import React, { FC } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import iconVideos from "@/assets/images/icon-videos.png";

export interface IResourceVideo {
  title: string;
  description: string;
  onClick?: () => void;
}
const ResourceVideo: FC<IResourceVideo> = ({
  title,
  description,
  onClick,
  ...props
}) => {
  return (
    <Box
      width="100%"
      padding="16px"
      background="#ffffff"
      border="1px solid #D7D7D7"
      borderRadius="8px"
      cursor="pointer"
      onClick={onClick}
      {...props}
    >
      <Flex gap="16px">
        <Image src={iconVideos.src} height="40px" alt="icon videos" />
        <Flex flexDirection="column" gap="8px" textAlign="left">
          <Text
            fontWeight="700"
            fontSize="14px"
            lineHeight="17px"
            color="#000000"
          >
            {title}
          </Text>
          <Text
            fontWeight="400"
            fontSize="12px"
            lineHeight="14px"
            color="#000000"
            noOfLines={3}
          >
            {description}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ResourceVideo;
