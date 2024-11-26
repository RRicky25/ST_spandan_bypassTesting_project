import { Box, Flex, GridItem, Heading, HStack, SimpleGrid, Text, Link, Icon, StackDivider, Divider,useMediaQuery } from '@chakra-ui/react';
import { FaEnvelope, FaInstagram } from 'react-icons/fa';

function FooterLink({ href, children }) {
    return (
        <Link href={href} textDecoration="underline" color="#DC35AA" textDecorationThickness="1px" textUnderlineOffset="3px">
            <Box as="a">{children}</Box>
        </Link>
    );
}

function LinkItem(props) {
    const { icon, children, href, iconColor = '#DC35AA' } = props;
    return (
        <HStack rel="noopener" target="_blank">
            <Icon aria-hidden as={icon} fontSize="xl" color={iconColor} />
            <FooterLink href={href}>
                {children}
            </FooterLink>
        </HStack>
    );
}

export default function Footer() {
    const [isDesktop] = useMediaQuery('(min-width: 1024px)');
    return (
        <Box as="footer" paddingY="7" border={"2px"} borderBottom="2px" borderLeft={"hidden"} borderRight={"hidden"} bgColor={'black'}>
            <Box maxWidth="6xl" marginX="auto" paddingX="6">
                <SimpleGrid columns={isDesktop?12:4} spacing={isDesktop?16:10}>
                    <GridItem colSpan={6}>
                        <Box>
                            <Heading marginBottom="4" size="lg">
                                Spandan '24
                            </Heading>
                            <Text fontSize="lg">
                                The annual intra-college sports fest of IIIT Bangalore
                            </Text>
                        </Box>

                        {/* <HStack marginTop="4" spacing={{ base: '8', md: '10' }}>
                            <LinkItem href={"mailto:sportscomm@iiitb.ac.in"} icon={FaEnvelope}>
                                Mail
                            </LinkItem>
                            <LinkItem href={"https://instagram.com/"} icon={FaInstagram}>
                                Instagram
                            </LinkItem>
                        </HStack> */}
                        <Text marginTop="4">
                            All rights reserved &copy; Sportscomm IIITB {new Date().getFullYear()}
                        </Text>
                    </GridItem>

                    <GridItem colSpan={6}>
                        <Heading as="h2" marginBottom="4" size="lg">
                            Contact
                        </Heading>
                        <Flex direction="row" gap="4">
                            <FooterLink href={"mailto:sportscomm@iiitb.ac.in"}>Email Sportscomm</FooterLink>
                            <FooterLink href="/about">Reach out to SPOCs</FooterLink>
                        </Flex>
                    </GridItem>
                </SimpleGrid>


            </Box>
        </Box >
    );
}