import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './authentication/Login';
import Register from './authentication/Register';
import Mainpage from './store/Mainpage';
import Adminpage from './admin/Adminpage';
import Cover from './store/Cover';
import Promo from './store/Promo';
import Products from './store/Products';
import Cart from './store/Cart';
import Contact from './store/Contact';
import Profile from './store/profile/Profile';
import Error404 from './ErrorPathRedirect';
import ProfileInfo from './store/profile/ProfileInfo';
import EditPassword from './store/profile/EditPassword';
import EditInfo from './store/profile/EditInfo';
import AdminJobs from './admin/AdminJobs';
import ProductPage from './store/ProductPage';
import AddNewProduct from './admin/AddNewProduct';
import Mailbox from './store/Mailbox';
import ApproveOrders from './admin/ApproveOrders';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Login></Login>
  },
  {
    path:'login',
    element: <Login></Login>
  },
  {
    path:'register',
    element: <Register></Register>
  },
  {
    path:'store',
    element: <Mainpage></Mainpage>,
    children: [
      {
        path:'',
        element: <Cover></Cover>
      },
      {
        path:'promo',
        element: <Promo></Promo>
      },
      {
        path:'all-products',
        element: <Products></Products>
      },
      {
        path:'product-page',
        element: <ProductPage></ProductPage>
      },
      {
        path:'cart',
        element: <Cart></Cart>
      },
      {
        path:'contact',
        element: <Contact></Contact>
      },
      {
        path:'profile',
        element: <Profile></Profile>,
        children: [
          {
            path:'',
            element: <ProfileInfo></ProfileInfo>
          },
          {
            path:'edit-password',
            element: <EditPassword></EditPassword>
          },
          {
            path:'edit-info',
            element: <EditInfo></EditInfo>
          }
        ]
      },
      {
        path:'notifications',
        element:<Mailbox></Mailbox>
      }
    ]
  },
  {
    path:'admin',
    element: <Adminpage></Adminpage>,
    children: [
      {
        path:'',
        element: <AdminJobs></AdminJobs>
      },
      {
        path:'profile',
        element: <Profile></Profile>,
        children: [
          {
            path:'',
            element: <ProfileInfo></ProfileInfo>
          },
          {
            path:'edit-password',
            element: <EditPassword></EditPassword>
          },
          {
            path:'edit-info',
            element: <EditInfo></EditInfo>
          }
        ]
      },
      {
        path:'new-product',
        element: <AddNewProduct></AddNewProduct>
      },
      {
        path:'orders',
        element: <ApproveOrders></ApproveOrders>
      }
    ]
  },
  {
    path:'*',
    element: <Error404></Error404>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
