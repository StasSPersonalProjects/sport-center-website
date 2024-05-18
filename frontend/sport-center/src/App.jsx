import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import PersonalRoomPage from './pages/PersonalRoomPage';
import AuthenticationPage from './pages/AuthenticationPage';
import RegistrationPage from './pages/RegistrationPage';
import { action as registrationAction } from './pages/RegistrationPage';
import AuthContextProvider from './store/auth-context';
import { tokenLoader } from '../src/utils/auth';
import OfferedServicesPage from './pages/OfferedServicesPage';

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <RootLayout />,
    loader: tokenLoader,
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
      },
      {
        path: '/personal',
        element: <PersonalRoomPage />
      },
      {
        path: '/offered-services',
        element: <OfferedServicesPage />
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
