import styles from './Alert.module.css';
import { ReactNode } from 'react';

interface Props {
    level?: 'info' | 'warn';
    children: ReactNode;
}

export default function Alert({ level = 'info', children }: Props) {
  return (
    <div className={`${styles.alert} ${styles[level]}`}>
      {children}
    </div>
  );
}