import iconArrowRightYellow from "@/assets/icons/icon-arrow-right-yellow.svg";
import iconDocument from "@/assets/icons/icon-document.svg";
import iconThumb from "@/assets/icons/icon-thumb.svg";
import iconVideo from "@/assets/icons/icon-video.svg";
import {
  ENoticeboardAssetType,
  INoticeboardAsset,
  TNoticeboardItemProps,
} from "@/types/noticeboard";
import { Box, Button, Flex, Heading, Image, Img, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NoticeboardPdfViewer from "./NoticeboardPDFViewer";
import VideoModal from "./VideoModal";

const NoticeboardItem: TNoticeboardItemProps = (props) => {
  const { data, onClickDetail, onClickLike } = props;
  const [isLike, setIsLike] = useState<boolean>(false);
  const [totalLike, setTotalLike] = useState<number>(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<
    INoticeboardAsset | undefined
  >();

  useEffect(() => {
    setIsLike(data.isLike);
    setTotalLike(data.totalLike);
  }, [data]);

  const handleOnClickLike = () => {
    setIsLike(!isLike);
    setTotalLike(isLike ? totalLike - 1 : totalLike + 1);
    onClickLike(data.id, !isLike);
  };

  return (
    <Flex
      p={4}
      gridGap={3}
      flexDir="column"
      height="100%"
      width="100%"
      bgColor="white"
      borderRadius="0.5rem"
      border="2px solid #d7d7d7"
    >
      <Flex justifyContent="space-between">
        <Heading as="h4" fontSize="24px">
          {data.title}
        </Heading>
        <Button
          variant="ghost"
          rightIcon={<Img src={iconArrowRightYellow.src} />}
          color="brand.yellow"
          onClick={() => {
            onClickDetail(data);
          }}
        >
          DETAIL
        </Button>
      </Flex>
      <Text
        sx={{
          ol: {
            paddingStart: "1em",
            paddingEnd: "1em",
          },
          ul: {
            paddingStart: "1em",
            paddingEnd: "1em",
          },
        }}
        dangerouslySetInnerHTML={{
          __html: data.description,
        }}
      />
      <Flex gridGap="1rem">
        {data.photosAndVideos.map((item, index) => {
          if (item.noticeboardAssetType === ENoticeboardAssetType.PHOTO) {
            return (
              <Image
                alt={item.title}
                src={item.url}
                key={index}
                maxWidth={{
                  base: "",
                  lg: "400px",
                }}
                fallback={<p>loading image...</p>}
              />
            );
          }
          return null;
        })}
      </Flex>

      <Flex gridGap="1rem">
        {data.photosAndVideos &&
          data.photosAndVideos.map((item, index) => {
            if (item.noticeboardAssetType === ENoticeboardAssetType.VIDEO) {
              return (
                <Button
                  key={index}
                  variant="solid"
                  leftIcon={<Img src={iconVideo.src} />}
                  bgColor="brand.cream"
                  fontWeight="400"
                  fontSize="12px"
                  border="1px solid #d7d7d7"
                  borderRadius="0.5rem"
                  onClick={() => {
                    setIsVideoModalOpen(true);
                    setVideoUrl(item.url);
                  }}
                >
                  {item.title}
                </Button>
              );
            }
            return null;
          })}
        {data.documents &&
          data.documents.map((item, index) => (
            <Button
              key={index}
              variant="solid"
              leftIcon={<Img src={iconDocument.src} />}
              bgColor="brand.cream"
              fontWeight="400"
              fontSize="12px"
              border="1px solid #d7d7d7"
              borderRadius="0.5rem"
              onClick={() => {
                setIsPdfModalOpen(true);
                setSelectedDoc(item);
              }}
            >
              {item.title}
            </Button>
          ))}
      </Flex>
      <Box>
        <Button
          variant="solid"
          fontWeight="400"
          fontSize="12px"
          borderRadius="0.5rem"
          border={isLike ? "1px solid brand.yellow" : "1px solid #d7d7d7"}
          leftIcon={<Img src={iconThumb.src} />}
          bgColor={isLike ? "brand.yellow" : "brand.lightGrey"}
          _hover={{
            textDecoration: "none",
          }}
          _focus={{ outline: "0" }}
          onClick={handleOnClickLike}
        >
          {totalLike}
        </Button>
      </Box>

      <VideoModal
        videoSrc={videoUrl}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
      {selectedDoc && (
        <NoticeboardPdfViewer
          data={selectedDoc}
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
        />
      )}
    </Flex>
  );
};

export default NoticeboardItem;
