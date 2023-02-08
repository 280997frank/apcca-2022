import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field, Formik, FormikProps } from "formik";
import React, { FC } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import * as yup from "yup";

interface InitialValues {
  email: string;
  password: string;
}

interface ILoginForm {
  show: boolean;
  loading: boolean;
  onClickShow: () => void;
  onShowForgotPassword: () => void;
  loginSubmit: any;
}

interface IActualForm extends FormikProps<InitialValues> {
  show: boolean;
  loading: boolean;
  onClickShow: () => void;
  onShowForgotPassword: () => void;
}

const VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const ActualForm: FC<IActualForm> = ({
  show,
  loading,
  onClickShow,
  handleSubmit,
  onShowForgotPassword,
  errors,
  touched,
}) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Stack direction="column" spacing={{ base: "20px", "3xl": "32px" }}>
        <FormControl isInvalid={!!errors.email && touched.email}>
          <FormLabel
            htmlFor="email"
            fontWeight="700"
            fontSize={{ base: "16px", "3xl": "20px" }}
            lineHeight={{ base: "20px", "3xl": "24px" }}
            color="#4D4D4D"
          >
            Email
          </FormLabel>
          <Field
            as={Input}
            id="email"
            name="email"
            type="email"
            size="md"
            variant="filled"
            border="1px solid #D7D7D7"
            borderRadius="8px"
            background="#ffffff"
            placeholder="email@email.com"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password && touched.password}>
          <FormLabel
            htmlFor="password"
            fontWeight="700"
            fontSize={{ base: "16px", "3xl": "20px" }}
            lineHeight={{ base: "20px", "3xl": "24px" }}
            color="#4D4D4D"
          >
            Password
          </FormLabel>
          <InputGroup size="md">
            <Field
              as={Input}
              id="password"
              name="password"
              type={show ? "text" : "password"}
              variant="filled"
              border="1px solid #D7D7D7"
              borderRadius="8px"
              background="#ffffff"
              placeholder="********"
              validate={(value: string) => {
                let error;

                if (value.length < 5) {
                  error = "Password must contain at least 6 characters";
                }

                return error;
              }}
            />
            <InputRightElement width="4.5rem">
              {show ? (
                <BiHide onClick={onClickShow} cursor="pointer" />
              ) : (
                <BiShow onClick={onClickShow} cursor="pointer" />
              )}
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password}</FormErrorMessage>
          <Flex justifyContent="end" mt="9px">
            <Text
              cursor="pointer"
              _hover={{
                textDecoration: "underline",
              }}
              fontWeight="500"
              fontSize={{ base: "12px", "3xl": "16px" }}
              lineHeight="19.2px"
              onClick={onShowForgotPassword}
            >
              Forgot Password?
            </Text>
          </Flex>
        </FormControl>
        <Button
          type="submit"
          height={{ base: "57px", "3xl": "72px" }}
          width="full"
          background="#FFDD00"
          borderRadius="16px"
          fontWeight="700"
          fontSize={{ base: "16px", "3xl": "20px" }}
          lineHeight={{ base: "20px", "3xl": "24px" }}
          color="#222222"
          isLoading={loading}
          _hover={{}}
          _active={{}}
        >
          SIGN IN
        </Button>
      </Stack>
    </form>
  );
};

const LoginForm: FC<ILoginForm> = ({
  show,
  loading,
  onClickShow,
  onShowForgotPassword,
  loginSubmit,
}) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      component={(props) => (
        <ActualForm
          {...props}
          show={show}
          loading={loading}
          onClickShow={onClickShow}
          onShowForgotPassword={onShowForgotPassword}
        />
      )}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={async (values) => {
        await loginSubmit({
          variables: {
            loginInput: {
              email: values.email,
              password: values.password,
            },
          },
        });
      }}
    ></Formik>
  );
};

export default LoginForm;
