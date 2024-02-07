// Cordinates.js

import React from 'react';
import { useAtom } from 'jotai';
import { charactersAtom } from '../Socketmanager';
import { socket } from '../Socketmanager';
import Player from '../Player';
import Player2 from '../Player2';
import { useGLTF } from '@react-three/drei';
import { Her } from '../Models/Her';

const Cordinates = () => {

  const model = useGLTF('./model.gltf');

  //----------
  console.log(`my socket id ${socket.id}`);
  const [characters] = useAtom(charactersAtom);
  console.log(characters.length);


  characters.map((char) => {

    console.log(char.position);
    console.log(char.delta);

  })

  return (
    <>
      {characters.map((character) =>{
      if(character.id === socket.id){

       return <Player key={character.id} id={character.id} delta={character.delta} rotation={character.rotation} position={character.position} />
      }else{
        // return <Player2 key={character.id} id={character.id} delta={character.delta} rotation={character.rotation} position={character.position} />

        return (
        <Her  position={[character.position[0],character.position[1],character.position[2]]} scale={ 1.5 }
           rotation={[0, character.rotation[0], 0]}  />
      //     <mesh castShadow position={[character.position[0],character.position[1],character.position[2]]} scale={ 1.5 }
      //     rotation={[0, character.rotation[0], 0]}  // Set the rotation property
          
      //     >
      //     <boxGeometry />
      //     <meshStandardMaterial color="mediumpurple" />
      // </mesh>

      //  <Player2 key={character.id} id={character.id} delta={character.delta} rotation={character.rotation} position={character.position} />
      // <primitive object={model.scene} scale={2} position={[character.position[0],character.position[1],character.position[2]]}  castShadow={true} />

        )
      }
}
      )}
    </>
  );
};

export default Cordinates;
