import { useAuth } from "../store/auth-context";

export default function HomePage() {

  const { isAuthenticated } = useAuth();

  return (
    <h1>
      {!isAuthenticated ? 'Home Page' : 'Welcome Back!'}
    </h1>
  );
}