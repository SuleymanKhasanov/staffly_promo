import { Canvas } from '@react-three/fiber';
import { IPhone } from '../../../shared/3d/iPhone/iPhone';
import { OrbitControls } from '@react-three/drei';

const IPhoneBox = () => {
  return (
    <div>
      <Canvas
        camera={{ position: [0, 7, 15], fov: 50 }}
        style={{
          height: '100vh',
          width: '100%',
        }}
      >
        <ambientLight intensity={3} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, 10, -10]} intensity={2} />
        <pointLight position={[0, -10, 0]} intensity={2} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={3}
          castShadow
        />
        <IPhone />
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  );
};

export default IPhoneBox;
