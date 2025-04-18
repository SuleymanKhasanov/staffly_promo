import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { IPhone } from '../../../shared/3d/iPhone/iPhone';
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

  // Сброс состояния при входе в третью секцию
  useEffect(() => {
    if (section === 'third') {
      // Сбрасываем прогресс скролла для третьей секции
      setThirdSectionProgress(0);
      setAnimationComplete(false);
      // Задержка для обеспечения готовности секции
      // Настрой это значение (100 мс), если секция загружается слишком быстро/медленно
      const timer = setTimeout(() => {
        console.log(
          'ThirdScreen: Section ready, thirdSectionProgress:',
          thirdSectionProgress,
        );
        setIsSectionReady(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsSectionReady(false);
    }
  }, [section, setThirdSectionProgress, setAnimationComplete]);

  // Управление анимациями списка и скриншотов
  useEffect(() => {
    if (!isSectionReady) return;

    // Порог для завершения анимаций списка
    // Измени 800, чтобы растянуть или сократить диапазон анимаций (должно совпадать с BaseLayout)
    const animationThreshold = 800;
    const complete = thirdSectionProgress >= animationThreshold;
    setAnimationComplete(complete); // для стора
    setIsAnimationCompleteState(complete); // для локального UI

    if (thirdSectionProgress >= animationThreshold) {
      console.log('ThirdScreen: List highlight complete');
      setAnimationComplete(true);
    } else {
      setAnimationComplete(false);
    }
  }, [thirdSectionProgress, isSectionReady, setAnimationComplete]);

  // Анимация списка начинается после thirdSectionProgress >= 100
  // Настрой это значение (100), чтобы анимация начиналась раньше/позже
  const listAnimationStart = 900;
  const activeIndex =
    thirdSectionProgress >= listAnimationStart
      ? Math.min(
          Math.floor(
            (thirdSectionProgress - listAnimationStart) / 175,
          ),
          3,
        )
      : -1; // -1 означает, что ни один пункт не активен (все серые)

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

  // Логирование для отладки
  useEffect(() => {
    console.log('ThirdScreen State:', {
      thirdSectionProgress,
      activeIndex,
      screenshot:
        activeIndex >= 0 ? screenshots[activeIndex] : 'none',
      isSectionReady,
    });
  }, [thirdSectionProgress, activeIndex, isSectionReady]);

  console.log(
    'Wrapper position:',
    !isAnimationComplete ? 'fixed' : 'relative',
  );

  return (
    <div
      className={styles.wrapper}
      ref={wrapperRef}
      style={{
        position: !isAnimationComplete ? 'fixed' : 'relative',
        top: !isAnimationComplete ? 0 : 'auto',
        left: !isAnimationComplete ? 0 : 'auto',
      }}
    >
      <h1 className={styles.title}>Staffly key features</h1>
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          <ul className={styles.featureList}>
            {features.map((feature, index) => (
              <li
                key={index}
                className={`${styles.featureItem} ${
                  activeIndex === index ? styles.active : ''
                }`}
              >
                <h3 className={styles.featureTitle}>
                  {feature.title}
                </h3>
                <p className={styles.featureText}>{feature.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.canvasWrapper}>
          <Canvas
            camera={{ position: [3, 2, 6], fov: 50 }}
            style={{
              height: '100%',
              width: '100%',
            }}
          >
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, 10, -10]} intensity={0.8} />
            <pointLight position={[0, -10, 0]} intensity={0.6} />
            <directionalLight
              position={[0, 15, 5]}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <IPhone
              // Показываем скриншот только если есть активный пункт
              screenshot={
                activeIndex >= 0
                  ? screenshots[activeIndex]
                  : screenshots[0]
              }
              position={[0.5, 0, 0]}
              rotation={[-0.3, -Math.PI / 0.9, 0.1]}
              scale={0.74}
              velocity={[0.1, 0.05, 0]}
              rotationSpeed={[0.01, 0.02, 0]}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default ThirdScreen;
