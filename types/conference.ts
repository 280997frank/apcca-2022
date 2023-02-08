import { Dayjs } from "dayjs";
import { SetStateAction } from "react";

export interface IConference {
  id: string;
  startAt: string;
  endAt: string;
  title: string;
  descriptionOne: string;
  descriptionTwo: string;
  isLive: boolean | string;
  thumbnail: string;
  slidoUrl: string;
}

export interface IResConferenceByDate {
  getConferenceByDate: IConference[];
}

export interface IPayloadConferenceByDate {
  getConferenceByDateInput: {
    currentTime?: string;
    date: string;
  };
}

export interface IConferenceWithAnimation extends IConference {
  showAnimation?: boolean;
}

export type TConferenceProgrammeProps = React.FC<{
  data: IConference[];
  initialDate: Dayjs;
  onChangeTab: (date: SetStateAction<Dayjs>) => void;
}>;
