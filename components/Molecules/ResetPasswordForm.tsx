import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { Field, Formik, FormikProps } from "formik";
import React, { FC } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import * as yup from "yup";

interface InitialValues {
  newPassword: string;
  confirmNewPassword: string;
}

interface IResetPasswordForm {
  show: boolean;
  loading: boolean;
  onClickShow: () => void;
  setPassword: any;
}

interface IActualForm extends FormikProps<InitialValues> {
  show: boolean;
  loading: boolean;
  onClickShow: () => void;
}

const VALIDATION_SCHEMA = yup.object().shape({
  newPassword: yup.string().required().min(8),
  confirmNewPassword: yup.string().required().min(8),
});

const ActualForm: FC<IActualForm> = ({
  show,
  loading,
  onClickShow,
  handleSubmit,
  errors,
  touched,
}) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Stack direction="column" spacing={{ base: "1.25rem", "3xl": "2rem" }}>
        <FormControl isInvalid={!!errors.newPassword && touched.newPassword}>
          <FormLabel
            htmlFor="newPassword"
            fontWeight="700"
            fontSize={{ base: "1rem", "3xl": "1.25rem" }}
            lineHeight={{ base: "1.25rem", "3xl": "1.5rem" }}
            color="#4D4D4D"
            textTransform="uppercase"
          >
            New Password
          </FormLabel>
          <InputGroup size="md">
            <Field
              as={Input}
              id="newPassword"
              name="newPassword"
              type={show ? "text" : "password"}
              variant="filled"
              border="1px solid #D7D7D7"
              borderRadius="0.5rem"
              background="#ffffff"
              placeholder="********"
            />
            <InputRightElement width="4.5rem">
              {show ? (
                <BiHide onClick={onClickShow} cursor="pointer" />
              ) : (
                <BiShow onClick={onClickShow} cursor="pointer" />
              )}
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors.confirmNewPassword && touched.confirmNewPassword}
        >
          <FormLabel
            htmlFor="confirmNewPassword"
            fontWeight="700"
            fontSize={{ base: "1rem", "3xl": "1.25rem" }}
            lineHeight={{ base: "1.25rem", "3xl": "1.5rem" }}
            color="#4D4D4D"
            textTransform="uppercase"
          >
            Re-Type New Password
          </FormLabel>
          <InputGroup size="md">
            <Field
              as={Input}
              id="confirmNewPassword"
              name="confirmNewPassword"
              type={show ? "text" : "password"}
              variant="filled"
              border="1px solid #D7D7D7"
              borderRadius="0.5rem"
              background="#ffffff"
              placeholder="********"
            />
            <InputRightElement width="4.5rem">
              {show ? (
                <BiHide onClick={onClickShow} cursor="pointer" />
              ) : (
                <BiShow onClick={onClickShow} cursor="pointer" />
              )}
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.confirmNewPassword}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          height={{ base: "57px", "3xl": "72px" }}
          width="full"
          background="#FFDD00"
          borderRadius="1rem"
          fontWeight="700"
          fontSize={{ base: "1rem", "3xl": "1.25rem" }}
          lineHeight={{ base: "1.25rem", "3xl": "1.5rem" }}
          color="#222222"
          isLoading={loading}
          _hover={{}}
          _active={{}}
        >
          CHANGE PASSWORD
        </Button>
      </Stack>
    </form>
  );
};

const ResetPasswordForm: FC<IResetPasswordForm> = ({
  show,
  loading,
  onClickShow,
  setPassword,
}) => {
  return (
    <Formik
      initialValues={{
        newPassword: "",
        confirmNewPassword: "",
      }}
      component={(props) => (
        <ActualForm
          {...props}
          show={show}
          loading={loading}
          onClickShow={onClickShow}
        />
      )}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={async (values) => {
        await setPassword({
          variables: {
            setPasswordInput: {
              newPassword: values.newPassword,
              confirmNewPassword: values.confirmNewPassword,
            },
          },
        });
      }}
    ></Formik>
  );
};

export default ResetPasswordForm;
