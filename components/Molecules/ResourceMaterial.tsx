import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { FC } from "react";

import iconMaterial from "@/assets/images/icon-material.png";
import iconDownload from "@/assets/images/Icon-download.png";

export interface IResourceMaterial {
  title: string;
  description: string;
  onClick: () => void;
}
const ResourceMaterial: FC<IResourceMaterial> = ({
  title,
  description,
  onClick,
  ...props
}) => {
  return (
    <Box
      width="100%"
      padding="16px"
      paddingRight="40px"
      background="#ffffff"
      border="1px solid #D7D7D7"
      borderRadius="8px"
      cursor="pointer"
      position="relative"
      onClick={onClick}
      {...props}
    >
      <Flex gap="16px">
        <Image src={iconMaterial.src} height="40px" alt="icon material" />
        <Flex flexDirection="column" gap="8px" textAlign="left" flex={1}>
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
            noOfLines={2}
          >
            {description}
          </Text>
        </Flex>
      </Flex>
      <Box position="absolute" top="5px" right="5px">
        <Image src={iconDownload.src} alt="icon download" h="32px" />
      </Box>
    </Box>
  );
};

export default ResourceMaterial;
