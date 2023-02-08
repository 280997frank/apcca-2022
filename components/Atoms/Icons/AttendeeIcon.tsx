import { createIcon } from "@chakra-ui/icons";

// using `path`
const AttendeIcon = createIcon({
  displayName: "AttendeIcon",
  viewBox: "0 0 21 12",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      fill="currentColor"
      d="M14.47 5.143c1.51 0 2.719-1.149 2.719-2.572C17.189 1.15 15.979 0 14.47 0s-2.727 1.149-2.727 2.571c0 1.423 1.218 2.572 2.727 2.572Zm-7.272 0c1.509 0 2.718-1.149 2.718-2.572C9.916 1.15 8.706 0 7.198 0 5.688 0 4.47 1.149 4.47 2.571c0 1.423 1.219 2.572 2.728 2.572Zm0 1.714c-2.119 0-6.364 1.003-6.364 3v1.286c0 .471.41.857.91.857h10.908c.5 0 .91-.386.91-.857V9.857c0-1.997-4.246-3-6.364-3Zm7.272 0c-.263 0-.563.017-.882.043.019.009.028.026.037.034 1.036.712 1.754 1.663 1.754 2.923v1.286c0 .3-.063.591-.163.857h4.709c.5 0 .909-.386.909-.857V9.857c0-1.997-4.245-3-6.364-3Z"
    />
  ),
});

export default AttendeIcon;
