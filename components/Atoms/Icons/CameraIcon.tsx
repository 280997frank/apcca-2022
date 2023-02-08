import { Icon, IconProps } from "@chakra-ui/icons";

// using `path`
const CameraIcon = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 33 32" fill="none" {...props}>
      <rect x="0.5" width="32" height="32" rx="8" fill="white" />
      <path
        d="M21.5 14.5V11C21.5 10.45 21.05 10 20.5 10H8.5C7.95 10 7.5 10.45 7.5 11V21C7.5 21.55 7.95 22 8.5 22H20.5C21.05 22 21.5 21.55 21.5 21V17.5L23.79 19.79C24.42 20.42 25.5 19.97 25.5 19.08V12.91C25.5 12.02 24.42 11.57 23.79 12.2L21.5 14.5Z"
        fill="#333333"
      />
    </Icon>
  );
};
export default CameraIcon;
