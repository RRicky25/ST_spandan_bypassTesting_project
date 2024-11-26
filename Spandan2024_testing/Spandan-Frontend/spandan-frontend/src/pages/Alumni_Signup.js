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
    useMediaQuery
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { Link as ReactRouterLink } from 'react-router-dom';
import Container from '../components/Container';
import { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
// import axios from 'axios';

const Alumni_Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false)
    const [isDesktop] = useMediaQuery("(min-width: 1024px)");
    const handleRefresh = () => {
        window.location.reload();
    };
    const validateEmail = (value) => {
        let error;
        if (!value) {
            error = 'Email address is required';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Invalid email address';
        }
        else if (!value.endsWith('.com')) {
            error = 'Email address must end with .com';
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
        // console.log(value);
        return error;
    };
    const validatePhone = (value) => {
        let error;
        if (value && (!/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/.test(value))) {
            error = 'Invalid mobile number';
        }
        return error;
    };


    const handleGetOtp = async (values, actions) => {
        // Perform any pre-submission actions if needed

        try {
            console.log(values.email);
            // Make the API request to get OTP
            const response = await axios.post('/user/create/', {
                // Provide any necessary data from the form values
                email: values.email,
                // email: values.email,
                // other data...
            });

            // Handle the response from the backend
            console.log('OTP request successful:', response.data);

            // Perform any actions needed after successful OTP request

        } catch (error) {
            console.error('Error getting OTP:', error);

            // Handle errors or update the form state accordingly
        }

        // Set submitting to false after the API request is complete
        // actions.setSubmitting(false);
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
        console.log(values.otp)
        const userJson = {
            user_name: values.name,
            email: values.email,
            first_name: "Amar",
            password: values.password,
            rollNum : values.rollNumber,
            otp: values.otp
        }

        // const response = await axios.post('/user/otp/verify/', userJson)
        axios.post('/user/otp/verify/', userJson)
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
                    otp: '',
                }}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <Flex align={'center'} justify={'center'} bg={'none'}>
                            <Stack spacing={8} mx={'auto'} minW={'40vw'} py={12} px={6}>
                            { !isDesktop?
                                <>
                                    <Stack align={'center'} direction="row" spacing={5}>
                                       
                                    <Button colorScheme="white" bgColor='black' fontStyle='akshar' variant="outline" size="sm" onClick={handleRefresh}>
                                        <MdArrowBack/>
                                    </Button>
                                        <Heading fontSize="4xl" textAlign="center">
                                            Sign up as Alumni
                                        </Heading>
                                    </Stack>
                                </>
                                :
                                <Stack align={'center'} >
                                    <Heading fontSize={'4xl'} textAlign={'center'}>
                                        Sign up as Alumni
                                    </Heading>
                                </Stack>
                                }
                                <Box
                                    rounded={'none'}
                                    bg={"black"}
                                    p={8}
                                    border={"2px"}
                                >
                                    <Stack spacing={4}>
                                        <HStack>
                                            <Field name="name" >
                                                {({ field }) => (
                                                    <FormControl id="name" isRequired >
                                                        <FormLabel>Name</FormLabel>
                                                        <Input type="text" {...field} border={"1px"} rounded="none" bgColor={'whiteAlpha.500'} />
                                                    </FormControl>
                                                )}
                                            </Field>

                                            <Field name="rollNumber" validate={validateRoll}>
                                                {({ field }) => (
                                                    <FormControl id="rollNumber" isRequired>
                                                        <FormLabel>Roll Number</FormLabel>
                                                        <Input
                                                            type="text"
                                                            {...field}
                                                            value={field.value}
                                                            border="1px"
                                                            rounded="none"
                                                            bgColor={'whiteAlpha.500'}
                                                        />
                                                    </FormControl>
                                                )}
                                            </Field>

                                        </HStack>
                                        <Field name="email" validate={validateEmail}>
                                            {({ field, form }) => (
                                                <FormControl id="email" isInvalid={form.errors.email && form.touched.email} isRequired>
                                                    <FormLabel>Email address</FormLabel>
                                                    <Input type="email" {...field} border={"1px"} rounded="none" bgColor={'whiteAlpha.500'}/>
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
                                                            bgColor={'whiteAlpha.500'}
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
                                                            bgColor={'whiteAlpha.500'}
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
                                                        <Input type="phoneNumber" {...field} border={"1px"} rounded="none" bgColor={'whiteAlpha.500'}/>
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
                                            bg={'red'}
                                            color={'white'}
                                            _hover={{
                                                bg: 'yellow.400',
                                            }}
                                            py={1}
                                            alignItems="center"
                                            type="button"
                                            as={motion.button}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => {
                                                // Prevent form submission
                                                e.preventDefault();
                                                // Call the function to handle Get OTP
                                                handleGetOtp(values, {});
                                            }}
                                            >
                                            Get OTP
                                        </Button>
                                            <Field name="otp" justifyContent={'center'}>
                                                {({ field, form }) => (
                                                    <FormControl id="otp" isInvalid={form.errors.Otp && form.touched.Otp}>
                                                    <Input type="text" {...field} border={"2px"} rounded="none" py={4} width={'30'} bgColor={'whiteAlpha.500'}  />
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
                                                bg={'red'}
                                                color={'white'}
                                                _hover={{
                                                    bg: 'red',
                                                }}
                                                alignItems="center"
                                                type="submit"
                                                as={motion.button}
                                                whileTap={{ scale: 0.9 }}
                                                isLoading={isSubmitting}
                                                onClick={(e) => {
                                                    // Prevent form submission
                                                    e.preventDefault();
                                                    // Call the function to handle Get OTP
                                                    handleSubmit(values, {});
                                                }}
                                            >
                                                Sign up
                                            </Button>
                                        </Stack>
                                        <Stack pt={2}>
                                            <Text align={'center'}>
                                                Already a user? <Link color={'#DC35AA'} as={ReactRouterLink} to={'/login'}>Login</Link>
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

export default Alumni_Signup;