import React, { useEffect, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import '../styles/Home.css'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

function Earth() {

    const gltf = useLoader(GLTFLoader, '/assets/polyImages/earth/scene.gltf')


  return (
    <>
        {/* Creates camera perspective around the obect, takes arg called position [x-axis,y-axis, z-axis] */}
        <PerspectiveCamera makeDefault  position={[0,0,5]}/>

        {/* Ambien light illuminates the model, 2 args; light color and intensity */}
        <ambientLight args={["#ffffff",.5]} />
        <directionalLight position={[1, -1, 1]} />
        
        {/* Renders the Earth Image */}
        <primitive object={gltf.scene} />
    </>
  )
}

export default Earth