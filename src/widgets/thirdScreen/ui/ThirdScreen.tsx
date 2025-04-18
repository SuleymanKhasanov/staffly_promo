import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { IPhone } from '../../../shared/3d/iPhone/iPhone';
import { Pixel } from '../../../shared/3d/Pixel/Pixel';
import styles from './ThirdScreen.module.css';
import { useScrollStore } from '../../../shared/store/useScrollStore';

const ThirdScreen = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const {
    thirdSectionProgress,
    setThirdSectionProgress,
    section,
    setAnimationComplete,
  } = useScrollStore();
  const [isSectionReady, setIsSectionReady] = useState(false);
  const [isAnimationComplete, setIsAnimationCompleteState] =
    useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (section === 'third') {
      setThirdSectionProgress(0);
      setAnimationComplete(false);
      console.log(
        'ThirdScreen: Entering third section, resetting progress',
      );
      const timer = setTimeout(() => {
        console.log(
          'ThirdScreen: Section ready, thirdSectionProgress:',
          thirdSectionProgress,
        );
        setIsSectionReady(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsSectionReady(false);
      setIsAnimationCompleteState(false);
      setActiveIndex(0);
      setTextIndex(0);
      console.log('ThirdScreen: Exiting third section');
    }
  }, [section, setThirdSectionProgress, setAnimationComplete]);

  const animationStart = 100;
  const animationThreshold = 800;

  useEffect(() => {
    if (!isSectionReady) return;

    const complete = thirdSectionProgress >= animationThreshold;
    setAnimationComplete(complete);
    setIsAnimationCompleteState(complete);

    console.log('ThirdScreen: Animation state', {
      thirdSectionProgress,
      isAnimationComplete: complete,
      animationThreshold,
    });
  }, [thirdSectionProgress, isSectionReady, setAnimationComplete]);

  useEffect(() => {
    if (thirdSectionProgress >= animationStart) {
      const newIndex = Math.min(
        Math.floor((thirdSectionProgress - animationStart) / 300),
        features.length - 1,
      );
      setActiveIndex(newIndex);
      setTextIndex(newIndex); // Синхронное обновление textIndex
    } else {
      setActiveIndex(0);
      setTextIndex(0);
    }
  }, [thirdSectionProgress]);

  const screenshots = [
    '/screenshots/screen2.jpg',
    '/screenshots/screen1.jpg',
    '/screenshots/screen3.jpg',
    '/screenshots/screen4.jpg',
  ];

  const features = [
    {
      title: 'Smart Access & Login',
      text: 'Seamless and secure login via LDAP integration.',
    },
    {
      title: 'Employee Dashboard',
      text: 'Get a clear overview of your announcements, employees, vacancies, department, documents, upcoming events and birthdays.',
    },
    {
      title: 'Leave Management',
      text: 'Request and track leaves with full visibility and transparency. View leave history and upcoming absences across the team.',
    },
    {
      title: 'Company Documents',
      text: 'Access company policies, templates, regulations, and personal HR documents with ease.',
    },
  ];

  useEffect(() => {
    console.log('ThirdScreen State:', {
      thirdSectionProgress,
      activeIndex,
      textIndex,
      screenshot:
        activeIndex >= 0 ? screenshots[activeIndex] : 'none',
      isSectionReady,
      isAnimationComplete,
    });
  }, [
    thirdSectionProgress,
    activeIndex,
    textIndex,
    isSectionReady,
    isAnimationComplete,
  ]);

  return (
    <div
      className={styles.wrapper}
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        zIndex: 2,
      }}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>Staffly key features</h1>
        <div className={styles.canvasWrapper}>
          <Canvas
            camera={{ position: [4, 2, 6], fov: 50 }}
            style={{
              height: '100vh',
              width: '100%',
            }}
          >
            <ambientLight intensity={2} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, 10, -10]} intensity={1} />
            <pointLight position={[0, -10, 0]} intensity={1} />
            <directionalLight
              position={[0, 15, 5]}
              intensity={2}
              castShadow
            />
            <IPhone
              screenshot={
                activeIndex >= 0
                  ? screenshots[activeIndex]
                  : screenshots[0]
              }
              position={[-1.2, -1.3, 0.8]}
              rotation={[-0.2, -Math.PI / 1, -0.1]}
              scale={1}
              velocity={[0.1, 0.05, 0]}
              rotationSpeed={[0.01, 0.02, 0]}
            />
            <Pixel
              screenshot={
                activeIndex >= 0
                  ? screenshots[activeIndex]
                  : screenshots[0]
              }
              position={[-0.2, -0.1, -4]}
              rotation={[1.2, -Math.PI / 1.07, 1]}
              scale={3.5}
              velocity={[0.1, 0.05, 0]}
              rotationSpeed={[0.01, 0.02, 0]}
            />
          </Canvas>
        </div>

        <div className={styles.sliderWrapper}>
          <div className={styles.featureContainer}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${styles.featureItem} ${
                  textIndex === index ? styles.active : ''
                }`}
                style={{
                  display: textIndex === index ? 'flex' : 'none', // Показываем только активный элемент
                }}
              >
                <h3 className={styles.featureTitle}>
                  {feature.title}
                </h3>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdScreen;
