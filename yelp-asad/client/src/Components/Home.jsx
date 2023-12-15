import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function Home() {
    const token = useParams();
    const navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const headers = {
        Authorization: token.token
      }
    // console.log(token);
    const toCreate = () => {
        try {
            navigate(`/create/${token.token}`)
        } catch (error) {   
            console.log(error);
        }
    }
    useEffect(() => {
        axios
            .get("https://yelp-backend-1.onrender.com/posts", { headers })
            .then((res) => {
                console.log(res);
                setPosts(res.data)
                setLoading(false)
            }).catch((e) => {
                console.log(e);
                setLoading(false)
            })
    }, [token])
    const logout = () => {
        try {
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='home-wrape'>
            <header>
                <div className="logout-panel">
                    <div className="logout-btn" onClick={logout}>
                        Logout
                    </div>
                </div>
                <div className="logo-container">
                    <h1>Asad Yelp</h1>
                </div>
                <div className="create-block">
                    <AddIcon className='icon' onClick={toCreate} />
                </div>
            </header>
            <div className="posts">
                {
                    loading  === true ? (<h1>Loading...</h1>):
                    posts.map((item) => {
                        return (
                            <>
                                <div className="user-post">
                                    <b>{item.user.name}</b>
                                    <p>{item.title}</p>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home