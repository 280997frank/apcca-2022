import { TooltipRenderProps } from "react-joyride";
import { Box, Button, Img } from "@chakra-ui/react";
import arrowRight from "@/assets/images/arrow-right.png";
import React from "react";
import { actions as tutorialAction } from "@/states/tutorial/slice";
import { useDispatch } from "react-redux";

export function TooltipTutorial({
  isLastStep,
  primaryProps,
  step,
  tooltipProps,
}: TooltipRenderProps) {
  const dispatch = useDispatch();
  return (
    <Box
      {...tooltipProps}
      // border={false}
      maxWidth={420}
      minWidth={290}
      bgColor="#FFFAE0"
      overflow="hidden"
      p="16px"
      borderRadius="16px"
    >
      <Box padding="md">
        {step.title && (
          <Box fontSize="24px" fontWeight={700}>
            {step.title}
          </Box>
        )}
        {step.content && (
          <Box fontSize="24px" fontWeight={400}>
            {step.content}
          </Box>
        )}
      </Box>
      <Box display="flex" justifyContent="flex-end">
        {!isLastStep && (
          <Button
            {...primaryProps}
            bgColor="#FFDD00"
            px="30px"
            py="10px"
            _hover={{ bg: "#FFFAE0" }}
            borderRadius="8px"
          >
            <Box
              fontSize="16px"
              fontWeight="400"
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              NEXT
              <Img w="auto" h="28px" ml="5px" src={arrowRight.src} alt="" />
            </Box>
          </Button>
        )}
        {isLastStep && (
          <Button
            bgColor="#FFDD00"
            px="30px"
            py="10px"
            _hover={{ bg: "#FFFAE0" }}
            borderRadius="8px"
            onClick={() => {
              dispatch(
                tutorialAction.setOpenTutorial({
                  isOpen: false,
                })
              );
            }}
          >
            <Box
              fontSize="16px"
              fontWeight="400"
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              NEXT
              <Img w="auto" h="28px" ml="5px" src={arrowRight.src} alt="" />
            </Box>
          </Button>
        )}
      </Box>
      {/*<Box padding="xs"  variant="primary">*/}
      {/*<Spacer distribution="space-between">*/}
      {/*    {!isLastStep && (*/}
      {/*        <Button {...skipProps} size="sm">*/}
      {/*            <FormattedMessage id="skip" />*/}
      {/*        </Button>*/}
      {/*    )}*/}
      {/*    <Spacer>*/}
      {/*        {index > 0 && (*/}
      {/*            <Button {...backProps} size="sm">*/}
      {/*                <FormattedMessage id="back" />*/}
      {/*            </Button>*/}
      {/*        )}*/}
      {/*        <Button {...primaryProps} size="sm">*/}
      {/*            <FormattedMessage id={continuous ? 'next' : 'close'} />*/}
      {/*        </Button>*/}
      {/*    </Spacer>*/}
      {/*</Spacer>*/}
      {/*</Box>*/}
    </Box>
  );
}
