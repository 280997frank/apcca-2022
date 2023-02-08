import { TNoticeboardPdfViewerProps } from "@/types/noticeboard";
import { useState } from "react";
import PDFViewer from "./PDFViewer";

const NoticeboardPdfViewer: TNoticeboardPdfViewerProps = (props) => {
  const { data, onClose, isOpen } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState<number>(0);
  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) {
    setNumPages(nextNumPages);
  }
  return (
    <PDFViewer
      pdfUrl={data.url}
      title="Document"
      numPages={numPages}
      pageNumber={pageNumber}
      isOpen={isOpen}
      setPageNumber={setPageNumber}
      onClose={onClose}
      onDocumentLoadSuccess={onDocumentLoadSuccess}
    />
  );
};

export default NoticeboardPdfViewer;
