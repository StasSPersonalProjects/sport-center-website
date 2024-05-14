import { useAuth } from "../store/auth-context";
import PageContent from "../components/PageContent";

export default function HomePage() {

  const { isAuthenticated, username } = useAuth();

  return (
    <PageContent>
      <p>
        {!isAuthenticated ? 'Home Page' : 'Hello ' + username + '!'}
      </p>
    </PageContent>
  );
}