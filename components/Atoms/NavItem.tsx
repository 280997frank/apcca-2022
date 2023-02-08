import {
  Box,
  Button,
  Flex,
  Img,
  Menu,
  MenuButton,
  MenuButtonProps,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useRef } from "react";
import TotalNotifMsg from "@/components/Atoms/TotalNotifMsg";
interface TpropsData {
  label: string;
  id: string;
  url: string;
  img: string;
  badge?: string | number;
}

const NavItem: FC<TpropsData & MenuButtonProps> = ({
  label,
  id,
  url,
  img,
  badge,
  ...props
}) => {
  const MenuBtnRef = useRef<any>(null);

  const router = useRouter();
  console.log("hib", id);

  return (
    <Menu gutter={0}>
      {({ isOpen }) => (
        <>
          <MenuButton
            ref={MenuBtnRef}
            // bgColor="#FFF"
            id="btnMenu"
            as={Button}
            _hover={{
              textDecoration: "none",
            }}
            _focus={{
              color: isOpen ? "#537542 !important" : "transparent",
            }}
            borderRadius={
              router.pathname.toLowerCase() === url.toLowerCase()
                ? "10px"
                : "none"
            }
            bgColor={
              router.pathname.toLowerCase() === url.toLowerCase()
                ? "#FFDD00"
                : "transparent"
            }
            // _active={{
            //   borderRadius: "10px",
            //   outline: "0",
            //   bgColor: "#FFDD00",
            //   color: "black",
            // }}
            textDecoration="none"
            userSelect="none"
            fontWeight="bold"
            fontSize={{
              base: "smaller",
              lg: "12px",
              "2xl": "md",
            }}
            width={{
              base: "100%",
              md: "full",
            }}
            p="0px"
            textAlign={{
              base: "left",
              md: "left",
            }}
            onClick={() => router.push(url)}
            whiteSpace="normal"
            {...props}
          >
            <Flex
              flexDir="row"
              pl={5}
              w="100%"
              /* mt={id === "logout" ? 20 : 0}*/
            >
              <Box
                minW={{ base: "10%", lg: "20%" }}
                maxW={{ base: "10%", lg: "20%" }}
                display="flex"
                justifyContent="flex-start"
              >
                <Img src={img} alt="" alignSelf="center" />
              </Box>
              <Text
                w="100%"
                as="span"
                dangerouslySetInnerHTML={{
                  __html: label,
                }}
                textAlign={{
                  base: "left",
                  md: "left",
                }}
                fontSize="1rem"
                color="#9B9B9B"
              />
              {id === "networking" && <TotalNotifMsg />}
              {id === "breakout-rooms" && badge && (
                <Flex
                  borderRadius="50%"
                  width={{ base: "30px", lg: "35px" }}
                  height="25px"
                  backgroundColor="#DA2229"
                  justifyContent="center"
                  alignItems="center"
                  mr={{ base: 3, lg: 1 }}
                >
                  <Text textAlign="center" color="white" fontSize="12px">
                    {badge}
                  </Text>
                </Flex>
              )}
            </Flex>
          </MenuButton>
        </>
      )}
    </Menu>
  );
};

export default NavItem;
