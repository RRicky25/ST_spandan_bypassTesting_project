import { useState, useEffect, React } from "react";
import {
    Box,
    Flex,
    Text,
    Stack,
    HStack,
    Button,
    ButtonGroup,
    Icon,
    Link,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    useBreakpointValue,
    Center,
    useMediaQuery
} from "@chakra-ui/react";
import axios from '../AxiosConfig';
import { useNavigate } from "react-router-dom";

import Blockies from 'react-18-blockies';
import { motion } from "framer-motion";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaBasketballBall, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { Link as ReactRouterLink } from "react-router-dom";

const items = [
    { label: 'Events', href: '/events', icon: FaBasketballBall },
    { label: 'Fixtures', href: '/fixtures', icon: FaCalendarAlt },
    { label: 'Team', href: '/about', icon: FaUsers },
];

const Logo = () => {
    const [isDesktop] = useMediaQuery("(min-width: 1024px)");
    return (
        <Stack align={"center"} justify={"space-around"} w={isDesktop?'280px':'70vw'} h='inherit' borderRight={'inherit'}>
            < Link href="/" _hover={{ textDecoration: "none" }} >
                <Text
                    fontFamily="akshar"
                    fontSize={'5vh'}
                    fontWeight="bold"
                    letterSpacing="widest"
                >
                    SPANDAN
                </Text>
            </Link >
        </Stack >
    )
}

const ProfileBlock = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [isDesktop] = useMediaQuery("(min-width: 1024px)");
    useEffect(() => {
        axios.get('/user/create/', { params: { "email": localStorage.getItem("email") } })
            .then((res) => {
                setUser(res.data)
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    console.log("User not authorized to access this endpoint");
                } else {
                    console.log("Error occurred:", error);
                }
                // navigate("/profile")
            });

    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        user && <Link _hover={{ textDecoration: "none" }} as={ReactRouterLink} to="/profile">
            <Button
                variant="custom"
                bg="purple.100"
                display="flex"
                alignItems="center"
                onClick={toggleDropdown}
                as={motion.button}
                whileTap={{ scale: 0.9 }}
                _hover={{ bg: "#DC35AA", boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)", }}
                w="full"
            >
                <Blockies seed="Random Name" scale={3} color="blue" bgColor="red" spotColor="blue" className="identicon" />
                <Box marginLeft="1rem">
                    <Text fontFamily="heading" fontSize={"25"} fontWeight={'normal'}>{user.user_name.length > 10 ? `${user.user_name.substring(0, 10)}...` : user.user_name}</Text>
                </Box>
            </Button>
        </Link>
    );
};

function NavItem(props) {
    const { children, icon, active, href, large } = props;
    const [isDesktop] = useMediaQuery("(min-width: 1024px)");
    return (
        <Link href={href} _hover={{ textDecoration: "none" }}>
            <HStack
                paddingY={large ? '5' : '2.5'}
                spacing={{ base: "2", md: "3" }}
                aria-current={active ? 'page' : undefined}
                _hover={{ color: "#DC35AA" }}

            >
                <Icon as={icon} />
                <Text fontFamily="heading" fontWeight="medium" fontSize={!isDesktop?"20px":"35px"}>{children}</Text>
            </HStack>
        </Link >
    );
}

