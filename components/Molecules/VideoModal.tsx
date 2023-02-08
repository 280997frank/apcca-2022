import { FC } from "react";
import {
  AspectRatio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

const VideoModal: FC<Props> = ({ isOpen, onClose, videoSrc }) => {
  return (
    <Modal size="4xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton zIndex={1} />
        <AspectRatio ratio={16 / 9}>
          {isOpen && (
            <video
              controls
              controlsList="nodownload"
              playsInline
              autoPlay
              src={videoSrc}
            />
          )}
        </AspectRatio>
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;
