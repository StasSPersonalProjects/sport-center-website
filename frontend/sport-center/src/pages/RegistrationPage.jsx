import RegisterForm from "../components/RegisterForm";
import { redirect } from "react-router-dom";
import { REGISTER_URL } from "../utils/urls";

export default function RegistrationPage() {

  return (
    <RegisterForm />
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const registrationData = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    email: data.get('email'),
    password: data.get('password')
  }

  fetch(REGISTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationData)
  })

  return redirect('/');
}