import React, { useEffect, useState } from "react";

export default function ChatBar({socket}) {
    const [users,setUsers]=useState([])
    useEffect(() => {
      socket.on('newUserResponse',(data)=>{
        console.log(data)
        setUsers(data)
      })
    
    }, [socket,users])
    
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4>Active User</h4>
        <div className="chat__users">
        {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
