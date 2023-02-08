import React, { Fragment, useEffect, useRef, useState } from "react";
import { TiArrowRight } from "react-icons/ti";
import {
  Box,
  Button,
  Heading,
  Avatar,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import ModalsCustume from "@/components/Molecules/ModalsCustume";
import { Form, Formik, FormikProps, useField } from "formik";
import { useUploadFileViaAPI } from "@/hooks/upload";
import { useSelector } from "react-redux";
import { RootState } from "@/states/store";
import { useDispatch } from "react-redux";
import { actions } from "@/states/user/slice";
interface IUpdateProfile {
  isOpen: boolean;
  onToggle: () => void;
}

function UpdateProfileModals({ onToggle, isOpen }: IUpdateProfile) {
  const toast = useToast();
  const [imageState, setImageState] = useState("");
  const dispatch = useDispatch();
  const { profilePicture, firstName, lastName, orgUnit } = useSelector(
    (state: RootState) => state.user
  );
  const formRef = useRef<FormikProps<{ imageUrl: File | string }>>(null);
  const { fetchUploadFile, loading: uploadLoading } = useUploadFileViaAPI();

  useEffect(() => {
    if (profilePicture) {
      setImageState(profilePicture);
    }
  }, [profilePicture]);
  return (
    <ModalsCustume
      title="Upload your photo"
      onToggle={onToggle}
      isOpen={isOpen}
    >
      <Fragment>
        <Formik
          enableReinitialize
          innerRef={formRef}
          initialValues={{ imageUrl: "" }}
          onSubmit={async ({ imageUrl }) => {
            if (imageUrl instanceof File) {
              fetchUploadFile({ file: imageUrl })
                .then((value) => {
                  // console.log("value", value.data.url);
                  // setImageState(value.data.url);
                  dispatch(
                    actions.setProfilePicture({
                      profilePicture: value.data.url,
                    })
                  );
                })
                // .then(() => getUser())
                .then(() => {
                  onToggle();
                  toast({
                    title: "Success !",
                    position: "bottom",
                    status: "success",
                  });
                })
                .catch((e) => {
                  console.log("error", e);
                });
            }
          }}
        >
          {({ values, handleSubmit }) => {
            const prevImage =
              values.imageUrl instanceof File
                ? URL.createObjectURL(values.imageUrl)
                : imageState;
            return (
              <>
                <Box>
                  <Avatar
                    boxSize="9rem"
                    objectFit="cover"
                    alignItems="center"
                    borderRadius="25%"
                    onLoad={() => {
                      URL.revokeObjectURL(prevImage);
                    }}
                    src={prevImage}
                    loading="lazy"
                  />
                </Box>
                <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <FieldFileInput name="imageUrl" />
                  <label htmlFor="imageUrl">
                    <HStack
                      w="100%"
                      border="1px solid #DDE0E3"
                      borderRadius="5px"
                    >
                      <Box
                        borderRadius="5px"
                        bg="#DDE0E3"
                        minW="fit-content"
                        cursor="pointer"
                        p="10px"
                        color="#333"
                        _active={{
                          backgroundColor: "rgba(221, 224, 227, .6)",
                        }}
                      >
                        Browse File
                      </Box>
                      <Input
                        type="text"
                        pr="6px"
                        placeholder="No file selected"
                        disabled
                        value={
                          values.imageUrl instanceof File
                            ? (values.imageUrl as File).name
                            : values.imageUrl
                        }
                        variant="unstyled"
                        color="#787878"
                      ></Input>
                      {/* */}
                    </HStack>
                    <Box as="span" fontSize=".7rem" color="#000">
                      Please input the file only in jpg, jpeg or png format
                    </Box>
                  </label>
                </Form>
              </>
            );
          }}
        </Formik>
        <VStack alignItems="center" maxW="fit-content">
          <Heading color="#222" fontSize="1rem" textAlign="center">
            {`${firstName} ${lastName}`}
          </Heading>
          <Text color="#222" fontSize=".8rem">
            Indonesia
          </Text>
          <Text color="#222" fontSize=".8rem" textAlign="center">
            {orgUnit}
          </Text>
        </VStack>
        <Button
          color="#000"
          bg="#FFDD00"
          _hover={{}}
          _focus={{ outline: "none" }}
          _active={{ backgroundColor: "rgba(255, 221, 0, .6)" }}
          onClick={() =>
            formRef && formRef.current && formRef.current.submitForm()
          }
          isLoading={uploadLoading}
        >
          Save Profile <TiArrowRight />{" "}
        </Button>
      </Fragment>
    </ModalsCustume>
  );
}

const FieldFileInput = ({ name }: { name: string }) => {
  const [, , { setValue }] = useField(name);
  return (
    <input
      type="file"
      id={name}
      name={name}
      style={{ display: "none" }}
      onChange={(e: any) => setValue(e.target.files[0])}
    />
  );
};

export default UpdateProfileModals;
