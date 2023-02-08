import { Box, Text, useTab } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";

const CustomTab = React.forwardRef((props?: any, ref?: any) => {
  const { date, onClick, isFocus } = props;
  const tabProps = useTab({ ...props, ref });
  const isSelected = isFocus || !!tabProps["aria-selected"];

  return (
    <Box
      {...tabProps}
      display="flex"
      flexDir="column"
      alignItems="center"
      minW={{ base: "250px", md: "150px" }}
      cursor="pointer"
      outline="none"
      onClick={() => onClick(date)}
    >
      <Text
        fontWeight="700"
        fontSize="24px"
        lineHeight="29px"
        color="#222222"
        mt={isSelected ? "0px" : "30px"}
        transition="all 0.5s ease-in;"
      >
        {tabProps.children}
      </Text>
      <Text
        opacity={isSelected ? 1 : 0}
        fontWeight="400"
        fontSize="16px"
        lineHeight="19px"
        color="#222222"
        mt="10px"
        transition="all 0.5s ease-in;"
      >
        {dayjs(date).format("DD MMMM YYYY")}
      </Text>
    </Box>
  );
});
CustomTab.displayName = "CustomTab";

export default CustomTab;