function DesktopNavItemGroup(props) {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isDesktop] = useMediaQuery("(min-width: 1024px)");
    const handleNavItemClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <HStack as="nav" aria-label="Main navigation" justify="space-around" spacing="8" fontSize={25}{...props}>
            {items.map((item, index) => (
                <NavItem
                    key={item.label}
                    href={item.href}
                    icon={item.icon}
                    active={activeIndex === index}
                    onClick={() => handleNavItemClick(index)}
                >
                    {item.label}
                </NavItem>
            ))}
            {props.isAuthenticated ? (
                <ProfileBlock />
            ) : (
                <ButtonGroup gap={{ base: '4', md: '4' }}>
                    <Link _hover={{ textDecoration: "none" }} as={ReactRouterLink} to="/login">
                        <Button
                            variant="link"
                            as={motion.button}
                            whileTap={{ scale: 0.9 }}
                            color={"white"}
                            fontFamily="heading"
                            fontSize={"35"}
                            fontWeight={'medium'}
                            _hover={{color:"#DC35AA"}}
                        >
                            Login
                        </Button>
                    </Link>
                    {/* <Link _hover={{ textDecoration: "none" }} as={ReactRouterLink} to="/signup">
                        <Button
                            variant="custom"
                            as={motion.button}
                            whileTap={{ scale: 0.9 }}
                            bg="#afff32"
                            _hover={{ bg: "#44ff12", boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)", }}
                            fontFamily="heading"
                            fontSize={"25"}
                            fontWeight={'medium'}
                        >
                            Signup
                        </Button>
                    </Link> */}
                </ButtonGroup>)}
        </HStack >

    );
}

function MobileNavItemGroup(props) {
    const [isDesktop] = useMediaQuery("(min-width: 1024px)");
    return (
        <Stack
            as="nav"
            aria-label="Main navigation"
            spacing="4"
            {...props}
        >
            <Center justifyContent={'space-around'}>
                {items.map((item) => (
                    <NavItem key={item.label} href={item.href} icon={item.icon} large>
                        {item.label}
                    </NavItem>
                ))}
            </Center>
            {props.isAuthenticated ? (
                <ProfileBlock />
            ) : (
                <>
                    <Link _hover={{ textDecoration: "none" }} as={ReactRouterLink} to="/login">
                        <Button
                            variant="link"
                            as={motion.button}
                            whileTap={{ scale: 0.9 }}
                            color={"white"}
                            fontFamily="heading"
                            fontSize={"25"}
                            fontWeight={'medium'}
                            w='full'
                            _hover={{color:"#DC35AA"}}
                        >
                            Login
                        </Button>
                    </Link>
                    {/* <Link _hover={{ textDecoration: "none" }} as={ReactRouterLink} to="/signup">
                        <Button
                            variant="custom"
                            as={motion.button}
                            whileTap={{ scale: 0.9 }}
                            bg="#afff32"
                            _hover={{ bg: "#44ff12" }}
                            fontFamily="heading"
                            fontSize={"25"}
                            fontWeight={'medium'}
                            w='full'
                        >
                            Signup
                        </Button>
                    </Link> */}
                </>)}
        </Stack>
    );
}

function MobileNavMenu(props) {
    const menu = useDisclosure();
    const [isDesktop] = useMediaQuery("(min-width: 1024px)");
    const breakpoint = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        if (menu.isOpen && breakpoint) {
            menu.onClose();
        }
    }, [breakpoint, menu]);

    return (
        <HStack as="nav" aria-label="Main navigation" justify="space-around" spacing="2" {...props}>
            <Center
                display={isDesktop?'none':'flex'}
                as="button"
                aria-haspopup="true"
                aria-expanded={menu.isOpen}
                aria-controls="nav-menu"
                id="nav-menu--trigger"
                type="button"
                onClick={menu.onOpen}
            >
                {menu.isOpen ? <CloseIcon boxSize={4} /> : <HamburgerIcon boxSize={6} />}
            </Center>
            <Drawer isOpen={menu.isOpen} onClose={menu.onClose} placement="bottom">
                <DrawerOverlay />
                <DrawerContent id="nav-menu" border={'black'} bg="black" padding="6">
                    <MobileNavItemGroup isAuthenticated={props.isAuthenticated} />
                </DrawerContent>
            </Drawer>
        </HStack>

    );

}

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('login'));
    const [isDesktop] = useMediaQuery("(min-width: 1024px)");
    return (
        <Flex layerStyle="floating" align="center" h={'15vh'}>
            <Logo />
            <DesktopNavItemGroup display={isDesktop?'flex':'none'} flex="1" isAuthenticated={isAuthenticated} />
            <MobileNavMenu display={!isDesktop?'flex':'none'} flex="1" isAuthenticated={isAuthenticated} />
        </Flex >
    );
}
