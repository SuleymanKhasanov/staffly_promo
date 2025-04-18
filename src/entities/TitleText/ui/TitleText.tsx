import styles from './TitleText.module.css';

const TitleText = ({ visible }: { visible: boolean }) => {
  return (
    <div
      className={`${styles.container} ${
        visible ? styles.visible : ''
      }`}
    >
      <h1 className={styles.title}>Staffly</h1>
      <span className={styles.subtitle}>
        Driven by Innovation, Powered by People
      </span>
    </div>
  );
};

export default TitleText;
