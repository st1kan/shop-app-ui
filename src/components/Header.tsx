'use client';
import styles from '../styles/Header.module.scss';
import { FiBell, FiUser } from 'react-icons/fi';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>LOGO</div>
      <div className={styles.actions}>
        <button className={styles.iconButton}><FiBell /></button>
        <button className={styles.iconButton}><FiUser /></button>
      </div>
    </header>
  );
}
