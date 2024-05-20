import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import PersonalRoomPage from './pages/PersonalRoomPage';
import AuthenticationPage from './pages/AuthenticationPage';
import RegistrationPage from './pages/RegistrationPage';
import OfferedServicesPage from './pages/OfferedServicesPage';
import AuthContextProvider from './store/auth-context';
import CartContextProvider from './store/cart-context';

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
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AuthContextProvider>
  )
}

export default App
