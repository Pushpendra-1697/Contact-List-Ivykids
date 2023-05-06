import { ADD_CONTACT, CONTACT_ERROR, CONTACT_LOADING, CONTACT_SUCCESS, REMOVE_CONTACT, UPDATE_CONTACT } from "./contact.type";

const initialState = {
    contacts: [],
    error: false,
    loading: false
};
export const ContactReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_CONTACT: {
            return {
                ...state,
                loading: false,
                contacts: [...state.contacts, payload]
            }
        }
        case CONTACT_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case CONTACT_ERROR: {
            return {
                ...state,
                loading: false,
                error: payload || true
            }
        }
        case CONTACT_SUCCESS: {
            return {
                ...state,
                loading: false,
                contacts: payload
            }
        }
        case UPDATE_CONTACT: {
            const updatedContact = state.contacts.map((ele) => {
                if (ele._id === payload._id) {
                    return {
                        ...ele,
                        ...payload
                    }
                }
                return ele;
            })
            return {
                ...state,
                loading: false,
                contacts: updatedContact
            }
        }
        case REMOVE_CONTACT: {
            let filteredContacts = state.contacts.filter(
                (ele) => ele._id !== payload
            )
            return {
                ...state,
                loading: false,
                contacts: filteredContacts
            }
        }
        default: {
            return state;
        }
    }
}