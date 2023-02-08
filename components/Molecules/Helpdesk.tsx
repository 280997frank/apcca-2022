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

interface IHelpdesk {
  isOpen: boolean;
  onClose: () => void;
}
const Helpdesk: FC<IHelpdesk> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="1.5rem" borderRadius="1rem">
        <ModalHeader>Helpdesk</ModalHeader>
        <ModalBody>
          <Text
            fontWeight="400"
            fontSize="1.25rem"
            lineHeight="1.5rem"
            color="#757575"
          >
            If there is a problem or need help please click button bellow to be
            directed to the following email{" "}
            <strong style={{ color: "#FFDD00" }}>support@40apcca2022.sg</strong>
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
            CLICK TO SEND EMAIL
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Helpdesk;
