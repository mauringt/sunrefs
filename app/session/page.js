'use client'
import { useEffect, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload, Instances, Instance } from '@react-three/drei'
import { useSearchParams } from 'next/navigation'
import { useSpring, animated } from "@react-spring/three"
import Ground from '../../src/components/canvas/Ground'
import Buildingone from '../../src/components/canvas/Buildingone'
import SunPositions from '../../src/components/canvas/SunPositions'

function Thing() {
  const searchParams = useSearchParams()
  const dursec = searchParams.get('dursec')

  const { position } = useSpring({
    loop: { reverse: true },
    from: { position: [0, 2, 1.5] },
    to: { position: [0, 3, 3] },
    config: { mass: 5, tension: 500, friction: 150, duration: dursec }
  })

  return (
    <animated.mesh position={position} castShadow visible={true}>
      <boxGeometry attach="geometry" args={[1, 1, 4]} />
      <meshNormalMaterial attach="material" />
    </animated.mesh>
  )
}

function DirLight() {
  const searchParams = useSearchParams()
  const dur = searchParams.get('dur')

  const { position } = useSpring({
    loop: { reverse: true },
    from: {position: [5, 5, 5]},
    to: {position: [5, 5, -5]},
    config: { mass: 5, tension: 500, friction: 150, duration: dur }
  })

  return (
      <animated.directionalLight
        castShadow
        position={position}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      >
    </animated.directionalLight>
  )
}

export default function Page() {
  return (
    <Canvas 
      mode='concurrent'
        style={{
          position: 'absolute',
          top: 0,
        }}
      shadows 
      camera={{ position: [8, 2, -5], fov: 70 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />
      <Thing />
      <Buildingone />
      <Berries_s />
      <Ground />
      <DirLight />
      <OrbitControls makeDefault autoRotate autoRotateSpeed={0.25} enablePan={true} enableZoom={true} minPolarAngle={0} maxPolarAngle={Math.PI / 2}  /> 
    </Canvas>
  )
}

function Berries_s({ }) {
  const searchParams = useSearchParams()
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lng')
  const start = searchParams.get('dat')

  // Oleander/Sunset, Bakersfield, CA, USA
  // let lati = 35.361964807551146
  // let loni = -119.01542800174612
  // let starti = "08-21"

  const suns = SunPositions(lat, lon, start)

  let sunArray = []
  sunArray = suns.map(function (x, i) {
  return {position: [suns[i]['x'], suns[i]['y'], suns[i]['z']] }
    }
  ) 
  return (
    <Instances >
      <sphereGeometry args={[.13, 32, 32]} />
      <meshStandardMaterial roughness={1} metalness={.1} color="silver" transparent={true} opacity={.55} visible={true} />
      {sunArray.map((props, i) => (
        <Berry key={i} {...props} />
      ))}
    </Instances>
  )
}

function Berry({ random, ...props }) {
  const ref = useRef()
  useFrame(() => {
  })
  return (
    <group {...props} >
      <Instance ref={ref}  />
    </group>
  )
}
