import React, { useEffect, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

function Earth() {

    const gltf = useLoader(GLTFLoader, '/assets/polyImages/earth/scene.gltf')
    const orbitControlsRef = useRef(null)

    // This useEffect is used to access all of the properties inside of the OrbitControl class
    // useEffect(() => {
    //   console.log(orbitControlsRef.current)
    // })

  return (
    <>
        {/* Creates camera perspective around the object, takes arg called position [x-axis,y-axis, z-axis] */}
        <PerspectiveCamera makeDefault  position={[0,0,5]}/>

        <OrbitControls 
            ref={orbitControlsRef} 
            autoRotate 
            rotateSpeed={5}
            enableZoom={false} 
            enablePan={false}     
            />
        {/* Ambient light illuminates the model, 2 args; light color and intensity */}
        <ambientLight args={["#ffffff",.5]} />
        <directionalLight position={[1, -1, 1]} />
        
        {/* Renders the Earth Image */}
        <primitive object={gltf.scene} />
    </>
  )
}

export default Earth