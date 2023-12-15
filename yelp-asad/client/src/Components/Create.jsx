import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
function Create() {
    const [name,setName] = useState("")
    const token = useParams();
    const navigate = useNavigate()
    const headers = {
        Authorization: token.token
      }
    const next =()=> {
        try {
            axios
            .post("https://yelp-backend-1.onrender.com/post",{
                title:name
            },{headers}).then((res) => {
                console.log(res);
                navigate(`/home/${token.token}`)
            }).catch((e) => {
                console.log(e);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='form-wrape'>
            <h3>Create restaraunt</h3>
            <form>
                <label>
                    <input type="text" placeholder='Restaraunt name' onChange={(e) => setName(e.target.value)} />
                </label>
            </form>
            <button onClick={next}>Next</button>
        </div>
    )
}

export default Create