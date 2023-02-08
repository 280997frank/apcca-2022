import { Flex, Text } from "@chakra-ui/react";
import APCCAAndSPSIcons from "./APCCAAndSPSIcons";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      alignItems={{ base: "center", xl: "flex-end" }}
      py="40px"
      p={{ base: "20px", xl: "40px 30px" }}
      gap="36px"
      h={{ base: "unset", xl: "15%" }}
    >
      <Text
        fontWeight="700"
        fontSize={{ base: "16px", md: "32px" }}
        lineHeight="normal"
        color="#222222"
        flex="1"
      >
        {title}
      </Text>
      <APCCAAndSPSIcons />
    </Flex>
  );
};

export default PageTitle;
