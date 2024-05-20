import { useAuth } from "../store/auth-context";
import AuthenticationPage from "../pages/AuthenticationPage";

const ProtectedRoute = ({ component }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? component : <AuthenticationPage />}
    </>
  );
};

export default ProtectedRoute;