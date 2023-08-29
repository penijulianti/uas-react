import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { RouterProvider } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Barang from './pages/Barang.jsx';
import Detail from './Komponen/Detail.jsx';
import Regist from './pages/Regist.jsx';
import EditPrd from './pages/EditPrd.jsx';
import EditGroup from './pages/EditGroup.jsx';
import Payment from './pages/payment.jsx';

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
        path: "/musik/:id",
        element: <Detail/>,
      },
      {
        path: "/groups/:id",
        element: <Detail/>,
      },
    
      {
        path: "/regist",
        element: <Regist/>,
      },
      {
        path: "/groups/edit/:id",
        element: <EditGroup/>,
      },
      {
        path: "/product/edit/:id",
        element: <EditPrd/>,
      },
      {
        path: "/pay",
        element: <Payment/>,
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
