import styles from './Toggle.module.css';
import { useTheme } from '../../Context/ThemeContext';

function Toggle() {

    const { theme , toggleTheme} = useTheme();


  return (
    <div className={styles.toggleContainer}>
        <span className={`${styles.label} ${theme ? styles.whiteLabel : styles.blackLabel}`}>Light</span>
        <div className={`${styles.toggleSwitch} ${theme ? styles.dark : styles.light}`} onClick={toggleTheme}>
            <div className={styles.toggleCircle}></div>
        </div>
        <span className={`${styles.label} ${theme ? styles.whiteLabel : styles.blackLabel}`}>Dark</span>
    </div>
  );
};

export default Toggle;
