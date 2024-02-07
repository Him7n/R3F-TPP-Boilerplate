import React, { useEffect } from 'react'
import {useAtom,atom} from 'jotai'



const io = require("socket.io-client");
 export const  socket = io("http://localhost:3001", {
    withCredentials: true,
    
}); 
export const charactersAtom = atom([]);
export const SocketManager = () => {
    const [_characters,setCharacters]= useAtom(charactersAtom);
    // console.log(_characters);
  useEffect(()=>{
    function onConnect(){
        console.log("Connected")
    }
   function onDisconnect(){
    console.log("Disconnected")

   }
   function Spawner(data){
    // console.log("Spawned");
    // console.log(data);
    setCharacters(data);

   }
   
socket.on("connect", onConnect);
socket.on("disconnect", onDisconnect);
socket.on("spawn",Spawner);
return()=>{
socket.off("connect", onConnect);
socket.off("disconnect", onDisconnect);
socket.off("spawn",Spawner);

}

},[])
}

