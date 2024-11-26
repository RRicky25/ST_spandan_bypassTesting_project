import { Box, Skeleton } from "@chakra-ui/react";
import { useState } from "react";

function TV() {
    const [loading, setLoading] = useState(true);

    function handleLoad() {
        setLoading(false);
    }

    return (
        <Box
            border="none"
            height={{ base: "20vh", lg: "50vh" }}
            overflow="hidden"
            position="relative"
            width={{ base: "80vw", lg: "40vw" }}
            rounded="xl"
        >
            {loading && (
                <Skeleton height="80%" width="90%" position="absolute" top={10} left={0} />
            )}
            <iframe
                allowfullscreen="false"
                height="100%"
                src="//codepen.io/dakeiser/embed/qBMjNVE/?theme-id=24311&default-tab=result"
                style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
                title="Spandan TV"
                onLoad={handleLoad}
            />
        </Box>
    );
}

export default TV;
