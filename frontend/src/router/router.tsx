import {createBrowserRouter} from 'react-router-dom';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import Dashboard  from '../pages/Dashboard';
import AppLayout from '../pages/Applayout';

export const router = createBrowserRouter([
    {
        path:"/",
        element: <AppLayout />,
        children: [
        {
            index: true,
            element: <Dashboard />
        }, 
        {
            path: "login",
            element: <Login />
        },
        {
            path: "signup",
            element: <Signup />
        }]
    }
])