import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}
const CantJoinModal: FC<IModal> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="1.5rem" borderRadius="1rem">
        <ModalHeader>Sorry can’t join this room </ModalHeader>
        <ModalBody>
          <Text
            fontWeight="400"
            fontSize="1.25rem"
            lineHeight="1.5rem"
            color="#757575"
          >
            the room has met the capacity of participants, please join another
            room.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            w="full"
            bgColor="#FFDD00"
            borderRadius="1rem"
            height="51px"
            onClick={onClose}
            _hover={{}}
            _focus={{}}
          >
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CantJoinModal;
