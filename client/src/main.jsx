import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Order from './pages/Order.jsx';
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/authContext';
import { OrderProvider } from './context/orderContext';
import NotFound from './components/NotFound.jsx';


const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/orders", element: <Order /> }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
          <ToastContainer
            pauseOnFocusLoss={false}
            limit={2}
            closeOnClick
            draggable
            pauseOnHover
          />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode >,
)
