// import * as THREE from "three";
import React, { StrictMode, useRef, useState, Suspense, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Stats, OrbitControls, Environment } from '@react-three/drei'
import { PerspectiveCamera } from '@react-three/drei'

import { Model1} from './SphereUV1'
import { Model2 } from './SphereUV2'
import { Model3 } from './SphereUV3'

import './styles.css'
import gif1 from './gif1.gif'
import gif3 from './gif2.gif'
import gif2 from './gif3.gif'


export default function App() {
    const [show3D, setShow3D] = useState(true); 

    return (
        <>
        <Canvas >
             <PerspectiveCamera
                // scale={6}
                position={[0, 0, 1]}
                // projectionMatrix={[75, 2, 1, 10000]}
                near={0.7}
                far={1.1} // even tried to set it like this
                makeDefault // tried with/without this line
            />
            <ambientLight intensity={5} />
            <directionalLight
                // intensity={Math.PI}
                position={[0, 4, 0]}
                castShadow={true}
            />

             {show3D && (
                <>
                    <Model2 scale={0.11} position={[0.5, 0.05, 0]} />
                    <Model1 scale={0.11} position={[0, 0.05, 0]} />
                    <Model3 scale={0.11} position={[-0.5, 0.05, 0]} />
                </>
                )}
        </Canvas>

        {!show3D && (
            <div className='gifBox'>
            <img src={gif1} alt="loading..." className='gif' />
            <img src={gif2} alt="loading2..." className='gif' style={{paddingLeft:'60%'}} />
            <img src={gif3} alt="loading2..." className='gif' style={{paddingRight:'60%'}} />
            </div>
        )}

        <div className="card">
            <button autoFocus style={{marginRight: "2%"}} id="highlight" 
            onClick={() => setShow3D(true) } // Show 3D models
            >
            3D
            </button>

            <button style={{marginLeft: "3%"}} id="highlight" 
           onClick={() => setShow3D(false)} // Hide 3D models
            >
            2D
            </button>
        </div>
      </>
    )
}

