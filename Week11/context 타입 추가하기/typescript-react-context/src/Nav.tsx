import { useTheme } from './ThemeContext';
import styles from './Nav.module.css';

export default function Nav() {
  const theme = useTheme();

  return (
    <nav className={`${styles.nav} ${styles[theme]}`}>
      <div className={styles.container}>
        <span>코드잇</span>
        <ul className={styles.menu}>
          <li>소개</li>
          <li>오시는 길</li>
          <li>연락하기</li>
        </ul>
      </div>
    </nav>
  );
}
