import React from 'react'
import {
    useColorMode,
    Flex,
    useMediaQuery
} from '@chakra-ui/react'

import Navbar from "./Navbar"
import Footer from "./Footer";
import SEOComponent from './SEO';

const Container = ({ page_name, children }) => {
    const [isDesktop] = useMediaQuery('(min-width:1024px)');
    return (
        <>
            <SEOComponent page_name={page_name} />
            <Navbar />
            <Flex
                as="main"
                align="center"
                justify={!isDesktop?'around':'center'}
                direction={isDesktop?'row':'column-reverse'}
                wrap="no-wrap"
                minH="60vh"
                px={8}
                mb={8}
            >
                {children}
            </Flex>
            <Footer />
        </>
    );
};

export default Container;