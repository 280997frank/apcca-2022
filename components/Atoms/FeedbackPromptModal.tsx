import React, { useRef } from "react";
import {
  Text,
  Link,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface FeedbackPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackPromptModal({
  isOpen,
  onClose,
}: FeedbackPromptModalProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={linkRef}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody p={4} textAlign="center">
          <Text mb={8}>Please submit feedback first before logging out.</Text>
          <NextLink href="/feedback" passHref>
            <Link
              bgColor="#fd0"
              py={2}
              px={4}
              borderRadius="lg"
              fontWeight="bold"
              ref={linkRef}
            >
              Go to Feedback
            </Link>
          </NextLink>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
