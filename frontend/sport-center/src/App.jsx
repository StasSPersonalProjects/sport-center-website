import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import AuthenticationPage from './pages/AuthenticationPage';
import RegistrationPage from './pages/RegistrationPage';
import { action as registrationAction } from './pages/RegistrationPage';
import AuthContextProvider from './store/auth-context';

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/auth',
        element: <AuthenticationPage />,
      },
      {
        path: '/register',
        element: <RegistrationPage />,
        action: registrationAction
      }
    ]
  }
]);

function App() {

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App
