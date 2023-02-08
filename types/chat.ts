interface IJurisdiction {
  id: string;
  state: string;
  countryCode: string;
  country: string;
  flagUrl: string;
}

export interface IUser {
  id: string;
  salutationType: "MR" | "MS" | "MRS" | "DR" | "PROF";
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
  orgUnit: string;
  designation: string;
  profilePicture: string;
  jurisdiction: IJurisdiction;
  isActive: boolean;
}

export interface IGetChatTokenResponse {
  getUserGetstream: {
    token: string;
    user: IUser;
  };
}
