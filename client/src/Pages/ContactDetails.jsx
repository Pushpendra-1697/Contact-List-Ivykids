import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import DetailCard from '../Components/DetailCard';
import { useDispatch, useSelector } from 'react-redux';
import { BiLoaderCircle } from "react-icons/bi";
import { Alert, AlertIcon } from '@chakra-ui/react';
import { getContacts } from '../redux/Contact/contact.action';
import DetailsList from '../Components/DetailsList';

const ContactDetails = () => {
  const { loading, error, contacts } = useSelector((store) => store.contactManager);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  console.log(contacts);

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/login" />
  }
  return (
    <>
      {loading && (
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          {" "}
          <BiLoaderCircle fontSize={"34px"} />{" "}
        </Box>
      )}
      {error && <Box display={"flex"} justifyContent="center" alignItems={"center"}>
        <Alert status='error' w="300px" >
          <AlertIcon />
          {`Something went Wrong 😒`}
        </Alert>
      </Box>}

      {/* Detail Form */}
      <DetailCard />

      {/* Details-List */}
      <DetailsList contacts={contacts} />

    </>
  )
}

export default ContactDetails