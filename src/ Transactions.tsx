import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
type Props = {
  bankData: [];
};
const Transactions: React.FC<Props> = ({ bankData }) => {
  console.log(bankData);
  const [searchValue, setSearchValue] = useState("");
  const [found, setFound] = useState<any | null>();

  const tableData = bankData;

  const SearchUser = () => {
    setFound(tableData.find((i: any) => searchValue == i.REFNO));
  };

  console.log(found);
  return (
    <div>
      <Heading size={"md"}>Search Transaction</Heading>
      <Flex>
        <Input
          placeholder="Enter Id"
          onChange={(event) => setSearchValue(event.target.value)}
          onKeyUp={SearchUser}
        />
      </Flex>

      <Table variant="striped" colorScheme="teal" mt={10}>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Bank</Th>
            <Th>Payment Mode</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        {found ? (
          <Tbody>
            <Tr>
              <Td>{found.REFNO}</Td>
              <Td>{found.USERNAME}</Td>
              <Td>{found.BANKNAMES} </Td>
              <Td>{found.PAYMENTMODE}</Td>
              <Td>{found.AMOUNTS}</Td>
            </Tr>
          </Tbody>
        ) : (
          <Tbody>
            {tableData?.map((item: any, i: any) => (
              <Tr key={i}>
                <Td>{item.REFNO}</Td>
                <Td>{item.USERNAME}</Td>
                <Td>{item.BANKNAMES} </Td>
                <Td>{item.PAYMENTMODE}</Td>
                <Td>{item.AMOUNTS}</Td>
              </Tr>
            ))}
          </Tbody>
        )}
      </Table>
    </div>
  );
};

export default Transactions;
