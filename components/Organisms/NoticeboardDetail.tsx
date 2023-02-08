import iconArrowLeft from "@/assets/icons/icon-arrow-left.svg";
import iconDocument from "@/assets/icons/icon-document.svg";
import iconThumb from "@/assets/icons/icon-thumb.svg";
import {
  ENoticeboardAssetType,
  INoticeboardAsset,
  TNoticeboardDetailProps,
} from "@/types/noticeboard";
import { Box, Button, Flex, Heading, Image, Img, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NoticeboardPdfViewer from "../Molecules/NoticeboardPDFViewer";

const NoticeboardDetail: TNoticeboardDetailProps = (props) => {
  const { data, onToggle, onClickLike } = props;
  const [isLike, setIsLike] = useState<boolean>(false);
  const [totalLike, setTotalLike] = useState<number>(0);
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
    <Flex px={{ base: 0, lg: 8 }} flexDir="column" gridGap={3}>
      <Box my={8}>
        <Button
          variant="ghost"
          leftIcon={<Img src={iconArrowLeft.src} />}
          onClick={onToggle}
        >
          Back
        </Button>
      </Box>
      <Flex
        p={4}
        height="100%"
        width="100%"
        bgColor="white"
        borderRadius="0.5rem"
        border="2px solid #d7d7d7"
        flexDir="column"
        gridGap={3}
        mb={10}
      >
        <Heading as="h4" fontSize="24px">
          {data.title}
        </Heading>
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
        <Flex gridGap={4}>
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

        {data.documents.length > 0 && (
          <Box>
            <Text>Attachments</Text>
            {data.documents.map((item, index) => (
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
          </Box>
        )}

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
      </Flex>
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

export default NoticeboardDetail;
