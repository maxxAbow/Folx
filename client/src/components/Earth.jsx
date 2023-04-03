import React, { useEffect, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import '../styles/Home.css'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

function Earth() {

    const gltf = useLoader(GLTFLoader, '/assets/polyImages/earth/scene.gltf')


  return (
    <>

        
        {/* Renders the Earth Image */}
        <primitive object={gltf.scene} />
    </>
  )
}

export default Earth