import {Flex, Spinner, VStack,} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {useNavigate, useSearchParams} from "react-router-dom";
import AdvertisementCard from "../advertisement/AdvertisementCard";
import {ErrorAlert} from "../alerts/ErrorAlert";
import {WarningAlert} from "../alerts/WarningAlert";
import SearchBar from "../shared/SearchBar";
import {AdvertisementCardDto} from "../../models/advertisement/advertisementCardDto";
import AdvertisementService from "../../services/advertisementService";
import {PagedQueryResponse} from "../../models/pagedQueryResponse";
import {AdvertisementSearchParamsDto} from "../../models/queryParams/advertisementSearchParamsDto";
import SearchParamsHelper from "../../helpers/searchParamsHelper";
import PaginationFooter from "../shared/PaginationFooter";
import {PaginationParamsDto} from "../../models/queryParams/paginationParamsDto";

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [advertisements, setAdvertisements] = useState<AdvertisementCardDto[]>(
        []
    );

    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();

    const {
        isSuccess,
        isLoading,
        isError,
        isRefetching,
        error,
        refetch: getAdvertisements,
    } = useQuery({
        queryKey: ["advertismentcards"],
        queryFn: async () => {
            console.log(searchParams);
            return await AdvertisementService.findBySearchParams(searchParams);
        },
        onSuccess: (data: PagedQueryResponse<AdvertisementCardDto>) => {
            setAdvertisements(data.items);
            setTotalPages(data.totalPages);
        },
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        getAdvertisements();
    }, [searchParams]);

    const onSearchParamsChanged = (newParams: AdvertisementSearchParamsDto) => {
        let changedParams = SearchParamsHelper.addSearchParams(searchParams, newParams);
        setSearchParams(changedParams);
        navigate("/search?" + searchParams, {});
    }

    const onPageChanged = (paginationParams: PaginationParamsDto) => {
        let changedParams = SearchParamsHelper.addPaginationParams(searchParams, paginationParams)
        setSearchParams(changedParams);
        navigate("/search?" + searchParams, {});
    }

    return (
        <>
            <Flex
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
                marginX="auto"
            >
                <VStack marginTop="3rem" width={{base: "100%", xl: "80%"}}>
                    <SearchBar minWidth="100%" existingSearchParams={searchParams}
                               onSearchParamsChanged={onSearchParamsChanged}></SearchBar>
                </VStack>
            </Flex>
            <Flex
                marginY="30px"
                marginX="auto"
                flexWrap="wrap"
                justifyContent="center"
            >
                {(isLoading || isRefetching) && advertisements.length <= 0 && (
                    <Spinner/>
                )}
                {isError && !isLoading && !isRefetching && error instanceof Error && (
                    <ErrorAlert error={error}/>
                )}
                {advertisements.map((advertisement) => (
                    <AdvertisementCard
                        key={advertisement.id}
                        advertisement={advertisement}
                    ></AdvertisementCard>
                ))}
                {isSuccess && advertisements.length <= 0 && !isRefetching && (
                    <WarningAlert message="There are no matching advertisements for your search filters."/>
                )}
            </Flex>
            <Flex justifyContent="center" marginBottom={10}>
                <PaginationFooter totalPages={totalPages} notifyPageChanged={onPageChanged}/>
            </Flex>
        </>
    );
};
