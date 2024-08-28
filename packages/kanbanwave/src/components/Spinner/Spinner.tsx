import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.container}>
      <span className={styles.item}></span>
      <span className={styles.item}></span>
      <span className={styles.item}></span>
    </div>
  )
}

export default Spinner;