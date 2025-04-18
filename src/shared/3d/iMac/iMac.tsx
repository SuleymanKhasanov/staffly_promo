import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Stand_LightBlue_0: THREE.Mesh;
    Rotate_Metal_0: THREE.Mesh;
    Rotate_Metal2_0: THREE.Mesh;
    Screen_DarkBlue_0: THREE.Mesh;
    Screen_LightBlue_0: THREE.Mesh;
    Screen_Black_0: THREE.Mesh;
    Screen_White_0: THREE.Mesh;
    Screen_Screen_0: THREE.Mesh;
    Screen_Chrome_0: THREE.Mesh;
    Screen_CamBlack_0: THREE.Mesh;
    Screen_Lens_0: THREE.Mesh;
    Screen_Glass_0: THREE.Mesh;
    Screen_Black001_0: THREE.Mesh;
    Screen_Yellow_0: THREE.Mesh;
  };
  materials: {
    LightBlue: THREE.MeshStandardMaterial;
    Metal: THREE.MeshStandardMaterial;
    Metal2: THREE.MeshStandardMaterial;
    DarkBlue: THREE.MeshStandardMaterial;
    Black: THREE.MeshStandardMaterial;
    White: THREE.MeshStandardMaterial;
    Screen: THREE.MeshStandardMaterial;
    Chrome: THREE.MeshStandardMaterial;
    ['Cam.Black']: THREE.MeshStandardMaterial;
    Lens: THREE.MeshStandardMaterial;
    Glass: THREE.MeshStandardMaterial;
    ['Black.001']: THREE.MeshStandardMaterial;
    Yellow: THREE.MeshStandardMaterial;
  };
};

interface IMacProps {
  screenshot?: string;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number]; // Добавлено свойство rotation
}

export const IMac: React.FC<IMacProps> = ({
  screenshot = '/screenshots/screen1mac.jpg',
  position = [0, -14, 0],
  scale = 15,
  rotation = [0, 0, 0], // Значение по умолчанию
  ...props
}) => {
  const gltf = useGLTF('/3d/mac/scene.gltf') as unknown as GLTFResult;
  const { nodes, materials } = gltf;

  useEffect(() => {
    console.log('Available meshes:', Object.keys(nodes));
    console.log('Available materials:', Object.keys(materials));
  }, [nodes, materials]);

  useEffect(() => {
    if (materials.Screen) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        screenshot,
        (screenTexture) => {
          console.log('Texture applied to Screen as map');
          console.log(
            'Texture size:',
            screenTexture.image.width,
            'x',
            screenTexture.image.height,
          );
          screenTexture.anisotropy = 16;
          screenTexture.colorSpace = THREE.SRGBColorSpace;
          screenTexture.repeat.set(1, 1.41);
          screenTexture.offset.set(0, -0.128);
          materials.Screen.map = screenTexture;
          materials.Screen.emissiveMap = null;
          materials.Screen.emissive = new THREE.Color(0, 0, 0);
          materials.Screen.emissiveIntensity = 0;
          materials.Screen.metalness = 0;
          materials.Screen.roughness = 0.8;
          materials.Screen.needsUpdate = true;

          // Настройка стекла
          if (materials.Glass) {
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
            materials.Glass = glassMaterial;
            materials.Glass.needsUpdate = true;
            console.log('Glass material properties:', {
              transparent: materials.Glass.transparent,
              opacity: materials.Glass.opacity,
              metalness: materials.Glass.metalness,
              roughness: materials.Glass.roughness,
              transmission: (
                materials.Glass as THREE.MeshPhysicalMaterial
              ).transmission,
              thickness: (
                materials.Glass as THREE.MeshPhysicalMaterial
              ).thickness,
              ior: (materials.Glass as THREE.MeshPhysicalMaterial)
                .ior,
              envMapIntensity: (
                materials.Glass as THREE.MeshPhysicalMaterial
              ).envMapIntensity,
            });
          }
        },
        undefined,
        (error) => {
          console.error(
            'Failed to load texture for Screen:',
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
      if (materials.Glass) {
        materials.Glass.opacity = 1;
        materials.Glass.needsUpdate = true;
      }
    };
  }, [screenshot, materials]);

  return (
    <group
      position={position}
      rotation={rotation} // Применяем rotation
      dispose={null}
      {...props}
    >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Stand_LightBlue_0.geometry}
          material={materials.LightBlue}
        />
        <group position={[0.032, 0, 0.387]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Rotate_Metal_0.geometry}
            material={materials.Metal}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Rotate_Metal2_0.geometry}
            material={materials.Metal2}
          />
          <group position={[-0.03, 0, -0.387]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Screen_DarkBlue_0.geometry}
              material={materials.DarkBlue}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Screen_LightBlue_0.geometry}
              material={materials.LightBlue}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Screen_Black_0.geometry}
              material={materials.Black}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Screen_White_0.geometry}
              material={materials.White}
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
              geometry={nodes.Screen_Chrome_0.geometry}
              material={materials.Chrome}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Screen_CamBlack_0.geometry}
              material={materials['Cam.Black']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Screen_Lens_0.geometry}
              material={materials.Lens}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Screen_Glass_0.geometry}
              material={materials.Glass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Screen_Black001_0.geometry}
              material={materials['Black.001']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Screen_Yellow_0.geometry}
              material={materials.Yellow}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/3d/mac/scene.gltf');
