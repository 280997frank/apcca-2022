import { Box, Button } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";

interface RegistrationFormProps {
  onToggle: () => void;
  height: number;
  width: number;
}

const RegistrationForm = ({
  onToggle,
  height,
  width,
}: RegistrationFormProps) => {
  return (
    <>
      <Box as="header" px={4} py={2} pos="fixed" w="full">
        <Button
          variant="unstyled"
          fontWeight="bold"
          display="inline-flex"
          alignItems="center"
          leftIcon={<BsArrowLeft />}
          onClick={onToggle}
          sx={{
            "& svg": {
              fontSize: "2rem",
            },
          }}
        >
          BACK
        </Button>
      </Box>
      <Box pt={14}>
        <iframe
          src="https://form.jotform.com/221012110912433"
          loading="lazy"
          name="registration-form"
          height={height - 56 - 1}
          width={width - 1}
        />
      </Box>
    </>
  );
};
export default RegistrationForm;
