import { Grid, GridItem, Stack, Flex, Heading, Text, VStack, Image, Box, Button ,useMediaQuery} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Blockies from "react-18-blockies";
import axios from '../../AxiosConfig';
import { motion } from "framer-motion";
import sd from "../../components/sportsData";
import icons from "../../components/icons";
import Container from '../../components/Container'
import { Link, useNavigate } from "react-router-dom";

const EventSchedule = ({ schedule }) => {
    return (
        <Stack py={2}>
            <Text fontSize="xl" fontWeight="bold" pb={4}>
                Player Schedule
            </Text>
            <VStack alignItems="flex-start" spacing={2} px={4}>
                {schedule.length ? (
                    schedule.map((event, index) => (
                        <Flex
                            key={index}
                            alignItems="center"
                            justifyContent="space-between"
                            width="100%"
                            borderBottomWidth="1px"
                            py={2}
                        >
                            <Flex alignItems="center">
                                <img src={icons[event.sportName]} alt="icon" width="24" height="24" />
                                <Text ml={2}>{event.sportName}</Text>
                            </Flex>
                            <Text>{event.timing}</Text>
                        </Flex>
                    ))
                ) : (
                    <Text>No fixtures available</Text>
                )}
            </VStack>
        </Stack>
    );
};

const EventsUserIsParticipatingIn = ({ events }) => {
    const sportsData = sd();
    const [isDesktop] = useMediaQuery('(min-width: 1024px)');
    return (
        <Stack py={8}>
            <Text fontSize="xl" fontWeight="bold" pb={2} mt={8}>
                Participating Events
            </Text>

            <Box
                minW={isDesktop?'25vw':'90vw'}
                h={isDesktop?'30vh':'auto'}
                overflowY="auto"
            >
                {events.length > 0 ? (
                    <Grid
                        templateColumns={isDesktop?'repeat(2,1fr)':'repeat(3,1fr)'}
                        gap={8}
                        pr={4}
                    >
                        {events.map((event) => (
                            <Link to={`/events/${sportsData.find((data) => data.tag === event.sport.name).id}`}>
                                < Flex
                                    key={event.id}
                                    alignItems="center"
                                    py={2}
                                    gridColumn="span 1"
                                >
                                    <Box w="30px" h="30px" bg="white" mr={4}>
                                        <img
                                            src={sportsData.find((data) => data.tag === event.sport.name).icon}
                                            alt="Sport Icon"
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                    </Box>
                                    <Box>
                                        <Text fontSize="md" fontWeight="semibold">
                                            {event.sport.name}
                                        </Text>
                                        <Text fontSize="sm">
                                            {event.name ? `Team: ${event.name}` : "Individual Event"}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Link>
                        ))}
                    </Grid>
                ) : (
                    <Text fontSize="sm">No events available</Text>
                )}
            </Box>
        </Stack >
    );
};

const UserDetails = ({ user }) => {
    const { user_name, email, profilePicUrl } = user;
    const navigate = useNavigate()
    const handleLogout = () => {
        axios.post('/users/logout/blacklist/', { "refresh_token": localStorage.getItem("login_refresh") })
            .then((res) => {
            }).catch((error) => {
            })

        localStorage.removeItem('login_refresh');
        localStorage.removeItem('login');
        localStorage.removeItem('team');
        localStorage.removeItem('email');
        localStorage.removeItem('jwt');
        navigate("/")
    };

    return (
        <Stack>
            <Box w={"auto"} p={4} border="2px" align="center" boxShadow={"4px 4px 0px rgba(0, 0, 0, 1)"}>
                <Box w="100%" h="50%" >
                    {/* <Image src={profilePicUrl} alt="Profile Picture" boxSize="100%" /> */}
                    <Blockies seed={user.user_name} scale={25} color="blue" bgColor="red" spotColor="blue" className="identicon" />
                </Box>
                <Box w="100%" h="50%" pt={4}>
                    <Text fontSize="lg" fontWeight="bold">
                        {user_name}
                    </Text>
                    <Text>{email}</Text>
                </Box>
            </Box>
            {/* If the user is same as the user querying show this */}
            <Button
                variant="custom"
                as={motion.button}
                whileTap={{ scale: 0.9 }}
                color={"black"}
                _hover={{ bg: "red.200" }}
                fontFamily="heading"
                fontSize={"25"}
                fontWeight={'medium'}
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Stack>
    );
};

const UserProfilePage = () => {
    const [userd, setUser] = useState(null);
    const [events, setEvents] = useState();
    // const [schedule, setSchedule] = useState(null);
    const navigate = useNavigate()
    const [isDesktop] = useMediaQuery('(min-width: 1024px)');
    useEffect(() => {
        axios.get('/user/create/', { params: { "email": localStorage.getItem("email") } })
            .then((res) => {
                setUser(res.data)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log("User not authorized to access this endpoint");
                    // window.location.reload();
                } else {
                    console.log("Error occurred:", error);
                }
                // navigate("/profile")
            });

        axios.get('/team/', { params: { "email": localStorage.getItem("email"), "sport_name": "all" } })
            .then((res) => {
                setEvents(res.data)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log("User not authorized to access this endpoint");
                    // window.location.reload();
                } else {
                    console.log("Error occurred:", error);
                }
                // navigate("/profile")
            });

    }, []);

    return (
        userd && events && <Container page_name={userd.user_name}>
            {/* <Stack spacing={2}>
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                    p={8}
                >
                    <Box gridColumn={{ base: "1 / -1", md: "1 / span 2" }}>
                        <UserDetails user={user} />
                        <EventsUserIsParticipatingIn events={user.eventsParticipating} />
                    </Box>
                    <Box gridColumn={{ base: "1 / -1", md: "2 / span 3" }}>
                        <EventSchedule schedule={user.eventSchedule} />
                    </Box>
                </Grid>
            </Stack> */}

            <Flex
                direction={isDesktop?'row':'column'}
                alignItems='center'
                my={{ xl: '16' }}
                spacing={"10vw"}
            >
                <UserDetails user={userd} />
                <Box w={isDesktop?'10vw':'0'} />
                <Flex
                    alignSelf='center'
                    direction='column'
                    pl={isDesktop?10:0}
                    my={!isDesktop?10:0}
                >
                    <EventsUserIsParticipatingIn events={events} />
                </Flex>
            </Flex>
        </Container>
    );
};

export default UserProfilePage;
