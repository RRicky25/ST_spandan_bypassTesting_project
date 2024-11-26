import { Box, Flex, Icon, Heading, Image, Text, Divider, Stack, Button, Center, HStack, Link as ChakraLink, useMediaQuery } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useState, useEffect } from "react";
import sd from "../../components/sportsData"
import Container from "../../components/Container";
import CreateTeam from "../../components/Event/CreateTeam"
import ListTeam from "../../components/Event/ListTeam"
import IIITBStudentData from "../../components/IIITBSTudents"
import axios from '../../AxiosConfig';


const Event = () => {
    // Change these two variables
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login'));
    const [hasTeam, setHasTeam] = useState(false);
    const [team, setTeam] = useState();
    const { sport_id } = useParams();
    let sportsData = sd();
    const sport = sportsData.find((sport) => sport.id === parseInt(sport_id));

    const [rules, setRules] = useState('');

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const response = await fetch(`${sport.rules}`);
                const text = await response.text();
                setRules(text);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRules();
    }, [sport]);

    useEffect(() => {
        setHasTeam(false)
        setTeam()
        if (isLoggedIn) {
            axios.get('/team/', { params: { "email": localStorage.getItem("email"), "sport_name": sport.tag } })
                .then((res) => {
                    if (res.data.length === 0) {
                        setHasTeam(false)
                        setTeam()
                    }
                    else {
                        setHasTeam(true)
                        setTeam(res.data)
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        console.log("User not authorized to access this endpoint");
                    } else {
                        console.log("Error occurred:", error);
                    }
                });
        }
    }, []);

    const [isDesktop] = useMediaQuery("(min-width: 1024px)");

    return (
        <Container page_name={sport.name} >
            <Stack>
                <Box display="flex" alignItems="center">
                    <Image src={sport.icon} alt={sport.tag} boxSize="8" marginRight="2" />
                    <Heading as="h1" size="2xl" p={4}>{sport.name}</Heading>
                </Box>
                <Divider />
                <Box pb={4} />
                <Stack direction={!isDesktop ? "column-reverse" : "row"} ml={!isDesktop ? "0" : "8"} spacing={8}>
                    <Stack >
                        <Box width={!isDesktop ? "100%" : "38vw"}>
                            <HStack>
                                <Heading as="h2" size="lg" p={1}>Rules</Heading>
                                <ChakraLink href={`${sport.rulesURL}`} isExternal>
                                    <ExternalLinkIcon color='black' _hover={{ color: "pink" }} />
                                </ChakraLink>
                            </HStack>
                            <Box maxHeight={!isDesktop ? "80vh" : "50vh"} overflowY="auto" border={"1px"}>
                                <Text whiteSpace="pre-wrap" fontSize={!isDesktop ? "sm" : "normal"} p={2} bgColor={'black'}>
                                    {rules}
                                </Text>
                            </Box>
                            <Box mt="8">
                                <Heading as="h2" size="lg">SPOC Details</Heading>
                                {sport.spoc.map((spoc_obj) => (
                                    <Text fontSize={"lg"} key={spoc_obj.spoc_name}>
                                        {spoc_obj.spoc_name} - {spoc_obj.spoc_contact}
                                    </Text>
                                ))}
                            </Box>
                        </Box>
                    </Stack>
                    <Stack>
                        <Box width={!isDesktop ? "100%" : "55vw"} pl={!isDesktop ? "0" : "8"}>
                            {!isLoggedIn && (
                                <Center>
                                    <Stack spacing={8} mx={'auto'} px={6}>
                                        <Stack spacing={4}>
                                            <Heading fontSize={'3xl'}>
                                                Login to create team
                                            </Heading>
                                            <Text align={'center'} fontSize={{ base: 'sm', sm: 'md' }} color={'white'}>
                                                Looks like you haven't logged in yet
                                            </Text>
                                            <Stack spacing={6}>
                                                <Link to="/login">
                                                    <Button variant={"custom"} bg={'red'} color={'black'} _hover={{ bg: 'red.400' }} alignItems="center" type="submit" whileTap={{ scale: 0.9 }} rounded='0' w="100%">
                                                        Login
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Center>
                            )}
                            {isLoggedIn && !hasTeam && <CreateTeam sport_id={sport_id} />}
                            {isLoggedIn && hasTeam && <ListTeam sport_id={sport_id} team={team} />}
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Container >
    );
};

export default Event;
