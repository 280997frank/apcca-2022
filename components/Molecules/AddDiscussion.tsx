import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useAddPost } from "@/hooks/discussion-forum";
import ArrowRightIcon from "@/components/Atoms/Icons/ArrowRight";
import TextInput from "@/components/Atoms/TextInput";
import RichTextInput from "@/components/Atoms/RichTextInput";
import React, { FC, useState } from "react";
import { object } from "yup";
import { requiredString } from "@/constants/validationSchema";

interface IAddDiscussion {
  isOpen: boolean;
  onClose: () => void;
  reRenderDataList: () => void;
}
interface IInitialValueOfForm {
  title: string;
  text: string;
}
const validateAboutForm = object({
  title: requiredString,
  text: requiredString,
});

const AddDiscussion: FC<IAddDiscussion> = ({
  isOpen,
  onClose,
  reRenderDataList,
}) => {
  const { mutationAddPost } = useAddPost();
  const [initialValueOfForm] = useState<IInitialValueOfForm>({
    title: "",
    text: "",
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="1rem" maxW="calc(150vh - 50px)">
        <Formik
          enableReinitialize
          initialValues={initialValueOfForm}
          validationSchema={validateAboutForm}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            setSubmitting(false);
            await mutationAddPost({
              variables: { createThreadInput: values },
            });
            onClose();
            reRenderDataList();
          }}
        >
          {({ isSubmitting }) => (
            <>
              <Form style={{ width: "100%" }}>
                <ModalHeader
                  textTransform="uppercase"
                  fontWeight={500}
                  mt="1rem"
                >
                  Add new discussion
                </ModalHeader>
                <ModalCloseButton
                  bgColor="#D9D9D9"
                  w="47px"
                  h="47px"
                  borderRadius="full"
                />
                <ModalBody>
                  <VStack spacing="5">
                    <TextInput
                      name="title"
                      id="title"
                      placeholder="Type here"
                      label="Title"
                    />
                    <RichTextInput name="text" id="text" />
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <Button
                    bgColor="#FFDD00"
                    borderRadius="1rem"
                    height="72px"
                    pt="6px"
                    w="225px"
                    size="lg"
                    type="submit"
                    _hover={{}}
                    _focus={{}}
                    rightIcon={<ArrowRightIcon />}
                    isLoading={isSubmitting}
                  >
                    SEND
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default AddDiscussion;
