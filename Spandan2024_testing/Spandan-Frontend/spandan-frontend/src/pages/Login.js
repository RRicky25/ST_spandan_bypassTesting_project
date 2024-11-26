import { motion } from 'framer-motion';
import {
    Box,
    Button,
    Checkbox,
    Text,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import { Link as ReactRouterLink, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Container from '../components/Container';
import axios from '../AxiosConfig'

export default function Login() {
    const [isSubmitting, setSubmitting] = useState(false)
    const [caughtError, setcaughtError] = useState(false);
    const history = useNavigate();

    const validateEmail = (value) => {
        let error;
        if (!value) {
            error = 'Email address is required';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Invalid email address';
        }
        else if (!value.endsWith('iiitb.ac.in') && !value.endsWith('iiitb.org')) {
            error = 'Email address must end with iiitb.ac.in or iiitb.org';
        }
        return error;
    };

    const handleSubmit = (values, actions) => {
        // send user data
        // set jwt token 
        setcaughtError(false)
        localStorage.removeItem('login');
        localStorage.removeItem('login_refresh');
        localStorage.removeItem("jwt");

        var file = {
            email: values.email.toLowerCase(),
            password: values.password,
        }

        axios
            .post('/token/', file)
            .then((res) => {
                actions.setSubmitting(false);
                setcaughtError(false)
                localStorage.setItem('login', true);
                localStorage.setItem('email', values.email.toLowerCase());
                localStorage.setItem('login_refresh', res.data.refresh);
                localStorage.setItem("jwt", res.data.access);
                history('/');
            })
            .catch((error) => {
                setcaughtError(true)
                console.log(error)
            })

        actions.setSubmitting(false);
    };

    return (
        <Container page_name="Login">
            <Flex
                align={'center'}
                justify={'center'}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>
                            Sign in using your IIITB account
                        </Heading>

                        {/* <Text color="red" fontWeight={"bold"} fontSize={"30"}>
                            IMPORTANT: CLICK ON FORGOT PASSWORD IF YOU ARE LOGGING IN FOR THE FIRST TIME
                        </Text> */}
                    </Stack>
                    <Box bg={useColorModeValue('black', 'gray.700')} border="2px" p={8}>
                        <Formik initialValues={{ email: '', password: '', rememberMe: true }} onSubmit={handleSubmit}>
                            {({ isSubmitting }) => (
                                <Form>
                                    <Stack spacing={4}>
                                        <Field name="email" >
                                            {({ field, form }) => (
                                                <FormControl
                                                    isInvalid={form.errors.email && form.touched.email}
                                                    isRequired
                                                >
                                                    <FormLabel>Email address</FormLabel>
                                                    <Input type="email" {...field} border={'1px'} rounded='0' bgColor={'whiteAlpha.500'} placeholder={'your-email@iiitb.ac.in'} _placeholder={{color:'white'}}/>
                                                    {form.errors.email && form.touched.email && (
                                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                    )}
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="password">
                                            {({ field }) => (
                                                <FormControl isRequired>
                                                    <FormLabel>Password</FormLabel>
                                                    <Input type="password" {...field} border={'1px'} rounded='0' bgColor={'whiteAlpha.500'} placeholder={'**********'} _placeholder={{color:'white'}}/>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Stack spacing={10}>
                                            <Stack
                                                direction={{ base: 'column', sm: 'row' }}
                                                align={'start'}
                                                justify={'space-between'}
                                            >
                                                {/* <Field name="rememberMe">
                                                    {({ field }) => (
                                                        <Checkbox {...field}>Remember me</Checkbox>
                                                    )}
                                                </Field> */}
                                                <Link color={'#DC35AA'} as={ReactRouterLink} to={'/forgot'}>
                                                    Forgot password?
                                                </Link>
                                            </Stack>
                                            <Button
                                                type="submit"
                                                variant="custom"
                                                bg={'red'}
                                                color={'white'}
                                                _hover={{
                                                    bg: 'red.400',
                                                }}
                                                alignItems="center"
                                                as={motion.button}
                                                whileTap={{ scale: 0.9 }}
                                                rounded='0'
                                                isLoading={isSubmitting}
                                            >
                                                Sign in
                                            </Button>
                                            {
                                                caughtError ? <Text color="red">Wrong credentials entered</Text> : <></>
                                            }
                                        </Stack>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Stack>
            </Flex>
        </Container>
    );
}