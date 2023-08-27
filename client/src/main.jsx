import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { RouterProvider } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Musik from './pages/Musik.jsx';
import Barang from './pages/Barang.jsx';
import Detail from './Komponen/Detail.jsx';
import Regist from './pages/Regist.jsx';

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
        element: <Barang/>,
      },
      {
        path: "/log",
        element: <Login/>,
      },
      {
        path: "/groups/:id",
        element: <Detail/>,
      },
      {
        path: "/regist",
        element: <Regist/>,
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
