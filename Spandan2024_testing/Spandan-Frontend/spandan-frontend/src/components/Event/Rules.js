import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Rules = ({ sports_data }) => {

    const { icon, rules, spoc } = sports_data;

    return (
        <Box width={{ base: '100%', md: '60vw' }}>
            <Flex align="center">
                <Image src={icon} w="40px" h="40px" mr="2" alt="Sport icon" />
                <Text fontSize="xl">Rules</Text>
                <ExternalLinkIcon boxSize={6} color='black' />
            </Flex>
            <Box mt="4" overflowY="scroll">
                <Text>{rules}</Text>
            </Box>
            <Box mt="4">
                {spoc.map(({ spoc_name, spoc_contact }) => (
                    <Flex key={spoc_name} align="center">
                        <Text fontWeight="bold">{spoc_name}: </Text>
                        <Text>{spoc_contact}</Text>
                    </Flex>
                ))}
            </Box>
        </Box >
    );
};

export default Rules;
