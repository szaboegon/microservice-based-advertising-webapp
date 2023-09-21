import React from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {
    Pagination,
    PaginationContainer,
    PaginationNext,
    PaginationPage,
    PaginationPageGroup,
    PaginationPrevious,
    usePagination,
} from "@ajna/pagination";
import {PaginationParamsDto} from "../../models/queryParams/paginationParamsDto";

interface IPaginationFooterProps {
    totalPages: number,
    notifyPageChanged: (paginationParams: PaginationParamsDto) => void;
}

const PaginationFooter: React.FunctionComponent<IPaginationFooterProps> = ({totalPages, notifyPageChanged}) => {

    const PAGE_ITEM_COUNT = 12;
    const {
        currentPage,
        setCurrentPage,
        pagesCount,
        pages
    } = usePagination({
        pagesCount: totalPages,
        initialState: {currentPage: 1},
        limits: {
            outer: 2,
            inner: 1
        }
    });

    const onPageChange = (newCurrentPage: number) => {
        setCurrentPage(newCurrentPage);
        let newPaginationParams: PaginationParamsDto = {
            currentPage: newCurrentPage.toString(),
            pageItemCount: PAGE_ITEM_COUNT.toString()
        }
        notifyPageChanged(newPaginationParams);
    }

    return (
        <Pagination pagesCount={pagesCount} currentPage={currentPage} onPageChange={onPageChange}>
            <PaginationContainer>
                <PaginationPrevious w="10px" bg="gray.200" _hover={{
                    bg: "brandGreen.100"
                }} _disabled={{bg: "gray.50"}}>
                    <ChevronLeftIcon/>
                </PaginationPrevious>
                <PaginationPageGroup>
                    {pages.map((page: number) => (
                        <PaginationPage key={`pagination_page_${page}`} page={page} w="25px" bg="gray.200" _hover={{
                            bg: "brandGreen.100"
                        }} _current={{bg: "brandGreen.600", textColor: "white"}}/>
                    ))}
                </PaginationPageGroup>
                <PaginationNext  w="10px" bg="gray.200" _hover={{
                    bg: "brandGreen.100"
                }} _disabled={{bg: "gray.50"}}>
                    <ChevronRightIcon/>
                </PaginationNext>
            </PaginationContainer>
        </Pagination>
    );
}

export default PaginationFooter;