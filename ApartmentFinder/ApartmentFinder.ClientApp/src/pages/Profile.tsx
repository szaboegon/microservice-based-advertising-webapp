import {
    Box, Button,
    Divider,
    Flex,
    Heading,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text, useDisclosure
} from "@chakra-ui/react";
import ProfileCard from "../components/profile/ProfileCard";
import {User} from "../models/user";
import React, {useState} from "react";
import {useMutation, useQuery} from "react-query";
import AdvertisementService from "../services/advertisementService";
import AdvertisementListItem from "../components/advertisement/AdvertisementListItem";
import {ErrorAlert} from "../components/shared/alerts/ErrorAlert";
import {AdvertisementCardDto} from "../models/advertisement/advertisementCardDto";
import {pageSubheadingStyles} from "../styles/pageSubheadingStyles";
import {
    PROFILE_CARD_WIDTH,
} from "../assets/literals/constants";

interface IProfileProps {
    user: User;
}

const Profile: React.FunctionComponent<IProfileProps> = ({user}) => {
    const [advertisements, setAdvertisements] = useState<AdvertisementCardDto[]>(
        [],
    );
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [advertisementToDeleteId, setAdvertisementToDeleteId] = useState<number>();

    const {
        isSuccess,
        isLoading,
        isError,
        isRefetching,
        error,
        refetch,
    } = useQuery({
        queryKey: ["userAds"],
        queryFn: async () => {
            return await AdvertisementService.findByUser();
        },
        onSuccess: (advertisements: AdvertisementCardDto[]) =>
            setAdvertisements(advertisements),
        refetchOnWindowFocus: false,
    });

    const {
        isLoading: isDeleteLoading,
        isError: isDeleteError,
        error: deleteError,
        mutateAsync: deleteAdvertisement,
    } = useMutation({
        mutationFn: async () => {
            if (advertisementToDeleteId) {
                return await AdvertisementService.remove(advertisementToDeleteId);
            }
        },
    });

    const onDeleteRequested = (id: number) => {
        setAdvertisementToDeleteId(id);
        onOpen();
    }

    const handleClick = async () => {
        await deleteAdvertisement();
        await refetch();
        onClose();
    }

    return (
        <>
            <Flex justifyContent="center">
                <Flex
                    flexDirection="column"
                    position="relative"
                    alignItems="center"
                    width="50%"
                    gap="15px"
                    paddingBottom="15px"
                >
                    <Box
                        position="absolute"
                        left={`calc(-${PROFILE_CARD_WIDTH} - 20px)`}
                        top="150px"
                    >
                        <ProfileCard user={user}></ProfileCard>
                    </Box>
                    <Heading
                        sx={pageSubheadingStyles}
                        alignSelf="start"
                        marginTop="1.5rem"
                    >
                        My Advertisements
                    </Heading>
                    <Divider
                        alignSelf="start"
                        orientation="horizontal"
                        borderColor="gray.600"
                        borderWidth="1px"
                        borderRadius="10"
                        width="290px"
                    />
                    {(isLoading || isRefetching) && <Spinner alignSelf="center"/>}
                    {isError && !isLoading && !isRefetching && error instanceof Error && (
                        <ErrorAlert error={error}/>
                    )}
                    {advertisements.map((advertisement) => (
                        <AdvertisementListItem
                            key={advertisement.id}
                            advertisement={advertisement}
                            requestDelete={onDeleteRequested}
                        ></AdvertisementListItem>
                    ))}
                    {isSuccess && advertisements.length <= 0 && !isRefetching && (
                        <Text fontSize="1.2rem" marginTop="20px">You haven't posted any advertisements yet.</Text>
                    )}
                </Flex>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>Are you sure you want to delete the advertisement? This operation is final.</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={handleClick}>
                            Confirm
                        </Button>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Profile;
