import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button, useDisclosure, ModalFooter, Stack, FormLabel, FormControl, Input, Box, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Modal, Flex, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deleteContact, updateContact } from '../redux/Contact/contact.action';
import { AiOutlineUserAdd, AiOutlinePhone } from 'react-icons/ai';
import {FcAddressBook} from 'react-icons/fc';
import { Icon } from '@chakra-ui/icons';

const DetailsList = ({ contacts }) => {
    const [id, setID] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [state, setState] = useState({
        name: "",
        phone: "",
        address: ""
    });
    const dispatch = useDispatch();

    const handleRemove = (_id) => {
        dispatch(deleteContact(_id));
    };

    const handleUpdate = (id) => {
        setID(id);
        onOpen();
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setState({ ...state, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateContact(id, state));
        setState({ name: "", phone: "", address: "" });
    };

    const { name, address, phone } = state;
    return (
        <>
            <TableContainer mt={["15%", "15%", "0%"]}>
                <Table size='sm' variant={"striped"}>
                    <Thead>
                        <Tr>
                            <Th>Name <Icon fontSize={'23px'} as={AiOutlineUserAdd} /></Th>
                            <Th>Address <Icon fontSize={'23px'} as={FcAddressBook} /></Th>
                            <Th>Phone No. <Icon fontSize={'23px'} as={AiOutlinePhone} /></Th>
                            <Th>CreatedAt</Th>
                            <Th>UpdatedAt</Th>
                            <Th>Edit</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {contacts && contacts.map((ele, index) =>
                            <Tr key={ele._id}>
                                <Td>{ele.name}</Td>
                                <Td>{ele.address}</Td>
                                <Td>{ele.phone}</Td>
                                <Td>{ele.createdAt}</Td>
                                <Td>{ele.updatedAt}</Td>
                                <Td><Button variant={"outline"} color={"green"} onClick={() => handleUpdate(ele._id)}><AiOutlineEdit /></Button></Td>
                                <Td><Button variant={"outline"} color={"red"} onClick={() => handleRemove(ele._id)}><AiFillDelete /></Button></Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>



            <Box>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Contact Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box>
                                <Flex minH={"0vh"} align={"center"} justify={"center"} bg="#F1F6F5">
                                    <Stack spacing={8} mx={"auto"} maxW={{ base: "lg", sm: "sm", lg: "lg", xl: "lg", "2xl": "lg" }} py={12} px={6}>
                                        <Box
                                            rounded={"lg"}
                                            bg={useColorModeValue("white", "gray.700")}
                                            boxShadow={"lg"}
                                            p={8}
                                        >
                                            <Stack spacing={4}>
                                                <FormControl id="firstName">
                                                    <FormLabel>Name</FormLabel>
                                                    <Input
                                                        name='name'
                                                        value={name}
                                                        type="text"
                                                        placeholder="Name"
                                                        onChange={handleChange}
                                                    />
                                                </FormControl>

                                                <FormControl id="address">
                                                    <FormLabel>Address</FormLabel>
                                                    <Input
                                                        value={address}
                                                        name="address"
                                                        placeholder="Address"
                                                        type="text"
                                                        onChange={handleChange}
                                                    />
                                                </FormControl>

                                                <FormControl id="phone">
                                                    <FormLabel>Phone No.</FormLabel>
                                                    <Input
                                                        value={phone}
                                                        name="phone"
                                                        placeholder="Phone"
                                                        type="tel"
                                                        onChange={handleChange}
                                                        maxLength={"10"}
                                                    />
                                                </FormControl>
                                                <Stack spacing={10} pt={2}>
                                                    <Button
                                                        fontWeight="600"
                                                        bgColor="black"
                                                        size="lg"
                                                        color="white"
                                                        borderRadius="0"
                                                        _hover={{
                                                            bg: "cyan.500"
                                                        }}
                                                        onClick={handleSubmit}
                                                    >
                                                        Update Contact
                                                    </Button>
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Flex>
                            </Box>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>

        </>
    )
}

export default DetailsList;