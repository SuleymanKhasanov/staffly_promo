import { useEffect, useRef } from 'react';
import styles from './SecondScreen.module.css';
import team1 from '../../../shared/assets/img/team1.webp';
import team2 from '../../../shared/assets/img/team2.webp';
import team3 from '../../../shared/assets/img/team3.webp';
import team4 from '../../../shared/assets/img/team4.jpg';

const SecondScreen = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
            // Отключаем наблюдатель после срабатывания, чтобы анимация не повторялась
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }, // Анимация запускается, когда 10% секции видно
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>What is Staffly?</h1>
          <p className={styles.text}>
            Staffly is the official Human Resource Management System
            (HRMS) mobile and web app for East Telecom employees.
            Designed to streamline internal HR processes, improve
            communication, and enhance employee self-service, Staffly
            brings all your HR needs into one easy-to-use platform –
            anytime, anywhere.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.image1} src={team1} alt="team" />
          <img className={styles.image2} src={team2} alt="team" />
          <img className={styles.image3} src={team3} alt="team" />
          <img className={styles.image4} src={team4} alt="team" />
        </div>
      </div>
    </div>
  );
};

export default SecondScreen;
