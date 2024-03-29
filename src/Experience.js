import { OrbitControls, PointerLockControls } from '@react-three/drei'
import Lights from './Lights.js'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import Player from './Player.js'
import * as THREE from 'three';
import Player2 from './Player2.js';
import { SocketManager,charactersAtom } from './Socketmanager.js';
import Cordinates from './Utils/Cordinates.js';
import { useAtom } from 'jotai';
THREE.ColorManagement.legacyMode = false;

export default function Experience()
{
    // console.log(`my socket id ${socket.id}`)
    const [characters] = useAtom(charactersAtom);
    // console.log(characters);
    // console.log(characters.length);


    return <>
        {/* <PointerLockControls  /> */}

        {/* <OrbitControls makeDefault /> */}
<Physics debug  gravity={[0, -30, 0]}>
<Cordinates/>

        <Lights />
<RigidBody>
        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>
        </RigidBody>





        {/* <Player/> */}
        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
<RigidBody colliders="cuboid"  type='fixed' restitution={0} friction={0.5} >
        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 80 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>
        </RigidBody>
        <SocketManager/>
        {/* <Player2/> */}
        </Physics>
    


        


    </>
}