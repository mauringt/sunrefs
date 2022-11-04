import { Image } from "@react-three/drei";

export default function Ground() {
  // const compassUrl =
  //   "https://media.istockphoto.com/vectors/compass-icon-on-white-background-vector-id1051381666?k=20&m=1051381666&s=612x612&w=0&h=mWRX37HFxb6rOc7V-U_2U1g1m_-2dxG7pOKchGAo8Rs=";
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" transparent opacity={0.4} />
        {/* <Image url={compassUrl} position={[-4, -4, 0.01]} scale={[2, 2, 2]} /> */}
      </mesh>
    </>
  )
}