import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Field, Formik, FormikProps } from "formik";
import { FC } from "react";
import * as yup from "yup";

interface InitialValues {
  email: string;
}

interface IActualForm extends FormikProps<InitialValues> {
  loading: boolean;
  onClickShow: () => void;
}

const VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email().required(),
});

const ActualForm: FC<IActualForm> = ({
  loading,
  onClickShow,
  handleSubmit,
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
          SEND
        </Button>
        <Button
          height={{ base: "57px", "3xl": "72px" }}
          width="full"
          background="transparent"
          borderRadius="16px"
          border="3px solid #222222"
          fontWeight="700"
          fontSize={{ base: "16px", "3xl": "20px" }}
          lineHeight={{ base: "20px", "3xl": "24px" }}
          color="#222222"
          textTransform="uppercase"
          _hover={{}}
          _active={{}}
          onClick={onClickShow}
        >
          sign in
        </Button>
      </Stack>
    </form>
  );
};

interface IForgotPasswordForm {
  loading: boolean;
  onClickShow: () => void;
  submit: (values: { email: string }) => void;
}

const ForgotPasswordForm: FC<IForgotPasswordForm> = ({
  loading,
  onClickShow,
  submit,
}) => {
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      component={(props) => (
        <ActualForm {...props} loading={loading} onClickShow={onClickShow} />
      )}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={submit}
    ></Formik>
  );
};

export default ForgotPasswordForm;
