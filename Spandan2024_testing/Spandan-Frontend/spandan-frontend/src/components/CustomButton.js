import { useStyleConfig } from "@chakra-ui/react";
import { motion } from "framer-motion";

const buttonClickVariants = {
    clicked: { scale: 0.95 },
    hover: { scale: 1.05 },
    rest: { scale: 1 },
};

const CustomButton = (props) => {
    const { variant, ...rest } = props;
    const styles = useStyleConfig("Button", { variant: variant });
    return (
        <motion.button
            whileTap="clicked"
            variants={buttonClickVariants}
            sx={styles}
            {...rest}
        />
    );
};

export default CustomButton


{/* 
<Button
    as={motion.button}
    variant="custom"
    whileTap={{ scale: 0.9 }}
    drag='x'
>
    Click me!
</Button> 
*/}