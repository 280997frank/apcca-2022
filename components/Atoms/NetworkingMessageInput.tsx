/* eslint-disable react/no-children-prop */
import { FC } from "react";
import { InputRightElement, InputGroup, Box, HStack } from "@chakra-ui/react";
import {
  useMessageInputContext,
  UploadsPreview,
  ChatAutoComplete,
} from "stream-chat-react";
import { FileUploadButton } from "react-file-utils";
import "@stream-io/stream-chat-css/dist/css/index.css";
import AttachmentIcon from "@/components/Atoms/Icons/AttachmentIcon";
import SendIcon from "./Icons/SendIcon";

const NetworkingMessageInput: FC = () => {
  const { handleSubmit, uploadNewFiles } = useMessageInputContext();

  return (
    <Box px="4" pt="2">
      <UploadsPreview />
      <InputGroup
        sx={{
          textarea: {
            padding: "5px 50px 5px 8px",
            minHeight: "40px",
          },
        }}
      >
        <ChatAutoComplete />
        <InputRightElement
          w="auto"
          pr="2"
          children={
            <HStack>
              <FileUploadButton accepts="" handleFiles={uploadNewFiles}>
                <AttachmentIcon color="#FFDD00" />
                {/* <Img cursor="pointer" src={fileIcon.src} w="16px" /> */}
              </FileUploadButton>
              <SendIcon
                color="#757575"
                cursor="pointer"
                onClick={handleSubmit}
              />
            </HStack>
          }
        />
      </InputGroup>
    </Box>
  );
};

export default NetworkingMessageInput;
