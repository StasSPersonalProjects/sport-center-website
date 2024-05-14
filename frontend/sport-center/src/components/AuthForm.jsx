import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import styles from '../styles/AuthForm.module.css';
import { useAuth } from '../store/auth-context';
import ErrorModal from './ErrorModal';

export default function AuthForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const modal = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
   login(email, password, rememberMe);
   navigate('/');
  }

  function handleOpenModal() {
    modal.current.open();
  }

  return (
    <>
      <ErrorModal ref={modal} message={'error occurred'}/>
      <button onClick={handleOpenModal}>open modal</button>

      <div className={styles.wrapper}>

        <form onSubmit={handleSubmit}>

          <h1>Login</h1>

          <div className={styles['input-box']}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required />
            <i className='bx bxs-user'></i>
          </div>

          <div className={styles['input-box']}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required />
            <i className='bx bxs-lock-alt'></i>
          </div>

          <div className={styles['remember-forgot']}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)} />
              Remember me
            </label>
            <NavLink to='/' >Forgot password?</NavLink>
          </div>

          <button className={styles.btn}>Login</button>

          <div className={styles['register-link']}>
            <p>Not a member? <NavLink to='/register' >Click here to register!</NavLink></p>
          </div>

        </form>

      </div>
    </>
  );
}