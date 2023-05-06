import { Box, Button, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import DetailCard from '../Components/DetailCard';
import { useDispatch, useSelector } from 'react-redux';
import { BiLoaderCircle } from "react-icons/bi";
import { Alert, AlertIcon } from '@chakra-ui/react';
import { getContacts } from '../redux/Contact/contact.action';
import DetailsList from '../Components/DetailsList';


var totalPages = 5;
const ContactDetails = () => {
  const { loading, error, contacts } = useSelector((store) => store.contactManager);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [contactName, setContactName] = useState('');

  useEffect(() => {
    dispatch(getContacts(page, contactName));
  }, [page, contactName]);

  const handlePage = (val) => {
    let value = val + page;
    setPage(value);
  };


  if (localStorage.getItem('token') === null) {
    return <Navigate to="/login" />
  };
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


      {/* Filter By User Name */}
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mb='1%'>
        <Input color={'green'} w={["200px", "200px", "240px"]} placeholder={"Enter Contact Name..."} value={contactName} onChange={(e) => setContactName(e.target.value)} />
      </Box>



      {/* Details-List */}
      <DetailsList contacts={contacts} />


      {/* Pagination */}
      <Box display={"flex"} alignItems="center" justifyContent={"center"} m="3% 0" gap={"5px"}>
        <Button variant={"outline"} color="green" isDisabled={page <= 1} onClick={() => handlePage(-1)}>◀️PRE</Button>
        <Button variant={"outline"} color="red" isDisabled={true}>{page}</Button>
        <Button variant={"outline"} color="green" isDisabled={page >= totalPages} onClick={() => handlePage(1)}>NEXT▶️</Button>
      </Box>

    </>
  );
}

export default ContactDetails;