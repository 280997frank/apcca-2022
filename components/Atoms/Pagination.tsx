import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react";
import { ChangeEventHandler, FC, MouseEventHandler } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface PaginationProps {
  onPrevClick: MouseEventHandler<HTMLButtonElement>;
  onNextClick: MouseEventHandler<HTMLButtonElement>;
  total: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  currentPage?: number;
}

const Pagination: FC<PaginationProps> = ({
  onPrevClick,
  onNextClick,
  total,
  onChange,
  currentPage,
}) => {
  return (
    <Flex width="100%" justifyContent="flex-end">
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={0.5}
        justifyItems="center"
        alignItems="center"
      >
        <Button
          bg="transparent"
          color="#333333"
          _focus={{ border: "none" }}
          size="xs"
          onClick={onPrevClick}
        >
          <BsChevronLeft />
        </Button>
        <Box style={{ width: "3rem" }}>
          <Input
            size="xs"
            value={currentPage === undefined ? 1 : currentPage}
            name="page"
            _focus={{ border: "1px solid #D7D7D7" }}
            bgColor="white"
            border="1px solid #D7D7D7"
            borderRadius="8px"
            textAlign="center"
            color="#333333"
            p="1rem"
            onChange={onChange}
          />
        </Box>
        <Text color="#333333">of {total}</Text>
        <Button
          color="#333333"
          bg="transparent"
          _focus={{ border: "none" }}
          size="xs"
          onClick={onNextClick}
        >
          <BsChevronRight />
        </Button>
      </Grid>
    </Flex>
  );
};

export default Pagination;
