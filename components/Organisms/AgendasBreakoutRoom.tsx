import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import AgendaBreakoutRoom from "../Molecules/AgendaBreakouRoom";
import { TDataBreakoutRoom } from "@/types/breakoutRoom";

interface Tprops {
  title: string;
  data: TDataBreakoutRoom[];
  disabled: boolean;
}

const AgendasBreakoutRoom: FC<Tprops> = ({ title, data, disabled }) => {
  return (
    <Stack
      width="100%"
      align="flex-start"
      dir="column"
      px={{ base: "20px", lg: "0px" }}
      my="1rem"
    >
      <Text fontWeight="black" my="1rem">
        {title}
      </Text>
      <SimpleGrid
        columns={{
          base: 1,
          lg: 3,
        }}
        spacing={5}
        w="100%"
      >
        {data.map((item, index: number) => {
          return (
            <AgendaBreakoutRoom key={index} data={item} disabled={disabled} />
          );
        })}
      </SimpleGrid>
    </Stack>
  );
};

export default AgendasBreakoutRoom;
