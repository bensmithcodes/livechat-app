import './App.css';
import io from 'socket.io-client';
import {useState} from "react";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001"); 

function App() {

  const [username, setUsername]= useState("");
  const [room, setRoom]= useState("");
  const [showChat,setShowChat]=useState(false);

  const joinRoom = ()=>{
    if(username !== "" && room !== "" ){
      socket.emit("join_room",room);
      setShowChat(true);
    }

  }

  return  <div className="App"><h3>Begin the chat!</h3>
  <p>Please follow all guidelines when participating in the chat.</p>
  {!showChat?(
  <div className="joinChatContainer">
    <h3>Enter a chat</h3>
  <input 
  type="text" 
  placeholder="Enter username..." 
  onChange={(event)=>
    {setUsername(event.target.value);
    }}
  
  
></input>
  <input type="text" placeholder="Rooom ID:"onChange={(event)=>
    {setRoom(event.target.value);
    }} ></input>
  <button onClick={joinRoom}>Join inside a room.</button>
  </div>
 ):(
   <Chat socket = {socket} username={username} room ={room}/>
   )}  </div>
 }

export default App;
