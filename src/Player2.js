import { RigidBody } from '@react-three/rapier'
import React from 'react'

import { KeyboardControls, useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useState } from 'react'
//i could have used usethree instead of this old fashioned way
const Player2 = () => {
    const body = useRef();
    const [smoothCamera] = useState(new THREE.Vector3());
    const [subscribekeys,getkeys] = useKeyboardControls();
    useFrame((state,delta)=>{

const {forward,left,right,jump,back} = getkeys();
const impulse = {x:0,y:0,z:0}
const torque ={x:0,y:0,z:0}
const  impulseStrength = delta;

if(forward){
    impulse.z = -1;
}
if(back){
impulse.z =+1;
}
if(right){
impulse.x =+1;
}
if(left){
impulse.x=-1;
}
if(jump){
impulse.y=+5;
}
body.current.applyImpulse(impulse);
//   if (left) {
//     torque.y = 1;
//   } else if (right) {
//     torque.y = -1;
  
//   body.current.applyTorqueImpulse(torque);


// console.log(keys);

/** Camera */
// const bodyposition = body.current.translation();
// console.log(bodyposition)
// const cameraposition = new THREE.Vector3();
// cameraposition.copy(bodyposition);
// cameraposition.z += 10;
// cameraposition.y+=5;

// const cameraTarget = new THREE.Vector3();

// cameraTarget.copy(bodyposition);
// cameraTarget.y+=2.25;

// state.camera.position.copy(cameraposition);
// state.camera.lookAt(cameraTarget);
// body.current.applyTorqueImpulse(t);

const bodyposition = body.current.translation();
const cameraPosition = new THREE.Vector3();
cameraPosition.copy(bodyposition);
cameraPosition.z += 2.25;
cameraPosition.y += 0.65;
const TargetPosition = new THREE.Vector3();
TargetPosition.copy(bodyposition)
TargetPosition.y += 0.25;
smoothCamera.lerp(cameraPosition, 0.1);
// state.camera.position.copy(smoothCamera)
// state.camera.lookAt(TargetPosition)
console.log(bodyposition)


    })
  return (
    <>
    <RigidBody colliders="hull" restitution={0.2} friction={0}  ref={body} linearDamping={0.5} >

<mesh castShadow position-x={5}  position-y={10} >
<meshStandardMaterial flatShading color="pink" />
<sphereGeometry args={[1]} />

</mesh>

    </RigidBody>
    
    </>
  )
}

export default Player2