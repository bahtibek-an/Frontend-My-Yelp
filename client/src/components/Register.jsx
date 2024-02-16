import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from  '../images/yelp.png'
import { ToastContainer, toast } from 'react-toastify';
import { gql, useMutation } from '@apollo/client'
const REGISTER_USER = gql `
mutation AddUser($name: String!, $email: String!, $password: String!) {
  addUser(user: {
    name: $name
    email: $email
    password: $password
  }) {
    success
    token
    message
  }
}
`
export const Register = () => {
  const [userName, setName] = useState("")
  const [userEmail, setEmail] = useState( "")
  const [userPassword, setPassword] = useState("")

  const navigate = useNavigate()
  const [registerMutation , {loading, error}] = useMutation(REGISTER_USER, {
  })
  if(error){
    console.log(error);
  }
    function handleKey(){
        registerMutation({
          variables:{
            name:userName,
            email:userEmail,
            password:userPassword
          }
        })
        .then((data) => {
          const succes = data.data.addUser.success;
          // const dataUser = data.data.addUser.data;
          const message = data.data.addUser.message;
          // const userName = data.data.addUser.data.name;
          if(userEmail === ""){ 
            navigate('/')
            const alertErorr = toast("Please enter name")
            alert(alertErorr)
            return false
           
          }
          if(!succes){
            alert(message)
            navigate(
              '/register'
            )
            return false
          }else{
            navigate(`/login`)
            alert(message)
            return true
          }
        }).catch((error)=> {
          console.log(error);
        })
    }
  return (
    <div className='login_wrape'>
        <h3 style={{color:'white'}}>Register</h3>
        <form onSubmit={handleKey}>
            <input type="text" placeholder='Your Name' className={userName === ""  ? "erorr" : null} onChange={(e) => setName(e.target.value)}/>
            <span>{userName === "" ? <span className='span-erorr'>Please enter Name</span> : null}</span>
            <input type="email" placeholder='Your email' onChange={(e) => setEmail(e.target.value)} className={userEmail === "" ? "erorr" : null}/>
            <span>{userEmail === "" ? <span className='span-erorr two'>Please enter your E-mail</span> : null}</span>
            <input type="password" placeholder='Youre password'onChange={(e) => setPassword(e.target.value)} className={userPassword === "" ? "erorr" : null || userPassword.length <= 8 ? "erorr" : null} />
            <span>{userPassword === "" ? <span className='span-erorr three'>Please enter password</span>: null ||userPassword.length <= 8 ? <span className='span-erorr three'>E-mail must be 8 characters</span>: null  }</span>
        </form>
        <button className='btn' onClick={handleKey} disabled={loading || userName === "" || userEmail === "" || userPassword === "" || userPassword.length <= 8}>Next</button>
        <div className='bottom_block'>
            Do you have account? <Link to={'/login'}>Login</Link>
        </div>
    </div>
  )
}
