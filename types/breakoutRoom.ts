export interface TDataBreakoutRoom {
  id: string;
  name: string;
  occupiedCapacity: number;
  zoomMeetingId: string;
  zoomPassword: string;
  isShow: boolean;
  thumbnail: string;
  conference: {
    title: string;
    thumbnail: string;
  };
}
export interface TGetBreakOutRoomsResponse {
  dayOne: TDataBreakoutRoom[];
  dayTwo: TDataBreakoutRoom[];
  dayThree: TDataBreakoutRoom[];
  dayFour: TDataBreakoutRoom[];
  dayFive: TDataBreakoutRoom[];
}

export interface ResponseJoinBreakoutRoomMutation {
  joinBreakoutRoom: TDataBreakoutRoom;
}
export interface JoinBreakoutRoomPayload {
  joinBreakoutRoomInput: {
    breakoutRoomId: string;
  };
}
export interface ResponseExitBreakoutRoomMutation {
  success: boolean;
}
export interface ExitBreakoutRoomPayload {
  exitBreakoutRoomInput: {
    breakoutRoomId: string;
  };
}
export interface TPayload {
  joinBreakoutRoomInput: {
    breakoutRoomId: string;
  };
}

export interface ResponseSubBreakoutRoomMutation {
  breakoutRoomUpdate: {
    breakoutRoomId: string;
    count: number;
    isShow: boolean;
  };
}
