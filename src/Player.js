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
// import { updateCamera } from '@react-three/fiber/dist/declarations/src/core/utils'

//imma use this 



const Player = () => {

/**
 * 
 * 
 * 
 *    TESTING?
 * 
 * 
 */
let walkdirection =new THREE.Vector3();
let rotateangle =new THREE.Vector3(0,1,0);
let rotateQuaternion = new THREE.Quaternion();
let CameraTarget = new THREE.Vector3();
const controlsRef = useRef();


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


    //imma use that

    const directionoffest = ({forward,back,left,right})=>{
        var dirOffest =0;
        if(forward){
            if(left){
dirOffest = Math.PI/4;
            }else if(right){
dirOffest = -Math.PI/4;
            }
        }else if(back){
            if(left){
                dirOffest = Math.PI/4 +Math.PI/2;
            }else if(right){
                dirOffest = Math.PI/4 -Math.PI/2;

            }else{
dirOffest = Math.PI;
            }
        }else if (left){
            dirOffest = Math.PI/2;

        }else if (right){
            dirOffest = -Math.PI/2;

        }

return dirOffest;   



    }
    useFrame((state,delta)=>{

        const {forward,left,right,jump,back} = getkeys();
        const impulse = {x:0,y:0,z:0}
        const torque ={x:0,y:0,z:0}
        const  impulseStrength = delta;
        
        // if(forward){
        //     impulse.z = -1;
        // }
        // if(back){
        // impulse.z =+1;
        // }
        // if(right){
        // impulse.x =+1;
        // }
        // if(left){
        // impulse.x=-1;
        // }
        // if(jump){
        // impulse.y=+5;
        // }
        // body.current.applyImpulse(impulse);
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
        
        const bodyposition = body.current.position;
        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(bodyposition);
        cameraPosition.z += 5.25;
        cameraPosition.y += 2.65;
        const TargetPosition = new THREE.Vector3();
        TargetPosition.copy(bodyposition)
        TargetPosition.y += 0.25;
        smoothCamera.lerp(cameraPosition, 0.1);
        // state.camera.position.copy(smoothCamera)
        // state.camera.lookAt(TargetPosition)
        console.log(bodyposition)
        const cameraRotation = state.camera.rotation;
        // body.current.rotation(0, cameraRotation.y, 0);
        // body.current.rotation(state.camera.rotation);
        // console.log(state.camera.rotation);
        // console.log(body.current.rotation());

        /** */

        let AngleYcameraDirection = Math.atan2(
            state.camera.position.x - body.current.position.x,
            state.camera.position.z - body.current.position.z
        )

        //offset
        let newdirOffset = directionoffest({forward,back,left,right});  

console.log("newdirection offset ",newdirOffset);   
        // const axis = new THREE.Vector3(0, 1, 0);
        //* rotating the model
        rotateQuaternion.setFromAxisAngle(
            rotateangle,AngleYcameraDirection+newdirOffset
        )
        console.log(body.current);

        body.current.quaternion.rotateTowards(rotateQuaternion,0.2);
        // body.current.setRotation(rotateQuaternion);
        
        //will it work
         state.camera.getWorldDirection(walkdirection);
         walkdirection.y=0;
         walkdirection.normalize();
         walkdirection.applyAxisAngle(rotateangle,newdirOffset);
         
         //walk run velocity
          const velocity= 5;
          //MOVE MODELS

          const movex = walkdirection.x*velocity*delta;
          const movez = walkdirection.z*velocity*delta;
          body.current.position.x +=movex;
          body.current.position.z+=movez;

          
        //   body.current.setTranslation( new THREE.Vector3(movex,0,movez));

          //camera is more important
          state.camera.position.x += movex;
          state.camera.position.z += movez;
// updateCamera()
CameraTarget.x = body.current.position.x;
CameraTarget.y = body.current.position.y +2;
CameraTarget.z = body.current.position.z;
if(controlsRef.current){
    controlsRef.current.target = CameraTarget;
}

            })


  return (
    <>
    <OrbitControls ref={controlsRef}   />
    {/* <RigidBody colliders="cuboid"  type='kinematic' restitution={0.2} friction={0} ref={body} > */}
        <primitive object={hamburger.scene} scale={0.2} ref={body} />
       
    {/* </RigidBody> */}
    </>
  )
}

export default Player