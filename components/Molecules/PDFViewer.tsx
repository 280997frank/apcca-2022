import React, { FC, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, useInView } from "framer-motion";
import { MdDownload } from "react-icons/md";
import { isPDFFile, isPPTFile } from "@/utils";

const pdfjsVersion: string = pdfjs.version;

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`;

export interface IPageCustom {
  index: number;
  setPageNumber: (index: number) => void;
}
const PageCustom: FC<IPageCustom> = ({ index, setPageNumber, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [isSmWidth] = useMediaQuery("(max-width: 47em)");

  useEffect(() => {
    if (isInView) {
      setPageNumber(index + 1);
    }
  }, [index, isInView, setPageNumber]);

  return (
    <motion.div ref={ref} key={`page_${index + 1}`} {...props}>
      <Page width={isSmWidth ? 350 : 850} pageNumber={index + 1} />
    </motion.div>
  );
};

export interface IPDFViewer {
  pdfUrl: string;
  title: string;
  numPages: number;
  pageNumber: number;
  isOpen: boolean;
  setPageNumber: (index: number) => void;
  onClose: () => void;
  onDocumentLoadSuccess: ({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) => void;
}
const PDFViewer: FC<IPDFViewer> = ({
  pdfUrl,
  title,
  numPages,
  pageNumber,
  setPageNumber,
  isOpen,
  onClose,
  onDocumentLoadSuccess,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "sm", md: "2xl", lg: "4xl", xl: "6xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody
          p={0}
          flexDir="row"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <Box width="100%">
            <Box
              backgroundColor="rgb(50, 54, 57)"
              color="white"
              padding="0 16px"
              height="56px"
              display="flex"
              alignItems="center"
            >
              <Flex flex={1} alignItems="center">
                {isPDFFile(pdfUrl) && (
                  <>
                    <Box width={`${100 / 3}%`}>
                      <Text
                        noOfLines={1}
                        fontWeight="600"
                        fontSize={{ base: "16px", md: "24px" }}
                      >
                        {title || "Loading..."}
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      width={`${100 / 3}%`}
                      justifyContent="center"
                    >
                      <Text
                        fontWeight="600"
                        fontSize={{ base: "16px", md: "24px" }}
                      >
                        {pageNumber} / {numPages}
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="end"
                      width={`${100 / 3}%`}
                    >
                      <IconButton
                        aria-label="Download"
                        icon={<MdDownload fontSize="24px" />}
                        backgroundColor="transparent"
                        onClick={() => window.open(pdfUrl, "_blank")}
                        _focus={{}}
                      />
                    </Box>
                  </>
                )}

                {isPPTFile(pdfUrl) && (
                  <>
                    <Box width={`${100 / 2}%`}>
                      <Text
                        fontWeight="600"
                        fontSize={{ base: "16px", md: "24px" }}
                      >
                        {title || "Loading..."}
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="end"
                      width={`${100 / 2}%`}
                    >
                      <IconButton
                        aria-label="Download"
                        icon={<MdDownload fontSize="24px" />}
                        backgroundColor="transparent"
                        onClick={() => window.open(pdfUrl, "_blank")}
                        _focus={{}}
                      />
                    </Box>
                  </>
                )}
              </Flex>
            </Box>
            <Box
              height={{ base: "60vh", md: "80vh" }}
              overflow="auto"
              background="#525659"
              py="10px"
              sx={{
                scrollbarWidth: "none",
                "::-webkit-scrollbar": {
                  display: "none",
                },
                ".react-pdf__Page__textContent": {
                  border: "1px solid darkgrey",
                  borderRadius: "5px",
                },
                ".react-pdf__Page__annotations.annotationLayer": {},
                ".react-pdf__Page__canvas": {
                  margin: "10px auto",
                },
              }}
            >
              {isPDFFile(pdfUrl) && (
                <Document
                  file={pdfUrl}
                  options={{ workerSrc: "/pdf.worker.js" }}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(new Array(numPages), (_, index) => {
                    return (
                      <PageCustom
                        key={index}
                        index={index}
                        setPageNumber={setPageNumber}
                      />
                    );
                  })}
                </Document>
              )}

              {isPPTFile(pdfUrl) && (
                <iframe
                  src={`https://view.officeapps.live.com/op/embed.aspx?src=${pdfUrl}`}
                  width="100%"
                  height="100%"
                />
              )}
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PDFViewer;
