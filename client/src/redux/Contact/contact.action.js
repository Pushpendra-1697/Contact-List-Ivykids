import axios from "axios";
import { backend_url } from '../../Pages/BackendURL';
import { ADD_CONTACT, CONTACT_ERROR, CONTACT_LOADING, CONTACT_SUCCESS, REMOVE_CONTACT, UPDATE_CONTACT } from "./contact.type";

export const getContacts = () => async (dispatch) => {
    dispatch({ type: CONTACT_LOADING });
    try {
        let res = await axios.get(`${backend_url}/contact/get`, { headers: { user_id: localStorage.getItem('user_id') } });
        dispatch({ type: CONTACT_SUCCESS, payload: res.data });
    } catch (e) {
        dispatch({ type: CONTACT_ERROR, payload: e.message });
    }
};

export const addContact = (message) => async (dispatch) => {
    dispatch({ type: CONTACT_LOADING });
    try {
        let res = await axios.post(`${backend_url}/contact/post`, message, { headers: { user_id: localStorage.getItem('user_id') } });
        alert(`${res.data.msg}`);
        dispatch({ type: ADD_CONTACT, payload: res.data.contact });
    } catch (e) {
        dispatch({ type: CONTACT_ERROR, payload: e.message });
    }
};

// Note: In post and patch requests always gives object after url of json-server or api url; here message and changes both are objects which comes different-2 files;
export const updateContact = (id, changes) => async (dispatch) => {
    dispatch({ type: CONTACT_LOADING });
    try {
        let res = await axios.patch(`${backend_url}/dashboard/patch/${id}`, {
            ...changes
        }, { headers: { user_id: localStorage.getItem('user_id') } });
        dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (e) {
        dispatch({ type: CONTACT_ERROR, payload: e.message });
    }
};

export const deleteContact = (id) => async (dispatch) => {
    dispatch({ type: CONTACT_LOADING });
    try {
        let res = await axios.delete(`${backend_url}/dashboard/delete/${id}`, { headers: { user_id: localStorage.getItem('user_id') } });
        dispatch({ type: REMOVE_CONTACT, payload: res.data._id });
    } catch (e) {
        dispatch({ type: CONTACT_ERROR, payload: e.message });
    }
};