import { Box, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { addContact } from '../redux/Contact/contact.action';

const initialState = {
    name: '',
    phone: '',
    address: ''
};
const DetailCard = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        var { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addContact(formData));
        setFormData({
            name: '',
            phone: '',
            address: ''
        });
    };

    const { name, phone, address } = formData;
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <form onSubmit={handleSubmit} style={{ display: "table", width: "300px" }}>
                <Input type='text' name='name' value={name} placeholder='Enter Name' onChange={handleChange} />
                <Input type='tel' maxLength={"10"} name='phone' value={phone} placeholder='Enter Phone No.' onChange={handleChange} />
                <Input type='text' name='address' value={address} placeholder='Enter Address' onChange={handleChange} />
                <Input bg='blue' color={'white'} type='submit' value={"Add Contact"} />
            </form>
        </Box>
    );
}

export default DetailCard;