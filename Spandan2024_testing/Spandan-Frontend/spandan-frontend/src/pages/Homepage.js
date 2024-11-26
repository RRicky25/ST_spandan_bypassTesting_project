import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link as ReactRouterLink } from "react-router-dom";
import { Box, Flex, Heading, Button, Image, Text, useMediaQuery, Link, VStack } from "@chakra-ui/react";
import axios from '../AxiosConfig';

import Container from '../components/Container'
// import TV from "../components/OldTV";
import Slideshow from "../components/Slideshow";

const images = [
    "/sports-assets/cricket.png",
    "/sports-assets/football.png",
    "/sports-assets/volleyball.png",
    "/sports-assets/basketball.png",
];

const ButtonWithImage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login'));
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(currentImageIndex => (currentImageIndex + 1) % images.length);
        }, 175);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Link _hover={{ textDecoration: "none" }} as={ReactRouterLink} to={isLoggedIn?"/events":"/main"}>
            <Button variant="link"
                as={motion.button}
                whileTap={{ scale: 0.9 }}
                color={"white.800"}
                fontFamily="heading"
                fontSize={"25"}
                fontWeight={'medium'}
            >
                <Flex align="center">
                    <Image src={images[currentImageIndex]} boxSize="18px" objectFit="contain" mr={4} />
                    {isLoggedIn?
                    (<Text fontSize={"25px"}>Register for a sport Now!</Text>)
                    // <Text fontSize={"25px"}>(Only For Alumni)</Text>:
                    :
                    (<>
                    <VStack>
                    <Text fontSize={"25px"}>Register Now!</Text>
                    <Text fontSize={"25px"}>(Only For Alumni)</Text>
                    </VStack>
                    </>)}
                </Flex>
            </Button >
        </Link>
    );
};


const Homepage = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const [isLargerThanLg] = useMediaQuery("(min-width: 992px)");
    

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const imageList = [
        "/sports-assets/cricket.png",
        "/sports-assets/football.png",
        "/sports-assets/volleyball.png",
        "/sports-assets/basketball.png",
    ];

    return (
        <Container direction={{ base: "column", lg: "row" }} page_name="Home">
            <Flex
                flexDirection={isLargerThanLg ? "row" : "column"}
                justifyContent={isLargerThanLg ? "center" : "center"}
                align="center"
            >
                <Box
                    mr={isLargerThanLg ? 8 : 0}
                    mb={isLargerThanLg ? 0 : 4}
                    align="center"
                >
                    <Box background="none" p={4}>
                <Image src={'Spandan2024he.svg'} height={'180px'} />
              </Box>
                    <Flex justifyContent="center" mb="8" flexDirection={{ base: "column", md: "row" }} flexWrap="wrap">
                        
                        <Box>
                            <Heading fontFamily="akshar"
                    fontSize={{ base: "5vh", lg: "5vh" }}
                    fontWeight="bold"
                    letterSpacing="widest">
                                SPANDAN
                            </Heading>
                            <Text textAlign="center" fontSize="2xl" mt="2">
                                24th & 25th March 2024
                            </Text>
                        </Box>
                    </Flex>
                    <ButtonWithImage />
                </Box>
                {/* <Box mt={{ base: "8vh", md: "6vh", lg: "0" }} ml={"10vw"} />
                <TV /> */}
                {isLargerThanLg && <Box ml={"10vw"} />}
                {isLargerThanLg && <Slideshow photos={imageList} />}
            </Flex>
        </Container >
    );
}

export default Homepage;
