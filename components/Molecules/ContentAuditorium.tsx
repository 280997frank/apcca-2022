import React, { FC } from "react";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";

import { ISpeaker } from "@/types/conference-resource";

export interface IContentAuditorium {
  title?: string;
  startAt?: string;
  endAt?: string;
  speakers?: ISpeaker[];
  description?: string;
}

const ContentAuditorium: FC<IContentAuditorium> = ({
  title,
  startAt,
  endAt,
  speakers,
  description,
}) => {
  return (
    <Box px={{ base: "1rem", lg: "1rem", xl: "0rem" }}>
      <Text
        fontWeight="600"
        fontSize={{ base: "1.125rem", lg: "1.5rem" }}
        lineHeight={{ base: "1.375rem", lg: "1.75rem" }}
        color="#4D4D4D"
        mb="0.5rem"
      >
        {title}
      </Text>
      <Text
        fontWeight={{ base: "600", lg: "400" }}
        fontSize={{ base: "1rem", lg: "1.25rem" }}
        lineHeight={{ base: "1.1875rem", lg: "1.5rem" }}
        color="#4D4D4D"
        mb="1rem"
      >
        {dayjs(startAt).format("DD MMMM YYYY - hh.mm ")}
        {dayjs(endAt).format("-hh.mm")}
      </Text>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={{ base: "0.5rem", lg: "1rem" }}
        mb="2rem"
      >
        {speakers?.map((speaker, i) => (
          <GridItem key={i} w="100%">
            <Box
              background={{ base: "rgba(250, 250, 250, 0.8)", lg: "none" }}
              borderRadius="1rem"
              p="0.5rem"
            >
              <Flex gap="1rem">
                <Image
                  src={speaker.profilePicture}
                  alt="Speaker"
                  width={{ base: "45px", lg: "80px" }}
                  height={{ base: "45px", lg: "80px" }}
                  borderRadius="16px"
                />
                <Flex
                  flexDir="column"
                  mt={{ base: "0rem", "3xl": "0.9375rem" }}
                >
                  <Text
                    fontWeight="600"
                    fontSize="1rem"
                    lineHeight="1.1875rem"
                    color="#E3C607"
                  >
                    {speaker.name}
                  </Text>
                  <Text
                    fontWeight="400"
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    lineHeight="1.1875rem"
                    color="#757575"
                    textAlign="justify"
                  >
                    {speaker.designation}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <Text
        fontFamily="Roboto"
        fontWeight="500"
        fontSize="1rem"
        lineHeight={{ base: "1.1875rem", lg: "1.5rem" }}
        color="#4D4D4D"
        mb="2rem"
        pl="10px"
        textAlign="justify"
      >
        {description}
      </Text>

      <Divider borderColor="#4D4D4D" />
    </Box>
  );
};

export default ContentAuditorium;
