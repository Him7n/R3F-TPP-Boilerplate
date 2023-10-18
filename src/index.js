import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'
import { KeyboardControls, Sky } from '@react-three/drei'
import { PointerLockControls } from '@react-three/drei'
const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <KeyboardControls map={[
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'back', keys: ['ArrowDown', 'KeyS'] },
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] },
        { name: 'jump', keys: ['Space'] },
    ]} >
      <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 2.5, 4, 6 ]
        } }
    >
                <Sky sunPosition={[100, 20, 100]} />

        <Experience />
    </Canvas>
    </KeyboardControls>
)