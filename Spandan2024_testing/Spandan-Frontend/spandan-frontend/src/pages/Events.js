import React, { useState } from 'react';
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Input,
    Text,
    Link,
    Image,
    useMediaQuery
} from '@chakra-ui/react';
import Container from "../components/Container";
import sd from "../components/sportsData";
import { Link as ReactRouterLink } from 'react-router-dom';

function SearchBar({ onSearch }) {
    const handleChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <Box p={4}>
            <Input placeholder="Search Sports" onChange={handleChange} border="2px solid white"
                borderRadius="none"
                backgroundColor={'blackAlpha.300'}
                _placeholder={{
                    fontSize: "1.8rem", // Adjust the font size as needed
                    fontWeight: "600", // Make the placeholder text bold
                    fontStyle: "akshar",
                    color: 'whiteAlpha.900' // Add italic font style
                }} />
        </Box>
    );
}

function SportsCard({ title, data }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isDesktop] = useMediaQuery('(min-width: 1024px)');

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Box mt={8} minW="50vw">
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
                <button onClick={toggleOpen}>{isOpen ? '-' : '+'} {title}</button>
            </Text>
            {isOpen &&
                <Grid templateColumns={isDesktop?['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5, 1fr)']:['repeat(1,1fr']} gap={4}>
                    {data.map((sport) => (
                        <GridItem
                            key={sport.id}
                        >
                            <Link to={`/events/${sport.id}`} as={ReactRouterLink}>
                                <Flex direction={isDesktop ? 'column' : 'row'} align="center">
                                    {!isDesktop&&sport.icon && (
                                        <Box display={'inline-block'} ml={2}>
                                            <Image src={sport.icon} boxSize="32px" objectFit="contain" />
                                        </Box>
                                    )}
                                    {isDesktop && sport.displayImage && (
                                        <Box display="inline-block" boxSize="225px" overflow="hidden">
                                            <Image src={sport.displayImage} boxSize="full" objectFit="cover" />
                                        </Box>
                                    )}

                                    <Box p={4} ml={isDesktop ? 4 : 0} _hover={{ boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)", bgGradient: "linear(to-r, #DC35AA, #DC35AA)" }}>
                                        <Text fontWeight="normal" fontSize={isDesktop?18:30}>
                                            {sport.name}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Link>
                        </GridItem>
                    ))}
                </Grid>
            }
        </Box >
    );
}

const Events = () => {
    const sportsData = sd();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = sportsData.filter(
        (sport) =>
            sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sport.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container page_name="Events">
            <Box>
                <SearchBar onSearch={(term) => setSearchTerm(term)} />
                <SportsCard title="Major Sports" data={filteredData.filter((s) => s.type === 'major')} />
                <SportsCard title="Minor Sports" data={filteredData.filter((s) => s.type === 'minor')} />
            </Box>
        </Container>
    )
}

export default Events;
