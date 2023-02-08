import {
  Flex,
  Spinner,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import s from "shortid";

interface TableProps<TableData> {
  columnHeaders: {
    name: string;
    label: string;
    type?: string;
    bgColor?: string;
    width?: string;
  }[];
  data: TableData[];
  onTitleClick: (id: string, name: string) => ReactNode;
  actionButtons?: (id: string, rowData: TableData) => ReactNode;
  loading: boolean;
}

const Table = <TableData,>({
  data,
  onTitleClick,
  actionButtons,
  columnHeaders,
  loading,
}: TableProps<TableData>) => {
  const cellData = (
    name: string | number | boolean,
    id: string,
    type: string | undefined
  ): ReactElement => {
    let data: string | number | ReactNode = "";
    switch (type) {
      case "onClick":
        data = onTitleClick?.(id, name as string);
        break;
      default:
        data = name;
        break;
    }
    if (type === "onClick") {
      return <>{data}</>;
    } else {
      return (
        <Td
          key={s.generate()}
          sx={{
            ":first-child": {
              cursor: "pointer",
            },
          }}
        >
          {data}
        </Td>
      );
    }
  };

  const tableBody = (): ReactElement[] => {
    return data.map((row) => {
      const currentRow = new Map(Object.entries(row));
      return (
        <Tr
          key={currentRow.get("id")}
          border="none"
          onClick={() => onTitleClick}
        >
          {columnHeaders.map(({ name, type }) => {
            return cellData(currentRow.get(name), currentRow.get("id"), type);
          })}
          {actionButtons !== null && actionButtons !== undefined && (
            <Td>{actionButtons(currentRow.get("id"), row)}</Td>
          )}
        </Tr>
      );
    });
  };

  return (
    <ChakraTable variant="mytable" overflow="scroll">
      <Thead>
        <Tr>
          {columnHeaders.map(({ label, bgColor, width }, index) => {
            return (
              <Th
                key={index}
                backgroundColor={bgColor}
                width={width}
                border="none"
              >
                {label}
              </Th>
            );
          })}
        </Tr>
      </Thead>
      <Tbody bgColor="white" p="1rem">
        {loading && (
          <Tr border="none">
            <Td colSpan={columnHeaders.length} border="none">
              <Flex align="center" justify="center" width="100%" minH="30vh">
                <Spinner />
              </Flex>
            </Td>
          </Tr>
        )}
        {!loading && data.length > 0 && tableBody()}
        {!loading && data.length === 0 && (
          <Tr border="none">
            <Td colSpan={columnHeaders.length} border="none">
              <Flex align="center" justify="center" width="100%" minH="10vh">
                No matching records found
              </Flex>
            </Td>
          </Tr>
        )}
      </Tbody>
    </ChakraTable>
  );
};
export default Table;
