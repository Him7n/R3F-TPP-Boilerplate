import {  OrbitControls, useGLTF } from '@react-three/drei'

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { RigidBody } from '@react-three/rapier'
import React from 'react'
import { useRef } from 'react'
// port { RigidBody } from '@react-three/rapier'
// import React from 'react'

import { KeyboardControls, useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
// import { useRef } from 'react'
import { useState } from 'react'

const Player = () => {
    const body = useRef();
    const [smoothCamera] = useState(new THREE.Vector3());
    const [subscribekeys,getkeys] = useKeyboardControls();
    const hamburger = useGLTF('./hamburger.glb');
    hamburger.scene.children.forEach((mesh)=>{
        mesh.castShadow = true;
    });

    // const controlRef=useRef<typeof OrbitControls>();

    // const controlsRef = useRef<OrbitControlsProps>()
    // const controlRef = useRef<OrbitControls>(null);
    // const controlRef = useRef<OrbitControls | null>(null);
    // const controlsRef = useRef<any>();
    const camera = useThree((state)=>state.camera)
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
        cameraPosition.z += 5.25;
        cameraPosition.y += 2.65;
        const TargetPosition = new THREE.Vector3();
        TargetPosition.copy(bodyposition)
        TargetPosition.y += 0.25;
        smoothCamera.lerp(cameraPosition, 0.1);
        state.camera.position.copy(smoothCamera)
        // state.camera.lookAt(TargetP osition)
        console.log(bodyposition)
        const cameraRotation = state.camera.rotation;
        // body.current.rotation(0, cameraRotation.y, 0);
        // body.current.rotation(state.camera.rotation);
        console.log(state.camera.rotation);
        console.log(body.current.rotation());

        /** */

        let AngleYcameraDirection = Math.atan2(
            state.camera.position.x - body.current.translation().x,
            state.camera.position.z - body.current.translation().z
        )
            })


  return (
    <>
    <OrbitControls   />
    <RigidBody colliders="cuboid"  type='dynamic' restitution={0.2} friction={0} ref={body} >
        <primitive object={hamburger.scene} scale={0.2}  />
       
    </RigidBody>
    </>
  )
}

export default Player