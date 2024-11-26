import React, { useState, useRef } from 'react';
import {
    Box,
    Heading,
    Grid,
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from '@chakra-ui/react';
import axios from '../../AxiosConfig';
import { useNavigate } from 'react-router-dom';

const ListTeam = ({ sport_id, team }) => {
    let players = team[0]["members"]

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();
    const navigate = useNavigate();
    // Post delete redirect back to the page events/{sports_id}
    const handleDelete = () => {
        const data = { id: team[0]["id"] };
        setIsLoading(true);
        axios.delete('/team/', { data })
            .then((res) => {
                setIsLoading(false);
                window.location.reload(false)
                // navigate('/')
            }).catch((error) => {
                // window.location.reload();
                navigate('/profile');
                console.log('Hi');
            })
    };
    return (
        <Box>
            <Heading as="h2" mb="4">
                Team: {team[0].name}
            </Heading>
            <Grid
                templateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
                gap={6}
                mt={4}
            >
                {players.map((player, index) => (
                    <Box key={index} p={4} borderWidth="1px" borderRadius="none" borderColor="white"bgColor={'blackAlpha.300'}>
                        <Heading size="md">{player.first_name}</Heading>
                        <Box as="span" color="white" >
                            {player.rollNum}
                        </Box>
                    </Box>
                ))}
            </Grid>
            <Button
                onClick={() => setIsOpen(true)}
                variant="custom"
                // color="white"
                mt={8}
                // rounded="none"
                _hover={{
                    bgColor: "red"
                }}
                border="1px"
                borderColor={"black"}
                fontWeight="normal"
            >
                Delete Team
            </Button>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay >
                    <AlertDialogContent rounded="none" border="2px" borderColor={"black"} color={'black'}>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Team
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} color="black" bgColor={"gray.200"} rounded="none" fontWeight=" normal">
                                Cancel
                            </Button>
                            <Button colorScheme={"red"} ml={3} fontWeight="normal" rounded="none" onClick={handleDelete} isLoading={isLoading}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box >
    );
};

export default ListTeam;
