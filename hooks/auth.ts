import {
  IForgetPasswordPayload,
  ISetPasswordPayload,
  IUser,
  LoginPayload,
  LoginResponse,
  payloadGetUserById,
} from "@/types/auth";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { removeAccessToken } from "@/utils";
// import { actions as agoraActions } from "@/states/agora/slices";
import { useDispatch } from "react-redux";
import { actions as userActions } from "@/states/user/slice";

const MUTATION_LOGIN = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
    }
  }
`;
const GET_USER = gql`
  query getUser {
    getUser {
      email
      id
      salutationType
      email
      firstName
      lastName
      role
      orgUnit
      designation
      profilePicture
      isActive
    }
  }
`;

const GET_USERBYID = gql`
  query getUserById($getUserByIdInput: GetUserByIdInput!) {
    getUserById(getUserByIdInput: $getUserByIdInput) {
      email
      id
      salutationType
      email
      firstName
      lastName
      role
      orgUnit
      designation
      profilePicture
      isActive
      isOnline
    }
  }
`;

const SET_PASSWORD = gql`
  mutation setPassword($setPasswordInput: SetPasswordInput!) {
    setPassword(setPasswordInput: $setPasswordInput) {
      success
    }
  }
`;
const FORGET_PASSWORD = gql`
  mutation forgetPassword($forgetPasswordInput: ForgetPasswordInput!) {
    forgetPassword(forgetPasswordInput: $forgetPasswordInput) {
      success
    }
  }
`;

interface ResponseLoginMutation {
  login: LoginResponse;
}
interface ResponseGetUser {
  getUser: IUser;
}
interface ResponseGetUserById {
  getUserById: IUser;
}
interface IResponseSetPassword {
  setPassword: {
    success: boolean;
  };
}
interface IResponseForgetPassword {
  forgetPassword: {
    success: boolean;
  };
}

export const useLoginSubmit = () => {
  const toast = useToast();
  const [loginSubmit, { data: responseLogin, loading }] = useMutation<
    ResponseLoginMutation,
    LoginPayload
  >(MUTATION_LOGIN, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
  });

  return {
    loginSubmit,
    responseLogin,
    loading,
  };
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = useCallback(async () => {
    // const rtmClient2 = (
    //   await import("@/components/Atoms/Agora/AgoraRTMComponent")
    // ).rtmClient2;
    // const rtmChannel2 = (
    //   await import("@/components/Atoms/Agora/AgoraRTMComponent")
    // ).rtmChannel2;
    // if (rtmClient2 && rtmChannel2) {
    //   dispatch(userActions.clear());
    //   // console.log("ini");

    //   dispatch(agoraActions.setLoggedIn({ agoraState: "loggedOut" }));

    //   rtmChannel2.leave();
    //   rtmClient2.logout();

    //   removeAccessToken();
    //   router.push("/login");
    // } else {

    dispatch(userActions.clear());
    removeAccessToken();
    router.push("/login");

    // }
  }, [router, dispatch]);

  return logout;
};

export const useGetUser = () => {
  const toast = useToast();
  const logout = useLogout();
  const [getUser, { data, loading, called }] = useLazyQuery<ResponseGetUser>(
    GET_USER,
    {
      onError: (error) => {
        toast({
          title: error.message,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
        logout();
      },
    }
  );

  return {
    getUser,
    data,
    loading,
    called,
  };
};
export const useGetUserById = () => {
  const toast = useToast();
  const [getUserById, { data, loading }] = useLazyQuery<
    ResponseGetUserById,
    payloadGetUserById
  >(GET_USERBYID, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
  });

  return {
    getUserById,
    data,
    loading,
  };
};

export const useSetPassword = () => {
  const toast = useToast();
  const [setPassword, { data, loading, error }] = useMutation<
    IResponseSetPassword,
    ISetPasswordPayload
  >(SET_PASSWORD, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
    onCompleted: () => {
      toast({
        title: "Password changed",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
    },
  });

  return {
    setPassword,
    data,
    loading,
    error,
  };
};

export const useForgetPassword = () => {
  const toast = useToast();
  const [forgetPassword, { data, loading, error }] = useMutation<
    IResponseForgetPassword,
    IForgetPasswordPayload
  >(FORGET_PASSWORD, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
  });

  return {
    forgetPassword,
    data,
    loading,
    error,
  };
};
