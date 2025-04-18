import { FirstScreen } from '../../widgets/firstScreen';
import { SecondScreen } from '../../widgets/secondScreen';
import { ThirdScreen } from '../../widgets/thirdScreen';
import { useScrollStore } from '../../shared/store/useScrollStore';
import './styles.css';
import { useEffect, useState } from 'react';

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

  const [isThirdSectionVisible, setIsThirdSectionVisible] =
    useState(false);

  useEffect(() => {
    if (section === 'third') {
      const timer = setTimeout(() => {
        setIsThirdSectionVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsThirdSectionVisible(false);
    }
  }, [section]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY;

      console.log('handleWheel:', {
        section,
        scrollProgress,
        thirdSectionProgress,
        delta,
        isAnimationComplete,
      });

      if (section === 'first') {
        if (imacRotationProgress >= 0.99 && delta > 0) {
          setSection('second');
          setScrollProgress(0);
        }
      } else if (section === 'second') {
        const newProgress = Math.max(0, scrollProgress + delta);
        setScrollProgress(newProgress);
        // Увеличим порог для перехода в третью секцию, чтобы он не срабатывал слишком рано
        if (newProgress > 600 && delta > 0) {
          setSection('third');
          setScrollProgress(0);
          setThirdSectionProgress(0);
          setAnimationComplete(false);
        } else if (newProgress <= 0 && delta < 0) {
          setSection('first');
          setScrollProgress(0);
        }
      } else if (section === 'third') {
        if (!isAnimationComplete) {
          setThirdSectionProgress(
            Math.min(800, Math.max(0, thirdSectionProgress + delta)),
          );
        } else {
          setThirdSectionProgress(
            Math.max(0, thirdSectionProgress + delta),
          );
        }
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
          zIndex: 0,
        }}
      >
        <FirstScreen />
      </div>
      {imacRotationProgress >= 0.99 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            opacity: imacRotationProgress === 1 ? 1 : 0,
            width: '100%',
            height: '100vh',
            transition:
              'transform 0.5s ease-out, opacity 0.5s ease-out',
            zIndex: 1,
          }}
        >
          <SecondScreen />
        </div>
      )}
      {section === 'third' && (
        <div
          style={{
            position: !isAnimationComplete ? 'fixed' : 'relative',
            top: !isAnimationComplete ? 0 : 'auto',
            width: '100%',
            height: '100vh',
            background: '#f0f0f0',
            transition:
              'transform 0.7s ease-out, opacity 0.7s ease-out',
            transform: isThirdSectionVisible
              ? 'translateY(0)'
              : 'translateY(100vh)',
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
