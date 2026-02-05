import { BsSun, BsMoon } from 'react-icons/bs';
import styles from '../css/ThemeToggle.module.scss';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <button 
      className={styles.themeToggle} 
      onClick={onToggle}
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? <BsSun /> : <BsMoon />}
    </button>
  );
};

export default ThemeToggle;
