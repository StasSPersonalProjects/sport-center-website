import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import styles from '../styles/AuthForm.module.css';
import { useAuth } from '../store/auth-context';
import ErrorModal from './ErrorModal';

export default function AuthForm() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const modal = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await login(email, password, rememberMe);
      navigate('/');
    } catch (error) {
      switch (error.message) {
        case 'ForbiddenAccess':
          setErrorMessage('Forbidden access: User does not have permission to access.');
          modal.current.open();
          break;
        case 'UnexpectedError':
          setErrorMessage('Unexpected error occurred during login.');
          modal.current.open();
          break;
        case 'LoginFailed':
          setErrorMessage('Login failed: Invalid email or password.');
          modal.current.open();
          break;
        default:
          setErrorMessage('Unknown error occurred:', error.message);
          modal.current.open();
          break;
      }
    }
  }

  return (
    <>
      <ErrorModal ref={modal} message={errorMessage} />

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