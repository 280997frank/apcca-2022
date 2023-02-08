import ArrowRight from "@/assets/images/ArrowToRight.png";
import CircleIcon from "@/components/Atoms/Icons/CircleIcon";
import { useSubscriptionBreakoutRoom } from "@/hooks/breakout-rom";
import { useJoinZoom } from "@/hooks/zoom";
import { TDataBreakoutRoom } from "@/types/breakoutRoom";
import { AspectRatio, Box, Button, Image, Stack, Text } from "@chakra-ui/react";
import { FC, useLayoutEffect, useState } from "react";
import CantJoinModal from "./CantJoinModal";
interface Tprops {
  data: TDataBreakoutRoom;
  disabled: boolean;
}

const AgendaBreakoutRoom: FC<Tprops> = ({ data, disabled }) => {
  const [isOpenCantJoin, setCantJoin] = useState(false);
  const [isShow, setShow] = useState(data.isShow);
  const joinRoom = useJoinZoom();
  const { data: responseSub } = useSubscriptionBreakoutRoom();
  const [newOccupiedCapacity, setOccupiedCapacity] = useState(
    data.occupiedCapacity
  );

  // const { fetchJoinBreakoutRoom } = useJoinBreakoutRoom();
  // const { fetchExitBreakoutRoom } = useExitBreakoutRoom();

  useLayoutEffect(() => {
    if (responseSub) {
      if (responseSub.breakoutRoomUpdate.breakoutRoomId === data.id) {
        setOccupiedCapacity(responseSub.breakoutRoomUpdate.count);
        setShow(responseSub.breakoutRoomUpdate.isShow);
      }
    }
  }, [data.id, responseSub]);

  const setColor = (capacity: number) => {
    if (capacity < 40) {
      return "green";
    }
    if (capacity >= 40 && capacity <= 49) {
      return "yellow";
    }
    if (capacity >= 50) {
      return "red";
    }
    return "green";
  };
  return (
    <Stack
      direction="column"
      align="flex-start"
      display={isShow ? "flex" : "none"}
      opacity={disabled ? ".9" : "1"}
    >
      <Box position="relative" height="auto" w={"100%"}>
        <Box
          bgColor={disabled ? "gray" : "transparent"}
          opacity=".5"
          width="100%"
          height={"100%"}
          position="absolute"
          left={0}
          right={0}
          top={0}
          bottom={0}
          zIndex={99}
        ></Box>
        <AspectRatio ratio={16 / 9}>
          <Image
            // src={`https://via.placeholder.com/800x450/FFDD00?text=${data.conference.title.replace(
            //   /\s/g,
            //   "+"
            // )}`}
            src={data.thumbnail}
            alt="thumnail"
            fallback={<Text>Loading...</Text>}
            display="block"
            w="100%"
            h="auto"
            borderRadius="lg"
          />
        </AspectRatio>
        {!disabled && (
          <CircleIcon
            color={setColor(newOccupiedCapacity)}
            boxSize={5}
            position="absolute"
            right="1%"
            top="1%"
          />
        )}
      </Box>
      <Text fontWeight="black" color={disabled ? "#999" : "black"}>
        {data.conference.title}
      </Text>
      <Button
        w={"100%"}
        display="flex"
        gap={3}
        bgColor={newOccupiedCapacity >= 50 || disabled ? "gray" : "transparent"}
        _hover={{
          bgColor:
            newOccupiedCapacity >= 50 || disabled ? "gray" : "transparent",
        }}
        role="group"
        fontWeight="black"
        border="1px solid black"
        outline="none"
        _focus={{
          outline: "none",
        }}
        isDisabled={disabled ? true : false}
        onClick={() => {
          // fetchJoinBreakoutRoom({
          //   variables: {
          //     joinBreakoutRoomInput: {
          //       breakoutRoomId: data.id,
          //     },
          //   },
          // });
          if (newOccupiedCapacity >= 50) {
            setCantJoin(true);
          } else {
            // alert("open new tab");
            joinRoom(data.zoomMeetingId.replace(/\s/g, ""), data.zoomPassword);
            // joinRoom("75174922947", "L1x0Uu");
          }
        }}
      >
        {/* JOIN ROOM {newOccupiedCapacity} === {data.id} */}
        JOIN ROOM
        <Image
          display="none"
          transition="2s"
          _groupHover={{
            transition: "2s",
            display: "block",
          }}
          src={ArrowRight.src}
          alt="arrow"
        />
      </Button>
      <CantJoinModal
        isOpen={isOpenCantJoin}
        onClose={() => setCantJoin(false)}
      />
    </Stack>
  );
};

export default AgendaBreakoutRoom;
