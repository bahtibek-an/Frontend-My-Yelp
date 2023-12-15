import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Register() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const [err,setErr] = useState("")
    const next = () => {
        try {
            axios
            .post("https://yelp-backend-1.onrender.com/auth/register",{
                name:name,
                email:name,
                password:password
            }).then((res) => {
                console.log(res);
                navigate(`/home/${res.data.token}`)
            }).catch((e) => {
                console.log(e);
                setErr(e.response.data.message)
            })
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {} , [err])
  return (
    <div className='form-wrape'>
        <h3>Register</h3>
        <form>
            <label>
                <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            </label>
        </form>
        <span className='erorr-text'>{err}</span>
        <button onClick={next}>Next</button>
        <p>Do you have account? <Link to={'/login'}>Sing in</Link></p>
    </div>
  )
}

export default Register