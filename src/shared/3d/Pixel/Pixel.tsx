import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useEffect, forwardRef } from 'react';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Frame_Frame_0: THREE.Mesh;
    Frame_CamModuleBlack_0: THREE.Mesh;
    Frame_CamModule_0: THREE.Mesh;
    Frame_Mic_0: THREE.Mesh;
    Frame_Antennas_0: THREE.Mesh;
    Frame_CamGlass_0: THREE.Mesh;
    Screen_Screen_0: THREE.Mesh;
    ['BackBody_Back(top)_0']: THREE.Mesh;
    ['BackBody_Back(Bottom_0']: THREE.Mesh;
    CircleCam_CamGray_0: THREE.Mesh;
    Sensor2_Sensor_0: THREE.Mesh;
    RecCam_CamGray_0: THREE.Mesh;
    RecCam_CamGlass_0: THREE.Mesh;
    Sensor_Sensor001_0: THREE.Mesh;
    Flash_Flash_0: THREE.Mesh;
    Mic_Mic2_0: THREE.Mesh;
    Mic_Mic_0: THREE.Mesh;
    Frontcam_CamGray_0: THREE.Mesh;
    Frontcam_CamGlass_0: THREE.Mesh;
    Bezel_Bezel_0: THREE.Mesh;
    Bezel_Mic_0: THREE.Mesh;
    Buttons_Frame_0: THREE.Mesh;
    Lens3_Lens_0: THREE.Mesh;
    CircleCam2_CamGray_0: THREE.Mesh;
    Lens1_Lens_0: THREE.Mesh;
    Lens2_Lens_0: THREE.Mesh;
    Lens_Lens_0: THREE.Mesh;
    BackBody001_Logo_0: THREE.Mesh;
  };
  materials: {
    Frame: THREE.MeshStandardMaterial;
    CamModuleBlack: THREE.MeshStandardMaterial;
    CamModule: THREE.MeshStandardMaterial;
    material: THREE.MeshStandardMaterial;
    Antennas: THREE.MeshStandardMaterial;
    CamGlass: THREE.MeshStandardMaterial;
    Screen: THREE.MeshStandardMaterial;
    Backtop: THREE.MeshStandardMaterial;
    BackBottom: THREE.MeshStandardMaterial;
    CamGray: THREE.MeshStandardMaterial;
    Sensor: THREE.MeshStandardMaterial;
    ['Sensor.001']: THREE.MeshStandardMaterial;
    Flash: THREE.MeshStandardMaterial;
    Mic2: THREE.MeshStandardMaterial;
    Bezel: THREE.MeshStandardMaterial;
    Lens: THREE.MeshStandardMaterial;
    Logo: THREE.MeshStandardMaterial;
  };
};

interface PixelProps {
  screenshot?: string;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  velocity?: [number, number, number];
  rotationSpeed?: [number, number, number];
}

export const Pixel = forwardRef<THREE.Group, PixelProps>(
  (
    {
      screenshot = '/screenshots/pixel_screen.jpg',
      position = [0, 0, 0],
      scale = 2,
      rotation = [0, -Math.PI / 6, 0],
      ...props
    },
    ref,
  ) => {
    const gltf = useGLTF('/3d/Pixel/scene.gltf');
    const { nodes, materials } = gltf as unknown as GLTFResult;

    useEffect(() => {
      if (materials.Screen) {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
          screenshot,
          (screenTexture) => {
            console.log('Texture applied to Screen:', screenshot);
            screenTexture.anisotropy = 16;
            screenTexture.colorSpace = THREE.SRGBColorSpace;
            screenTexture.repeat.set(1, 1);
            screenTexture.offset.set(0, 0);
            materials.Screen.map = screenTexture;
            materials.Screen.emissiveMap = screenTexture;
            materials.Screen.emissive = new THREE.Color(0, 0, 0);
            materials.Screen.emissiveIntensity = 0;
            materials.Screen.metalness = 0;
            materials.Screen.roughness = 0.8;
            materials.Screen.needsUpdate = true;

            if (materials.CamGlass) {
              const glassMaterial = new THREE.MeshPhysicalMaterial({
                transparent: true,
                opacity: 0.85,
                metalness: 0,
                roughness: 0.05,
                transmission: 1.0,
                thickness: 0.02,
                ior: 1.5,
                envMapIntensity: 0.3,
              });
              materials.CamGlass = glassMaterial;
              materials.CamGlass.needsUpdate = true;
            }
          },
          undefined,
          (error) => {
            console.error(
              'Failed to load texture:',
              screenshot,
              error,
            );
          },
        );
      }

      return () => {
        if (materials.Screen) {
          if (materials.Screen.map) {
            materials.Screen.map.dispose();
            materials.Screen.map = null;
          }
          if (materials.Screen.emissiveMap) {
            materials.Screen.emissiveMap.dispose();
            materials.Screen.emissiveMap = null;
          }
          materials.Screen.emissive = new THREE.Color(0, 0, 0);
          materials.Screen.emissiveIntensity = 0;
          materials.Screen.needsUpdate = true;
        }
        if (materials.CamGlass) {
          materials.CamGlass.dispose();
        }
      };
    }, [screenshot, materials]);

    return (
      <group
        ref={ref}
        position={position}
        rotation={rotation}
        scale={scale}
        {...props}
        dispose={null}
      >
        <group scale={0.5}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frame_Frame_0.geometry}
            material={materials.Frame}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frame_CamModuleBlack_0.geometry}
            material={materials.CamModuleBlack}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frame_CamModule_0.geometry}
            material={materials.CamModule}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frame_Mic_0.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frame_Antennas_0.geometry}
            material={materials.Antennas}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frame_CamGlass_0.geometry}
            material={materials.CamGlass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Screen_Screen_0.geometry}
            material={materials.Screen}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['BackBody_Back(top)_0'].geometry}
            material={materials.Backtop}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['BackBody_Back(Bottom_0'].geometry}
            material={materials.BackBottom}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.CircleCam_CamGray_0.geometry}
            material={materials.CamGray}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sensor2_Sensor_0.geometry}
            material={materials.Sensor}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RecCam_CamGray_0.geometry}
            material={materials.CamGray}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.RecCam_CamGlass_0.geometry}
            material={materials.CamGlass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sensor_Sensor001_0.geometry}
            material={materials['Sensor.001']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flash_Flash_0.geometry}
            material={materials.Flash}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mic_Mic2_0.geometry}
            material={materials.Mic2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Mic_Mic_0.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frontcam_CamGray_0.geometry}
            material={materials.CamGray}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frontcam_CamGlass_0.geometry}
            material={materials.CamGlass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bezel_Bezel_0.geometry}
            material={materials.Bezel}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Bezel_Mic_0.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Buttons_Frame_0.geometry}
            material={materials.Frame}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lens3_Lens_0.geometry}
            material={materials.Lens}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.CircleCam2_CamGray_0.geometry}
            material={materials.CamGray}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lens1_Lens_0.geometry}
            material={materials.Lens}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lens2_Lens_0.geometry}
            material={materials.Lens}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lens_Lens_0.geometry}
            material={materials.Lens}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.BackBody001_Logo_0.geometry}
            material={materials.Logo}
          />
        </group>
      </group>
    );
  },
);

useGLTF.preload('/3d/Pixel/scene.gltf');
