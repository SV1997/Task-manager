import {Outlet} from 'react-router-dom';
import './Auth.css';
import Header from './Header';
import { useEffect } from 'react';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { authAPI } from '../services/api';
export default function AppLayout() {
  // authAPI.isLogin();
  const navigate = useNavigate();
  const location = useLocation();
   useEffect(()=>{
      try{const verifyToken=async()=>{      
        const res:any = await authAPI.verifyToken()
        console.log("visit", res)
        if(res.success &&(location.pathname==="/login"||location.pathname==="/signup")){
          navigate("/");
        }
        else if(location.pathname!=="/login"){
          navigate("/login")
        }
      }
      verifyToken();}
      catch(err){
        console.log(err)
      }
    },[])
  return (
    <div>
      <Header/>
      <Outlet />
    </div>
  );
}
