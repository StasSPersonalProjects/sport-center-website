import { useRef, useState } from 'react';
import styles from '../styles/RegisterForm.module.css';
import { REGISTER_URL } from '../utils/urls';
import { useAuth } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import CustomModal from './CustomModal';

export default function RegisterForm() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const modal = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords doesn't match, please check again.");
      modal.current.open();
      return;
    }

    const registrationData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }

    const response = await fetch(REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationData)
    })

    if (response.ok) {
      const resData = await response.json();
      const accessToken = resData.access_token;
      const refreshToken = resData.refresh_token;

      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);

      setIsAuthenticated(true);

      navigate('/');
    } else if (response.status === 500) {
      setErrorMessage('Internal server error.')
      modal.current.open();
    } else {
      setErrorMessage('Unexpected error.')
      modal.current.open();
    }
  };

  return (
    <>
      <CustomModal ref={modal} message={errorMessage} />

      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className={styles['input-box']}>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              required />
          </div>

          <div className={styles['input-box']}>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last Name"
              required />
          </div>

          <div className={styles['input-box']}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="E-mail"
              required />
          </div>

          <div className={styles['input-box']}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required />
          </div>

          <div className={styles['input-box']}>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              required />
          </div>

          <button className={styles.btn} >Register</button>
        </form>
      </div>
    </>
  );
}