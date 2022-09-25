import React, { useState} from 'react'
import { useNavigate} from 'react-router-dom'


export default function Home({socket}) {

    const navigate = useNavigate();
    const [userName,setUserName]= useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName',userName);
        socket.emit('newUser',{ userName, socketID:socket.id})
        navigate('/chat');

    }
  return (
    <form className='home__container' onSubmit={handleSubmit}>
        <h2 className="home__header">
            Sign in to Open Chat
        </h2>
        <label htmlFor="username">
            Username
        </label>
        <input 
        type="text"
        minLength={6}
        name="username"
        className="username__input"
        value={userName}
        onChange={(e)=> setUserName(e.target.value)}
        />
        <div>Home</div>
        <button className='home__cta'>
            SIGN IN
        </button>
    </form>
    
  )
}
