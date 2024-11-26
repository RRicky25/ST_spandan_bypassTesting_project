import { Formik, Field, Form } from 'formik';
import {
    Flex,
    Stack,
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Text,
    Link,
    Heading,
    HStack,
    Radio,
    RadioGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { Link as ReactRouterLink, Navigate, useParams, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import axios from '../AxiosConfig';

import { useState } from 'react';

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false)

    const { token } = useParams();
    const history = useNavigate();

    const handleSubmit = (values, actions) => {
        if (values.password !== values.changePassword) {
            actions.setFieldError("changePassword", "Passwords do not match");
            actions.setSubmitting(false);
        } else {
            // console.log(values.password, token)
            axios.post('/password_reset/confirm/', { "password": values.password, "token": token })
                .then((res) => {
                    history('/login');
                }).catch((error) => {
                    console.log(error)
                })
            actions.setSubmitting(true);
        }
    };

    return (
        <Container page_name="Change Password">
            <Formik
                initialValues={{
                    password: '',
                    changePassword: ''
                }}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <Flex align={'center'} justify={'center'} bg={'none'}>
                            <Stack spacing={8} mx={'auto'} minW={{ base: '80vw', lg: '40vw' }} py={4} px={6}>
                                <Stack align={'center'}>
                                    <Heading fontSize={'4xl'} textAlign={'center'}>
                                        Change Password
                                    </Heading>
                                </Stack>
                                <Box
                                    border={'2px'}
                                    rounded={'none'}
                                    bg={"black"}
                                    p={8}
                                >
                                    <Field name="password">
                                        {({ field }) => (
                                            <FormControl id="password" isRequired>
                                                <FormLabel>Enter New Password</FormLabel>
                                                <InputGroup>
                                                    <Input rounded="none"
                                                        type={'password'}
                                                        {...field}
                                                        border={"1px"}
                                                        bgColor={'whiteAlpha.500'} placeholder={'**********'} _placeholder={{color:'white'}}
                                                    />
                                                </InputGroup>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="changePassword">
                                        {({ field }) => (
                                            <FormControl id="changePassword" isRequired isInvalid={errors.changePassword && touched.changePassword}>
                                                <FormLabel>Enter Password Again</FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        rounded="none"
                                                        type={showPassword ? 'text' : 'password'}
                                                        {...field}
                                                        border={'1px'}
                                                        bgColor={'whiteAlpha.500'} placeholder={'**********'} _placeholder={{color:'white'}}
                                                    />
                                                    <InputRightElement h={'full'}>
                                                        <Button
                                                            variant={'ghost'}
                                                            onClick={() => setShowPassword((showPassword) => !showPassword)}
                                                        >
                                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage>{errors.changePassword}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Stack spacing={10} pt={4}>
                                        <Button
                                            variant={"custom"}
                                            bg={'red'}
                                            color={'black'}
                                            _hover={{
                                                bg: 'red.400',
                                            }}
                                            alignItems="center"
                                            type="submit"
                                            as={motion.button}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            Change Password
                                        </Button>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Flex >
                    </Form>)}
            </Formik>
        </Container >
    );
}

export default ChangePassword;