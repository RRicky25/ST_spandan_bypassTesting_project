import {
    Button,
    FormLabel,
    FormControl,
    FormErrorMessage,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import Container from '../components/Container';
import axios from '../AxiosConfig';

export default function ForgotPwd() {
    const [mailSent, setMailSent] = useState(false);
    const [caughtError, setcaughtError] = useState(false);

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
        axios.post('/password_reset/', values)
            .then((res) => {
                setMailSent(true)
                setcaughtError(false)
            }).catch((error) => {
                setMailSent(true)
                setcaughtError(true)
            })
        actions.setSubmitting(true);
    };

    return (
        <Container page_name="Forgot Password">
            <Flex
                align={'center'}
                justify={'center'}>
                <Stack spacing={8} mx={'auto'} minW={'40vw'} py={12} px={6}>
                    <Stack spacing={4}>
                        <Heading fontSize={'4xl'}>
                            Forgot your password?
                        </Heading>
                        {mailSent ?
                            <Text
                                fontSize={{ base: 'sm', sm: 'md' }}
                                color="white.800">
                                {
                                    caughtError ? "Looks like an incorrect mail ID is entered. Reach out to spandaniiitb.23@gmail.com for changes" :
                                        "Check your mail for URL to change password. Check your Junk and Microsoft Quarantine for the URL."
                                }
                            </Text> :
                            <>
                                <Text
                                    fontSize={{ base: 'sm', sm: 'md' }}
                                    color="white.800">
                                    You&apos;ll get an email with a reset link
                                </Text>
                                <Stack border="2px" p={8} bgColor={'black'}>

                                    <Formik initialValues={{ email: '' }} onSubmit={handleSubmit} >
                                        {({ isSubmitting }) => (
                                            <Form>
                                                <Field name="email">
                                                    {({ field, form }) => (
                                                        <FormControl id="email" isInvalid={form.errors.email && form.touched.email}>
                                                            <FormLabel>Email address</FormLabel>
                                                            <Input
                                                                {...field}
                                                                border={'1px'}
                                                                placeholder="your-email@iiitb.ac.in"
                                                                _placeholder={{ color: 'white' }}
                                                                type="email"
                                                                rounded="0"
                                                                bgColor={'whiteAlpha.500'}
                                                            />
                                                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <Stack spacing={6} mt={6}>
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
                                                        rounded='0'
                                                        isLoading={isSubmitting}
                                                    >
                                                        Request Reset
                                                    </Button>
                                                </Stack>
                                            </Form>
                                        )}
                                    </Formik>
                                </Stack>
                            </>
                        }
                    </Stack>
                </Stack>
            </Flex>
        </Container>
    );
}
