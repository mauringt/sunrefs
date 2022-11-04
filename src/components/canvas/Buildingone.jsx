import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const Buildingone = () => {
  const mesh = useRef(null)
  const mesh2 = useRef(null)

  useFrame((state, delta) =>
    mesh.current
      ? (mesh.current.rotation.z -= 0.002)
      : null
  )
  useFrame((state, delta) =>
    mesh2.current
      ? (mesh2.current.rotation.z -= 0.003)
      : null
  )

  return (
    <>
      <group
        // ref={mesh}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh
          receiveShadow
          castShadow
          // rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.25, 0]}
        >
          <boxGeometry attach="geometry" args={[4, 1, 1]} />
          <meshStandardMaterial attach="material" />
        </mesh>
        <mesh
          // ref={mesh2}
          receiveShadow
          castShadow
          // rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 1.25, 0]}
        >
          <boxGeometry attach="geometry" args={[4, 1, 1]} />
          <meshStandardMaterial attach="material" color={'red'} />
        </mesh>
      </group>
    </>
  )
}

export default Buildingone
