import { PostSingleFile, TUploadSingleFilePayload } from "@/utils/restAPI";
import { useCallback, useState } from "react";

export const useUploadFileViaAPI = () => {
  const [loading, setLoading] = useState(false);
  const fetchUploadFile = useCallback(
    async (payload: TUploadSingleFilePayload) => {
      setLoading(true);
      const responseUploadFile: any = await PostSingleFile(payload);
      setLoading(false);
      return responseUploadFile;
    },
    []
  );
  return {
    loading,
    fetchUploadFile,
  };
};
