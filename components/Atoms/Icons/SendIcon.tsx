import { createIcon } from "@chakra-ui/icons";

// using `path`
const SendIcon = createIcon({
  displayName: "SendIcon",
  viewBox: "0 0 20 18",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      fill="currentColor"
      d="m1.671 17.4 17.45-7.48a1 1 0 0 0 0-1.84L1.672.6a.993.993 0 0 0-1.39.91l-.01 4.61c0 .5.37.93.87.99L15.271 9l-14.13 1.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91Z"
    />
  ),
});

export default SendIcon;
