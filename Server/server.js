import { createServer } from "http";
import { Server } from "socket.io";
// import { socket } from "../src/Socketmanager";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});
io.listen(3001);
const characters =[];
const generateRandomPosition = () => {
  return [Math.random() *3,0,Math.random() *3];
}
io.on("connection", (socket) => {
  console.log("User connected!!" + socket.id)


  // in ject it into the  characters array


// console.log(characters);


  characters.push({
    id: socket.id,
    delta : [0,0,0],
    rotation: 0,
    avatar: 0,
    position: generateRandomPosition(),
  });
  // console.log(characters);
  io.emit("spawn",characters);

//-------

socket.on("rotation",(rotation) => {   
  const character = characters.find((character)=>{ return character.id === socket.id});
  character.rotation = rotation;
  // console.log(characters);
  io.emit("spawn",characters);
})

socket.on("position",(position) => {   
  console.log(characters.length);
  const character = characters.find((character)=>{ return character.id === socket.id});
  character.position= [
    position.x,
    position.y,
    position.z
  ];
  // console.log(characters);
  io.emit("spawn",characters);
})


socket.on("delta",(delta) => {   
  const character = characters.find((character)=>{ return character.id === socket.id});
  character.delta= [
    delta.x,
    delta.y,
    delta.z
  ];
  // console.log(characters);
  io.emit("spawn",characters);
})
//---------

socket.on("disconnect", () => {
  console.log(socket.id + " User disconnected!!");
  const index = characters.findIndex((character) => character.id === socket.id);
  if (index !== -1) {
    characters.splice(index, 1);

    console.log(characters);
    io.emit("spawn", characters);
  }
});



});

