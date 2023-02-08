import { createIcon } from "@chakra-ui/icons";

// using `path`
const ChatIcon = createIcon({
  displayName: "ChatIcon",
  viewBox: "0 0 16 16",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      fill="currentColor"
      d="M14.4 0H1.6C.72 0 .008.72.008 1.6L0 16l3.2-3.2h11.2c.88 0 1.6-.72 1.6-1.6V1.6c0-.88-.72-1.6-1.6-1.6ZM4 5.6h8c.44 0 .8.36.8.8 0 .44-.36.8-.8.8H4c-.44 0-.8-.36-.8-.8 0-.44.36-.8.8-.8Zm4.8 4H4c-.44 0-.8-.36-.8-.8 0-.44.36-.8.8-.8h4.8c.44 0 .8.36.8.8 0 .44-.36.8-.8.8ZM12 4.8H4c-.44 0-.8-.36-.8-.8 0-.44.36-.8.8-.8h8c.44 0 .8.36.8.8 0 .44-.36.8-.8.8Z"
    />
  ),
});

export default ChatIcon;
