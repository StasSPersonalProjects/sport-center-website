import { useAuth } from "../store/auth-context";

export default function HomePage() {

  const { isAuthenticated } = useAuth();

  return (
    <p>
      {!isAuthenticated ? 'Home Page' : 'Welcome Back!'}
    </p>
  );
}