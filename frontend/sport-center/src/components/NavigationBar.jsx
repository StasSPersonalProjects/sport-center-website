import { NavLink } from "react-router-dom";
import styles from '../styles/NavigationBar.module.css';
import { useAuth } from "../store/auth-context";

export default function NavigationBar() {

  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className={styles['nav-container']}>
      <ul className={styles['nav-list']}>
      {isAuthenticated && <li className={styles['nav-list-item']}>
          <NavLink
            to='/personal'>
            Personal Room
          </NavLink>
        </li>}
        <li className={styles['nav-list-item']}>
          <NavLink
            to='/' >
            Home
          </NavLink>
        </li>
        {!isAuthenticated && <li className={styles['nav-list-item']}>
          <NavLink
            to='/auth'>
            Login
          </NavLink>
        </li>}
        {isAuthenticated && <li className={styles['nav-list-item']}>
          <NavLink
            to='/offered-services'>
            Our Services
          </NavLink>
        </li>}
        {isAuthenticated && <li className={styles['nav-list-item']}>
          <NavLink
            to='/'
            onClick={logout}>
            Logout
          </NavLink>
        </li>}
      </ul>
    </nav>
  );
}