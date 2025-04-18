import { Canvas } from '@react-three/fiber';
import { IMac } from '../../../shared/3d/iMac/iMac';
import { IPhone } from '../../../shared/3d/iPhone/iPhone';
import { useEffect, useState, useRef } from 'react';
import { useScrollStore } from '../../../shared/store/useScrollStore';

interface IMacBoxProps {
  setTextVisible: (visible: boolean) => void;
  visible: boolean;
}

const IMacBox = ({ setTextVisible, visible }: IMacBoxProps) => {
  // Состояние для iMac
  const [iMacPosition, setIMacPosition] = useState<
    [number, number, number]
  >([2, -14, 0]);
  const [iMacScale, setIMacScale] = useState<number>(15);
  const [iMacRotation, setIMacRotation] = useState<
    [number, number, number]
  >([0, 0, 0]);

  // Состояние для iPhone
  const [iPhonePosition, setIPhonePosition] = useState<
    [number, number, number]
  >([0, -1, -20]);
  const [iPhoneScale, setIPhoneScale] = useState<number>(2);
  const [iPhoneRotation, setIPhoneRotation] = useState<
    [number, number, number]
  >([0, Math.PI / 4, 0]);

  // Zustand для скролла
  const { setImacRotationProgress } = useScrollStore();

  // Прогресс скролла
  const scrollProgress = useRef(0);
  const maxScrollIMac = 1000;
  const maxScrollIPhone = 1000;
  const maxScrollDelay = 500;
  const maxScrollFinal = 1000;

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const delta = event.deltaY;
      scrollProgress.current += delta;
      scrollProgress.current = Math.max(0, scrollProgress.current);

      const iMacProgress = Math.min(
        scrollProgress.current / maxScrollIMac,
        1,
      );

      // --- Анимация iMac (первая фаза) ---
      const newIMacScale = 15 - iMacProgress * 12;
      const clampedIMacScale = Math.max(
        3,
        Math.min(newIMacScale, 15),
      );
      const newIMacY = -14 + iMacProgress * 12.6;
      const clampedIMacY = Math.min(0, Math.max(newIMacY, -12.6));

      setIMacScale(clampedIMacScale);
      setIMacPosition([2, clampedIMacY, 0]);
      setIMacRotation([0, 0, 0]);

      // --- Анимация iPhone (вторая фаза) ---
      if (iMacProgress >= 1) {
        const iPhoneProgress = Math.min(
          (scrollProgress.current - maxScrollIMac) / maxScrollIPhone,
          1,
        );

        const newIPhoneZ = -20 + iPhoneProgress * 17.2;
        const clampedIPhoneZ = Math.min(
          -2.8,
          Math.max(newIPhoneZ, -20),
        );
        const newIPhoneScale = 2 - iPhoneProgress * 1.75;
        const clampedIPhoneScale = Math.max(
          0.25,
          Math.min(newIPhoneScale, 2),
        );
        const newRotationY =
          Math.PI / 4 - iPhoneProgress * (Math.PI / -4.6 + Math.PI);

        setIPhonePosition([0, -1, clampedIPhoneZ]);
        setIPhoneScale(clampedIPhoneScale);
        setIPhoneRotation([0, newRotationY, 0]);

        // Управление текстом
        if (iMacProgress >= 1 && iPhoneProgress >= 1) {
          const delayProgress = Math.min(
            (scrollProgress.current -
              maxScrollIMac -
              maxScrollIPhone) /
              maxScrollDelay,
            1,
          );

          // Текст виден, пока не началась финальная фаза
          setTextVisible(delayProgress < 1);

          // --- Финальная анимация (третья фаза) ---
          if (delayProgress >= 1) {
            const finalProgress = Math.min(
              (scrollProgress.current -
                maxScrollIMac -
                maxScrollIPhone -
                maxScrollDelay) /
                maxScrollFinal,
              1,
            );

            // iPhone возвращается назад
            const reverseIPhoneZ = -2.8 - finalProgress * 17.2;
            const clampedReverseIPhoneZ = Math.max(
              -20,
              Math.min(reverseIPhoneZ, -2.8),
            );
            const reverseIPhoneScale = 0.25 + finalProgress * 1.75;
            const clampedReverseIPhoneScale = Math.min(
              2,
              Math.max(reverseIPhoneScale, 0.25),
            );
            const reverseRotationY =
              -Math.PI / 1.2 +
              finalProgress * (Math.PI / -4.6 + Math.PI);

            setIPhonePosition([0, -1, clampedReverseIPhoneZ]);
            setIPhoneScale(clampedReverseIPhoneScale);
            setIPhoneRotation([0, reverseRotationY, 0]);

            // iMac поворачивается, увеличивается и опускается
            const newIMacFinalScale = 3 + finalProgress * 27;
            const clampedIMacFinalScale = Math.min(
              30,
              Math.max(newIMacFinalScale, 3),
            );
            const newIMacRotationY = finalProgress * Math.PI;
            const newIMacFinalY = -finalProgress * 27;

            setIMacScale(clampedIMacFinalScale);
            setIMacRotation([0, newIMacRotationY, 0]);
            setIMacPosition([2, newIMacFinalY, 0]);

            // Синхронизируем поворот iMac с появлением второй секции
            console.log('imacRotationProgress:', finalProgress); // Отладка
            setImacRotationProgress(finalProgress);
          }
        } else {
          setTextVisible(false);
          setImacRotationProgress(0);
        }
      } else {
        setTextVisible(false);
        setImacRotationProgress(0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [
    setTextVisible,
    setImacRotationProgress,
    setIMacPosition,
    setIMacScale,
    setIMacRotation,
    setIPhonePosition,
    setIPhoneScale,
    setIPhoneRotation,
  ]);

  return (
    <div style={{ marginTop: visible ? '80px' : '0px' }}>
      <Canvas
        camera={{ position: [10, 0, 0], fov: 30 }}
        style={{
          height: '100vh',
          width: '100%',
        }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={0.2} />
        <pointLight position={[-10, 10, -10]} intensity={0.2} />
        <pointLight position={[0, -10, 0]} intensity={0.1} />
        <directionalLight position={[5, 10, 5]} intensity={2} />
        <IPhone
          position={iPhonePosition}
          scale={iPhoneScale}
          rotation={iPhoneRotation}
          screenshot="/screenshots/screen1.jpg"
        />
        <IMac
          position={iMacPosition}
          scale={iMacScale}
          rotation={iMacRotation}
        />
      </Canvas>
    </div>
  );
};

export default IMacBox;
