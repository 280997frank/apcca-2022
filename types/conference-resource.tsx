export interface IConference {
  id: string;
  startAt: string;
  endAt: string;
  title: string;
  descriptionOne: string;
  descriptionTwo: string;
}
export interface IConferenceResource {
  id: string;
  conference: IConference;
  title: string;
  description: string;
  url: string;
  materialType: "VIDEO" | "DOCUMENT";
}
export interface ISpeaker {
  id: string;
  name: string;
  designation: string;
  profilePicture: string;
}
export interface IResponseGetConferenceResourceByDate {
  getConferenceResourceByDate: {
    id: string;
    startAt: string;
    endAt: string;
    title: string;
    descriptionOne: string;
    descriptionTwo: string;
    videos: IConferenceResource[];
    documents: IConferenceResource[];
  }[];
}
export interface IGetConference {
  id: string;
  startAt: string;
  endAt: string;
  title: string;
  descriptionOne: string;
  descriptionTwo: string;
  thumbnail: string;
  url: string;
  slidoUrl: string;
  type: string;
  placeholderVideo: string;
  speakers: ISpeaker[];
}
export interface IResponseGetConference {
  getConference: IGetConference;
}
export interface IResponseGetConferences {
  getConferences: IGetConference[];
}
