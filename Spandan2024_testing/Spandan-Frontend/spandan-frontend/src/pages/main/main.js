import React, { useState } from 'react';
import { Grid, GridItem, Flex, Button, Image, useMediaQuery } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { Link as ReactRouterLink,useNavigate } from "react-router-dom";
import Signup from '../Signup';
import Staff_Signup from '../Staff_Signup';
import Alumni_Signup from '../Alumni_Signup';
import { MdArrowBack } from 'react-icons/md';
import SEOComponent from '../../components/SEO';
const Main = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [isDesktop] = useMediaQuery("(min-width: 1024px)");
  const navigate = useNavigate();
  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  const handleRefresh = () => {
    navigate('/');
  };

  return (<>
    <SEOComponent page_name={'Sign Up'} />
    <div style={{ height: '100vh', width: '100vw' }}>
      <Grid
        h={!isDesktop && selectedButton ? '100%' : '100vh'} // Set height dynamically based on !isDesktop state and selected button
        templateRows={!isDesktop && selectedButton ? '1fr' : 'repeat(2, 1fr)'}
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        {!!isDesktop || !selectedButton ? (
          <GridItem rowSpan={!isDesktop ? 10 : 2} colSpan={!isDesktop ? 20 : 2}>
            <VStack
              spacing={20}
              align='stretch'
              alignItems="center"
            >
              <Flex h='10vh'></Flex>
              <Button colorScheme="white" bgColor='black' fontStyle='akshar' variant="outline" size="xl" onClick={handleRefresh}>
                <MdArrowBack/>
              </Button>
              <Button h='10vh' colorScheme='white' bgColor={'black'} variant='outline' width='300px' fontSize={40} onClick={() => handleButtonClick("Alumni")} borderRadius={0}>
                Alumni
              </Button>

              {/* <Button h='10vh' colorScheme='white' bgColor={'black'} variant='outline' width='300px' fontSize={40} onClick={() => handleButtonClick("Student")}borderRadius={0}>
                Student
              </Button> */}
              {/* <Button h='10vh' colorScheme='white' bgColor={'black'} variant='outline' width='300px' fontSize={40} onClick={() => handleButtonClick("Staff")}borderRadius={0}>
                Staff
              </Button> */}
            </VStack>
          </GridItem>
        ) : null}
        {!!isDesktop && !selectedButton && (
          <GridItem
            rowSpan={1}
            colSpan={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Flex justifyContent="center" alignItems="center" style={{ height: 'calc(100vh)' }}>
              <Image src={"Logo123.png"} style={{ width: 'auto', height: '80%' }} />
            </Flex>
          </GridItem>
        )}
        {!!isDesktop && selectedButton && (
          <GridItem
            rowSpan={1}
            colSpan={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {selectedButton ? (
              <>
                {selectedButton === "Alumni" && <Alumni_Signup />}
                {selectedButton === "Student" && <Signup />}
                {/* {selectedButton === "Staff" && <Staff_Signup />} */}
              </>
            ) : null}
          </GridItem>
        )}
        {!isDesktop && selectedButton === "Alumni" && (
          <GridItem
            rowSpan={1}
            colSpan={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Alumni_Signup />
          </GridItem>
        )}
        {/* {!isDesktop && selectedButton === "Student" && (
          <GridItem
            rowSpan={1}
            colSpan={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Signup />
          </GridItem>
        )} */}
        {/* {!isDesktop && selectedButton === "Staff" && (
          <GridItem
            rowSpan={1}
            colSpan={5}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Staff_Signup />
          </GridItem>
        )} */}
      </Grid>
    </div>
    </>
  )
}

export default Main;