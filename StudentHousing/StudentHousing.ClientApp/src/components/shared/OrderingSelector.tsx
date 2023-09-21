import * as React from "react";
import { AdvertisementSearchParamsDto } from "../../models/queryParams/advertisementSearchParamsDto";
import {Box, Flex, IconButton, Select} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {NewAdvertisementRequest} from "../../models/forms/newAdvertisementRequest";
import {OrderingParamsDto} from "../../models/queryParams/orderingParamsDto";
import {useState} from "react";

interface IOrderingSelectorProps {
    width?: string
}

const OrderingSelector: React.FunctionComponent<IOrderingSelectorProps> = ({width}) => {
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const {
        handleSubmit,
        register
    } = useForm<OrderingParamsDto>();

    const handleClick = () => {
        setIsAscending(!isAscending);
    }

    return<>
        <Flex>
            <Box className="material-icons" fontSize="2rem" textColor="gray.500" marginTop="5px">swap_vert</Box>
            <Select width={width}
                    {...register("sortColumn", {
                required: "This field is required",
            })}
                    id="region"
                    borderColor="brandYellow.800"
                    placeholder="Choose"
                    size="lg">
                <option value="uploadDate">Upload Date</option>
                <option value="size">Size</option>
                <option value="monthlyPrice">Price</option>
            </Select>
            <IconButton aria-label="Order by" backgroundColor="brandGreen.500" _hover={{ background: "brandGreen.700" }} onClick={handleClick}>
                {isAscending?
                    <Box className="material-icons" fontWeight="800" textColor="white">north</Box>:
                    <Box className="material-icons" fontWeight="800" textColor="white">south</Box>
                }
            </IconButton>
        </Flex>
    </>
}


export default OrderingSelector;
