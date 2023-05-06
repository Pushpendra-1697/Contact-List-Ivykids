import { Box, Button, Heading, Img } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box textAlign={"center"} display="flex" justifyContent={"center"} alignItems="center" flexDirection={"column"}>
      <Heading mb="10px">Welcome in Contact-Listing App</Heading>
      <Img mb='2%' height={"400px"} w="550px" src='https://www.shutterstock.com/shutterstock/photos/1754751668/display_1500/stock-vector-contact-list-webpage-template-list-of-contacts-on-the-phone-screen-flat-style-1754751668.jpg' alt='Contacts profile' />
      <Link to='/register'><Button variant={'outline'} color={'white'} bg='black'>Get Started</Button></Link>
    </Box>
  );
}

export default Home;