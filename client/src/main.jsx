import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { RouterProvider } from 'react-router-dom';
// import Musik from './pages/Musik.jsx';
import Login from './pages/Login.jsx';
// import Products from './pages/Products.jsx';
import Shop from './pages/Shop.jsx';
import Musik from './pages/Musik.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/shop",
        element: <Shop/>,
      },
      {
        path: "/log",
        element: <Login/>,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </React.StrictMode>,
)
