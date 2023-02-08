import { FC, CSSProperties, useRef, useEffect } from "react";
import { useField } from "formik";
import { useQuill } from "react-quilljs";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useErrorFocus } from "@/hooks";
import "react-quill-emoji/dist/quill-emoji.css";
import "react-quill/dist/quill.snow.css";

interface RichTextInputProps {
  name: string;
  id: string;
  label?: string;
  placeholder?: string;
  description?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  style?: CSSProperties;
}
const formats = ["bold", "italic", "underline", "emoji", "link"];
const modules = {
  toolbar: {
    container: [["bold", "italic", "underline"], ["emoji"]],
  },
  magicUrl: true,
  "emoji-toolbar": true,
};

const RichTextInput: FC<RichTextInputProps> = ({
  name,
  id,
  label = "",
  description = "",
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
}) => {
  const { quill, quillRef, Quill } = useQuill({
    modules,
    formats,
  });
  if (Quill && !quill) {
    const MagicUrl = require("quill-magic-url").default;
    const QuillEmoji = require("react-quill-emoji");

    Quill.register("modules/magicUrl", MagicUrl);
    Quill.register("modules/emoji", QuillEmoji);
  }
  const [{}, meta, { setValue }] = useField(name);

  const RichTextRef = useRef(null);
  useErrorFocus(RichTextRef, name);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setValue(quillRef.current.firstChild.innerHTML);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill]);

  return (
    <FormControl
      id={id}
      isInvalid={Boolean(meta.error && meta.touched)}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
    >
      {label && (
        <FormLabel fontWeight="bold" color="white" textTransform="uppercase">
          {label}
        </FormLabel>
      )}
      <div ref={quillRef} />
      {description && <FormHelperText>{description}</FormHelperText>}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default RichTextInput;
