export interface IGetZoomParams {
  zoomTokenInput: {
    meetingNumber: string;
    role: number;
  };
}
export interface IGetZoomTokenResponse {
  getZoomToken: string;
}
