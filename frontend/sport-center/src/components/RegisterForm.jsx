import { Form } from 'react-router-dom';
import styles from '../styles/RegisterForm.module.css';

export default function RegisterForm() {

  return (
    <div className={styles.wrapper}>
            <Form method='post'>
                <h1>Register</h1>
                <div className={styles['input-box']}>
                    <input id="firstName" type="text" name="firstName" placeholder="First Name" required />
                </div>
                <div className={styles['input-box']}>
                    <input id="lastName" type="text" name="lastName" placeholder="Last Name" required />
                </div>
                <div className={styles['input-box']}>
                    <input id="email" type="email" name="email" placeholder="E-mail" required />
                </div>
                <div className={styles['input-box']}>
                    <input id="password" type="password" name="password" placeholder="Password" required />
                </div>
                <div className={styles['input-box']}>
                    <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm Password" required />
                </div>
                <button className={styles.btn} >Register</button>
            </Form>
    </div>
  );
}