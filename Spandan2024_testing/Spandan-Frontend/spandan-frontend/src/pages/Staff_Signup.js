import { Formik, Field, Form } from 'formik';
import axios from "../AxiosConfig";
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
    ColorModeScript,
    Center,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { Link as ReactRouterLink } from 'react-router-dom';
import Container from '../components/Container';
import { useState } from 'react';
// import axios from 'axios';

const Staff_Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false)
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
    const validateRoll = (value) => {
        let error;
        
        if (!value) {
            error = 'Roll number is required';
        }
        else
        {
            value = value.toUpperCase();
        }
        console.log(value);
        return error;
    };
    const validatePhone = (value) => {
        let error;
        if (value && (!/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/.test(value))) {
            error = 'Invalid mobile number';
        }
        return error;
    };

    const handleSubmit = async (values, actions) => {

        // set the values 

        // use axios to send the data
        // console.log(values);
        // try{
        //     var Response = await fetch("http://127.0.0.1:8000/api/user/create", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             user_name: values.name,
        //             email: values.email,
        //             first_name: "Amar",
        //             password: values.password,
        //             // sex: values.sex,
        //             // rollNumber: values.rollNumber,
        //             // phoneNumber: values.phoneNumber
        //         })
        // })}
        // catch(error){
        //     console.log(error);
        // }
        //console.log(values.rollNumber)
        const userJson = {
            user_name: values.name,
            email: values.email,
            first_name: "Amar",
            password: values.password,
            rollNum : values.rollNumber
        }

        axios
        .post('/user/create/', userJson)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        // axios({
        //     method: "POST",
        //     url:"http://localhost:8000/api/user/create",
        //     data:{
        //         user_name: values.name,
        //         email: values.email,
        //         first_name: "Amar",
        //         password: values.password,
        //     }
        // })
        // .then((response) => {
        //     console.log(response);
        // }).catch((error)=>{
        //     console.log(error.message);
        // })


        console.log('Form submitted successfully.');
        actions.setSubmitting(false);
    };

    return (
        // <Container page_name="Signup">
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    sex: '',
                    rollNumber: '',
                    phoneNumber: '',
                }}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <Flex align={'center'} justify={'center'} bg={'white'}>
                            <Stack spacing={8} mx={'auto'} minW={'40vw'} py={12} px={6}>
                                <Stack align={'center'}>
                                    <Heading fontSize={'4xl'} textAlign={'center'}>
                                        Sign up as Staff
                                    </Heading>
                                </Stack>
                                <Box
                                    rounded={'none'}
                                    bg={"white"}
                                    p={8}
                                    border={"2px"}
                                >
                                    <Stack spacing={4}>
                                        <HStack>
                                            <Field name="name">
                                                {({ field }) => (
                                                    <FormControl id="name" isRequired >
                                                        <FormLabel>Name</FormLabel>
                                                        <Input type="text" {...field} border={"1px"} rounded="none" />
                                                    </FormControl>
                                                )}
                                            </Field>
                                        </HStack>
                                        <Field name="email" validate={validateEmail}>
                                            {({ field, form }) => (
                                                <FormControl id="email" isInvalid={form.errors.email && form.touched.email} isRequired>
                                                    <FormLabel>Email address</FormLabel>
                                                    <Input type="email" {...field} border={"1px"} rounded="none" />
                                                    {form.errors.email && form.touched.email && (
                                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                    )}
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="password">
                                            {({ field }) => (
                                                <FormControl id="password" isRequired>
                                                    <FormLabel>Password</FormLabel>
                                                    <InputGroup>
                                                        <Input rounded="none"
                                                            type={showPassword ? 'text' : 'password'}
                                                            {...field}
                                                            border={"1px"}
                                                        />
                                                        <InputRightElement h={'full'}>
                                                            <Button
                                                                variant={'ghost'}
                                                                id="button2"
                                                                onClick={() =>
                                                                    setShowPassword((showPassword) => !showPassword)
                                                                }
                                                            >
                                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                            </Button>
                                                        </InputRightElement>
                                                    </InputGroup>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="confirm_password">
                                            {({ field }) => (
                                                <FormControl id="confirm_password" isRequired>
                                                    <FormLabel>Confirm Password</FormLabel>
                                                    <InputGroup>
                                                        <Input rounded="none"
                                                            type={showPassword ? 'text' : 'password'}
                                                            {...field}
                                                            border={"1px"}
                                                        />
                                                        <InputRightElement h={'full'}>
                                                            <Button
                                                            id="button1"
                                                                variant={'ghost'}
                                                                onClick={() =>
                                                                    setShowPassword((showPassword) => !showPassword)
                                                                }
                                                            >
                                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                            </Button>
                                                        </InputRightElement>
                                                    </InputGroup>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Stack direction={{ base: "column", md: "row" }}>
                                            <Field name="sex">
                                                {({ field, form }) => (
                                                    <FormControl id="sex" isRequired>
                                                        <FormLabel>Sex</FormLabel>
                                                        <RadioGroup id={"sex"}>
                                                            <Stack direction="row" spacing="8">
                                                                <Radio {...field} value='male'>Male</Radio>
                                                                <Radio {...field} value='female'>Female</Radio>
                                                            </Stack>
                                                        </RadioGroup>
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Field name="phoneNumber" validate={validatePhone}>
                                                {({ field, form }) => (
                                                    <FormControl id="phoneNumber" isInvalid={form.errors.phoneNumber && form.touched.phoneNumber}>
                                                        <FormLabel>Phone Number</FormLabel>
                                                        <Input type="phoneNumber" {...field} border={"1px"} rounded="none" />
                                                        {form.errors.phoneNumber && form.touched.phoneNumber && (
                                                            <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                                                        )}
                                                    </FormControl>
                                                )}
                                            </Field>
                                
                                        </Stack>
                                        <HStack spacing={10} pt={2} alignSelf={'center'}> 
                                            <Button
                                                variant={"custom"}
                                                bg={'yellow.300'}
                                                color={'black'}
                                                _hover={{
                                                    bg: 'yellow.400',
                                                }}
                                                py={1}
                                                alignItems="center"
                                                type="submit"
                                                as={motion.button}
                                                whileTap={{ scale: 0.9 }}
                                                // justifyContent={'center'}
                                                isLoading={isSubmitting}
                                            >
                                                Get Otp
                                            </Button>
                                            <Field name="Otp" justifyContent={'center'}>
                                                {({ field, form }) => (
                                                    <FormControl id="Otp" isInvalid={form.errors.Otp && form.touched.Otp}>
                                                    <Input type="text" {...field} border={"2px"} rounded="none" py={4} width={'30'}/>
                                                    {form.errors.Otp && form.touched.Otp && (
                                                        <FormErrorMessage>{form.errors.Otp}</FormErrorMessage>
                                                    )}
                                                    </FormControl>
                                                )}
                                            </Field>


                                        </HStack>
                                        <Stack spacing={10} pt={4}>
                                            <Button
                                                variant={"custom"}
                                                bg={'yellow.300'}
                                                color={'black'}
                                                _hover={{
                                                    bg: 'yellow.400',
                                                }}
                                                alignItems="center"
                                                type="submit"
                                                as={motion.button}
                                                whileTap={{ scale: 0.9 }}
                                                isLoading={isSubmitting}
                                            >
                                                Sign up
                                            </Button>
                                        </Stack>
                                        <Stack pt={2}>
                                            <Text align={'center'}>
                                                Already a user? <Link color={'blue'} as={ReactRouterLink} to={'/login'}>Login</Link>
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Flex >
                    </Form>)}
            </Formik>
        // </Container >
    );
}

export default Staff_Signup;