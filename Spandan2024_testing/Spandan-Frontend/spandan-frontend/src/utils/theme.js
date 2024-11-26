import { extendTheme } from '@chakra-ui/react'
import "@fontsource/vt323";
// import '@fontsource/open-sans'
import '@fontsource/akshar'
import '@fontsource/archivo'
// import '@fontsource/bakbak-one'

const fonts = {
    heading: 'archivo',
    body: 'akshar',
    mono: 'akshar',
};

const theme = extendTheme({
    fonts,
    fontWeights: {
        normal: 600,
        bold: 1000,
    },
    styles: {
        global: {
            body: {
                backgroundImage: "url('/DarkPink.png')", // Corrected here
                backgroundSize: "cover",
                backgroundPosition: "center",
                color:'white'
            },
            h1: {
                fontWeight: "bold",
                fontSize: "2.5rem",
                lineHeight: "3rem",
            },
            h2: {
                fontWeight: "bold",
                fontSize: "2rem",
                lineHeight: "2.5rem",
            },
            h3: {
                fontWeight: "bold",
                fontSize: "1.5rem",
                lineHeight: "2rem",
            },
            h4: {
                fontWeight: "bold",
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
            },
            h5: {
                fontWeight: "bold",
                fontSize: "1rem",
                lineHeight: "1.5rem",
            },
            h6: {
                fontWeight: "bold",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
            },
        },
    },
    layerStyles: {
        floating: {
            mb: '4',
            borderRadius: '0',
            borderWidth: '4px',
            borderColor: 'white',
            bgColor: 'black',
        }
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'normal',
            },
            sizes: {
                xl: {
                    h: '56px',
                    fontSize: 'lg',
                    px: '32px',
                },
            },
            variants: {
                'with-shadow': {
                    bg: 'red.400',
                    boxShadow: '0 0 2px 2px #efdfde',
                },
                solid: (props) => ({
                    bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
                }),
                sm: {
                    bg: 'teal.500',
                    fontSize: 'md',
                },
                'custom': {
                    bg: "white",
                    color: "black",
                    _hover: {
                        bgGradient: "linear(to-r, yellow, yellow)",
                        boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
                    },
                    borderWidth: "2px",
                    borderColor: "white",
                    borderRadius: "none"
                },
            },
            defaultProps: {
                size: 'md',
                variant: 'solid',
                colorScheme: 'gray',
            },
        },
    },
})

export default theme;
