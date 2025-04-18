import { FirstScreen } from '../../widgets/firstScreen';
import { SecondScreen } from '../../widgets/secondScreen';
import { ThirdScreen } from '../../widgets/thirdScreen';
import { useScrollStore } from '../../shared/store/useScrollStore';
import './styles.css';
import { useEffect } from 'react';

const BaseLayout = () => {
  const {
    scrollProgress,
    thirdSectionProgress,
    section,
    imacRotationProgress,
    isAnimationComplete,
    setScrollProgress,
    setThirdSectionProgress,
    setSection,
    setAnimationComplete,
  } = useScrollStore();

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY;

      console.log('handleWheel:', {
        section,
        scrollProgress,
        thirdSectionProgress,
        delta,
      });

      if (section === 'first') {
        if (imacRotationProgress >= 0.99 && delta > 0) {
          setSection('second');
          setScrollProgress(0);
        }
      } else if (section === 'second') {
        const newProgress = Math.max(0, scrollProgress + delta);
        setScrollProgress(newProgress);
        if (newProgress > 500 && delta > 0) {
          // Сброс прогресса третьей секции при входе
          setSection('third');
          setScrollProgress(0);
          setThirdSectionProgress(0); // Это гарантирует, что скролл начинается с 0
          setAnimationComplete(false);
        } else if (newProgress <= 0 && delta < 0) {
          setSection('first');
          setScrollProgress(0);
        }
      } else if (section === 'third') {
        // Управление скроллом третьей секции
        // Здесь можно настроить максимальный прогресс (800) и поведение скролла
        if (!isAnimationComplete) {
          setThirdSectionProgress(
            Math.min(800, Math.max(0, thirdSectionProgress + delta)),
          );
        } else {
          setThirdSectionProgress(
            Math.max(0, thirdSectionProgress + delta),
          );
        }
        // Обратный скролл в секцию 2
        if (thirdSectionProgress <= 20 && delta < 0) {
          setSection('second');
          setScrollProgress(0);
          setThirdSectionProgress(0);
          setAnimationComplete(false);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [
    scrollProgress,
    thirdSectionProgress,
    section,
    imacRotationProgress,
    isAnimationComplete,
    setScrollProgress,
    setThirdSectionProgress,
    setSection,
    setAnimationComplete,
  ]);

  console.log(isAnimationComplete);

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100vh',
          transition: 'transform 0.3s ease-out',
        }}
      >
        <FirstScreen />
      </div>
      {imacRotationProgress >= 0.99 && (
        <div
          style={{
            position: !isAnimationComplete ? 'relative' : 'fixed',
            top: !isAnimationComplete ? 'auto' : 0,
            opacity: imacRotationProgress === 1 ? 1 : 0,
            width: '100%',
            height: '100vh',
            transition: 'transform 0.5s ease-out',
            zIndex: 1,
          }}
        >
          <SecondScreen />
        </div>
      )}
      {section === 'third' && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            width: '100%',
            height: '100vh',
            background: '#fff',
            transform: `translateY(${-thirdSectionProgress / 10}%)`,
            transition: 'transform 0.3s ease-out',
            zIndex: 2,
          }}
        >
          <ThirdScreen />
        </div>
      )}
    </div>
  );
};

export default BaseLayout;
