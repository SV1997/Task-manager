import {Outlet} from 'react-router-dom';
import './Auth.css';
import Header from './Header';
// import { authAPI } from '../services/api';
export default function AppLayout() {
  // authAPI.isLogin();
  return (
    <div>
      <Header/>
      <Outlet />
    </div>
  );
}
