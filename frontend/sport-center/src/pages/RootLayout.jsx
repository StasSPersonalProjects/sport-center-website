import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import styles from '../styles/RootLayout.module.css';

export default function RootLayout() {

  return (
    <div className={styles.container}>
      <NavigationBar />
      <main className={styles['main-content']}>
        <Outlet />
      </main>
    </div>
  );
}