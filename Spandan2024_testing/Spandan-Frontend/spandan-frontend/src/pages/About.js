import Container from "../components/Container"
import teamCreditsData from "../components/team"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

function Credit() {
    const [yPos, setYPos] = useState(500);
    const [height, setHeight] = useState(0);
    const data = teamCreditsData.data;

    useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        const animationInterval = setInterval(() => {
            setYPos(y => y - height);
        }, -1000);

        return () => clearInterval(animationInterval);
    }, [height]);

    return (
        <Box
            w={{ base: "100vw", lg: "20vw" }}
            h="55vh"
            overflow="hidden"
            position="relative"
            align="center"
        >
            <motion.div
                style={{ y: yPos }}
                animate={{ y: -2800 }}
                transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
            >
                {data.map((section, index) => (
                    <div key={index}>
                        <Text as='u' fontWeight="bold" fontSize="lg">
                            {section.heading}
                        </Text>
                        {section.credits.map((credit, index) => (
                            <Text key={index} fontSize="2xl">
                                {credit}
                            </Text>
                        ))}
                        <Box h="2vh" />
                    </div>
                ))}
            </motion.div>
        </Box >
    );
}

const About = () => {
    return (
        <Container page_name="About">
            <Credit />
        </Container>
    )

}

export default About;