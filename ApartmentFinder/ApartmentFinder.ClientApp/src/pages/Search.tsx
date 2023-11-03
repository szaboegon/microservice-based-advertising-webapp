import { Card, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdvertisementCard from "../components/advertisement/AdvertisementCard";
import { ErrorAlert } from "../components/alerts/ErrorAlert";
import { WarningAlert } from "../components/alerts/WarningAlert";
import SearchBar from "../components/shared/SearchBar";
import { AdvertisementCardDto } from "../models/advertisement/advertisementCardDto";
import AdvertisementService from "../services/advertisementService";
import { PagedQueryResponse } from "../models/pagedQueryResponse";
import { AdvertisementSearchParamsDto } from "../models/queryParams/advertisementSearchParamsDto";
import SearchParamsHelper from "../helpers/searchParamsHelper";
import PaginationFooter from "../components/search/PaginationFooter";
import { PaginationParamsDto } from "../models/queryParams/paginationParamsDto";
import OrderingSelector from "../components/search/OrderingSelector";
import { OrderingParamsDto } from "../models/queryParams/orderingParamsDto";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [advertisements, setAdvertisements] = useState<AdvertisementCardDto[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(
    SearchParamsHelper.getCurrentPageFromParams(searchParams),
  );
  const [totalPages, setTotalPages] = useState(0);

  const { isSuccess, isLoading, isError, isRefetching, error, refetch } =
    useQuery({
      queryKey: ["advertismentcards", searchParams],
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
    refetch();
  }, [searchParams]);

  const onSearchParamsChanged = (newParams: AdvertisementSearchParamsDto) => {
    let changedParams = SearchParamsHelper.addSearchParams(
      searchParams,
      newParams,
    );
    setSearchParams(changedParams);
  };

  const onPageChanged = (paginationParams: PaginationParamsDto) => {
    let changedParams = SearchParamsHelper.addPaginationParams(
      searchParams,
      paginationParams,
    );
    setSearchParams(changedParams);
    setCurrentPage(parseInt(paginationParams.currentPage));
  };

  const onOrderingChanged = (orderingParams: OrderingParamsDto) => {
    let changedParams = SearchParamsHelper.addOrderingParams(
      searchParams,
      orderingParams,
    );
    setSearchParams(changedParams);
  };

  return (
    <>
      <Flex
        marginTop="20px"
        alignItems="center"
        flexWrap="wrap"
        gap="20px"
        marginX={{ base: "0px", "2xl": "12%" }}
      >
        <Card variant="elevated" width="100%" padding="20px">
          <SearchBar
            minWidth="100%"
            existingSearchParams={searchParams}
            onSearchParamsChanged={onSearchParamsChanged}
          ></SearchBar>
          <Flex
            flexBasis="100%"
            marginTop="15px"
            alignItems="center"
            position="relative"
            flexDir="column"
          >
            <Flex
              alignSelf="center"
              position={{ base: "inherit", md: "absolute" }}
              right="20px"
              marginBottom="10px"
            >
              <OrderingSelector
                prevParams={SearchParamsHelper.getOrderingFromParams(
                  searchParams,
                )}
                width="200px"
                notifyOrderingChanged={onOrderingChanged}
              />
            </Flex>
            <PaginationFooter
              prevCurrentPage={currentPage}
              totalPages={totalPages}
              notifyPageChanged={onPageChanged}
            />
          </Flex>
        </Card>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
          spacing="8"
          width="100%"
        >
          {advertisements.map((advertisement) => (
            <AdvertisementCard
              key={advertisement.id}
              advertisement={advertisement}
            ></AdvertisementCard>
          ))}
        </SimpleGrid>
        <Flex flexDirection="column" alignItems="center" width="100%">
          {(isLoading || isRefetching) && advertisements.length <= 0 && (
            <Spinner />
          )}
          {isError && !isLoading && !isRefetching && error instanceof Error && (
            <ErrorAlert error={error} />
          )}
          {isSuccess && advertisements.length <= 0 && !isRefetching && (
            <WarningAlert message="There are no matching advertisements for your search filters." />
          )}
        </Flex>
        {isSuccess && advertisements.length > 0 && !isRefetching && (
          <Card
            variant="elevated"
            width="100%"
            padding="20px"
            marginBottom="20px"
            justifyContent="alignItems"
          >
            <Flex width="100%" justifyContent="center">
              <PaginationFooter
                prevCurrentPage={currentPage}
                totalPages={totalPages}
                notifyPageChanged={onPageChanged}
              />
            </Flex>
          </Card>
        )}
      </Flex>
    </>
  );
};
