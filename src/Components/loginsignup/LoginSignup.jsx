import React, { useState } from 'react'
import './LoginSignup.css'

import user_icon from '../assets/person.png' 
import email_icon from '../assets/email.png' 
import password_icon from '../assets/password.png' 

export const LoginSignup = () => {
  const [action,setAction] = useState("Login");
  // To Define Success Message
  const [successMessage, setSuccessMessage] = useState('');

  // Define state variable to hold form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName:'',
    password:'',
    role:'USER'

  });
  // Sending data to server
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('####')
    console.log(JSON.stringify(formData))
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form data submitted successfully!');
        //Success message after submitting
        setSuccessMessage('Form submitted successfully!');
        // Optionally, reset the form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          userName: '',
          password: '',
          role: 'USER',
        });
         // Clear success message after a delay (e.g., 5 seconds)
         setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        console.error('Failed to submit form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }
  };


 // Function to handle changes in the input fields
 const handleInputChange = (event) => {
  const { name, value } = event.target;
   // Update the corresponding state variable based on the input field's name
   setFormData({
    ...formData, // Spread the existing state
    [name]: value // Update the value of the input field being changed
  });
};
  

  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className='container'>
        <div className="header">

        <div className="text">{action}</div>
        <div className="underline"></div>
        </div>
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

        <div className="inputs">
        {
        action==="Login"?<div/>:
        <><div className="input">
              <img src={user_icon} alt="" />
              <input type="text" name="firstName" placeholder='First Name' value={formData.firstName}
          onChange={handleInputChange}/>
              </div><div className="input">
                <img src={user_icon} alt="" />
                <input type="text" name="lastName" placeholder='Last Name'value={formData.lastName}
          onChange={handleInputChange} />
              </div>
              
              </>
        }
        
        <div className="input">
          <img src={user_icon}  alt="" />
          <input type = "text" name="userName" placeholder='User Name'value={formData.userName}
          onChange={handleInputChange}/>
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type= "password" name="password" placeholder='Password' value={formData.password}
          onChange={handleInputChange} />
        </div>
        </div>
        {
        action==="Sign Up"?<div/>:
        <div className="forgot-password">Lost Password ? <span>Click Here </span></div>
        }
        
        <div className="submit-container">
        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>setAction("Sign Up")}>Sign Up</div>
        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>setAction("Login")}>Login</div>
        <button type="submit">Submit</button>
        </div>
    </div>
    </form>
    </>
  )
}
