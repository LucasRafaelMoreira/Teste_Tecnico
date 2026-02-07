import styles from '../css/SkeletonCard.module.scss';

const SkeletonCard = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.image}></div>
      <div className={styles.title}></div>
      <div className={styles.date}></div>
      <div className={styles.rating}></div>
      <div className={styles.button}></div>
    </div>
  );
};

export default SkeletonCard;
