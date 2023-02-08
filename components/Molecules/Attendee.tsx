import { FC } from "react";
import { Stack, Text, HStack } from "@chakra-ui/react";
import { Avatar } from "stream-chat-react";
import { useAttendeList } from "@/hooks/chat";
import "@stream-io/stream-chat-css/dist/css/index.css";

const Attendee: FC = () => {
  const { attendeeList } = useAttendeList();
  return (
    <Stack
      alignItems="flex-start"
      bgColor="#FAFAFA"
      padding="5"
      h="100%"
      sx={{
        p: {
          fontFamily: "Roboto",
          color: "#4D4D4D",
        },
      }}
    >
      <Text>{attendeeList.filter((user) => user.online).length} attendees</Text>
      <Stack flex="1" overflow="auto">
        {attendeeList.map(
          (user) =>
            user.online && (
              <HStack key={user.id}>
                <Avatar image={user.image as string} name={user.name} />
                <Text>{user.name}</Text>
              </HStack>
            )
        )}
      </Stack>
    </Stack>
  );
};

export default Attendee;
