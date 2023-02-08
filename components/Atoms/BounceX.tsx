import { Box } from "@chakra-ui/react";

import type { BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface BounceProps extends BoxProps {
  children: ReactNode;
  showAnimation?: boolean;
}

export default function BounceX({
  children,
  showAnimation,
  ...props
}: BounceProps) {
  return (
    <Box
      width="fit-content"
      {...props}
      animation={showAnimation ? `bounce 1s 1 alternate linear` : "unset"}
      sx={{
        "@keyframes bounce": {
          "0%, 20%, 60%, 100%": {
            transform: "translateX(0)",
          },
          "40%": {
            transform: "translateX(-0.2rem)",
          },
          "80%": {
            transform: "translateX(0.1rem)",
          },
        },
      }}
    >
      {children}
    </Box>
  );
}
