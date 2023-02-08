import { createIcon } from "@chakra-ui/icons";

// using `path`
const EngageIcon = createIcon({
  displayName: "EngageIcon",
  viewBox: "0 0 13 18",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      fill="currentColor"
      d="M3.31 7.063V3.857c0-1.183.928-2.143 2.071-2.143 1.144 0 2.072.96 2.072 2.143v3.206A3.881 3.881 0 0 0 9.11 3.857C9.11 1.723 7.444 0 5.38 0S1.652 1.723 1.652 3.857c0 1.337.655 2.512 1.657 3.206ZM7.867 9.18c-.232-.12-.48-.18-.738-.18h-.505V3.857c0-.711-.555-1.286-1.243-1.286-.688 0-1.243.575-1.243 1.286v9.206l-2.85-.617a.914.914 0 0 0-.854.265.992.992 0 0 0 0 1.355l3.323 3.437c.315.317.737.497 1.177.497h5.054c.829 0 1.525-.626 1.64-1.474l.523-3.832c.1-.728-.265-1.448-.903-1.774L7.867 9.18Z"
    />
  ),
});

export default EngageIcon;
