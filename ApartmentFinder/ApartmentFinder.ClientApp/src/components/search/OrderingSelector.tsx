import * as React from "react";
import { Box, Flex, IconButton, Select } from "@chakra-ui/react";
import { OrderingParamsDto } from "../../models/queryParams/orderingParamsDto";
import { useEffect, useState } from "react";

interface IOrderingSelectorProps {
  width?: string;
  notifyOrderingChanged: (orderingParams: OrderingParamsDto) => void;
  prevParams: OrderingParamsDto;
}

const OrderingSelector: React.FunctionComponent<IOrderingSelectorProps> = ({
  width,
  notifyOrderingChanged,
  prevParams,
}) => {
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const handleClick = () => {
    setIsAscending((current) => !current);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSortColumn(newValue);
  };

  useEffect(() => {
    if (!sortColumn) {
      return;
    }
    const orderingParams: OrderingParamsDto = {
      sortColumn: sortColumn,
      sortOrder: isAscending ? "asc" : "desc",
    };
    notifyOrderingChanged(orderingParams);
  }, [isAscending, sortColumn]);

  useEffect(() => {
    setIsAscending(prevParams?.sortOrder == "asc");
    setSortColumn(prevParams?.sortColumn);
  }, []);

  return (
    <>
      <Flex>
        <Box
          className="material-icons"
          fontSize="2rem"
          textColor="gray.500"
          marginTop="5px"
        >
          swap_vert
        </Box>

        <Select
          width={width}
          onChange={handleChange}
          placeholder="..."
          value={sortColumn ?? undefined}
        >
          <option value="uploadDate">Upload Date</option>
          <option value="size">Size</option>
          <option value="monthlyPrice">Price</option>
        </Select>
        <IconButton
          aria-label="Order by"
          backgroundColor="brandGreen.500"
          _hover={{ background: "brandGreen.700" }}
          onClick={handleClick}
          isDisabled={!sortColumn}
        >
          {isAscending ? (
            <Box className="material-icons" fontWeight="800" textColor="white">
              north
            </Box>
          ) : (
            <Box className="material-icons" fontWeight="800" textColor="white">
              south
            </Box>
          )}
        </IconButton>
      </Flex>
    </>
  );
};

export default OrderingSelector;
