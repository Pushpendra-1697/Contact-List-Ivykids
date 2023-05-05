import React from 'react'
import { Navigate } from 'react-router-dom';

const ContactDetails = () => {
  console.log(localStorage.getItem('user_id'))

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/login" />
  }
  return (
    <div>ContactDetails</div>
  )
}

export default ContactDetails