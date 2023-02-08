import { Flex, Image } from "@chakra-ui/react";
import spslogo from "@/assets/images/SPS Logo.png";
import apccalogo from "@/assets/images/apcca-logo.png";

const APCCAAndSPSIcons = () => {
  return (
    <Flex gap="55px">
      <Image
        src={apccalogo.src}
        height={{
          base: "40px",
          xl: "40px",
          "3xl": "43px",
        }}
        alt="Apcca Logo"
      />
      <Image
        mt="-7px"
        src={spslogo.src}
        height={{
          base: "40px",
          xl: "40px",
          "3xl": "43px",
        }}
        alt="Apcca Logo"
      />
    </Flex>
  );
};

export default APCCAAndSPSIcons;
