import { gql, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useErrorMessage } from "@/hooks";
import { actions as zoomActions } from "@/states/zoom/slice";
import { IGetZoomParams, IGetZoomTokenResponse } from "@/types/zoom";

const GET_ZOOM_TOKEN = gql`
  mutation getZoomToken($zoomTokenInput: ZoomTokenInput!) {
    getZoomToken(zoomTokenInput: $zoomTokenInput)
  }
`;

export const useZoomToken = () => {
  const [getZoomToken, { data, loading, error }] = useMutation<
    IGetZoomTokenResponse,
    IGetZoomParams
  >(GET_ZOOM_TOKEN, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });

  useErrorMessage(error);

  return {
    getZoomToken,
    loading,
    token: data ? data.getZoomToken : null,
  };
};

export const useJoinZoom = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const joinRoom = (meetingNumber: string, passWord: string) => {
    dispatch(
      zoomActions.setReady({
        meetingNumber,
        passWord,
      })
    );
    router.push("/zoom");
  };

  return joinRoom;
};
