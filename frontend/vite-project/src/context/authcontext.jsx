import React, { useEffect } from 'react'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useContext } from 'react';
import { set } from 'mongoose';

export const AuthContext = createContext();

 const Authprovider = ({ children }) => {
const navigate = useNavigate();
const[user,setuser]=useState(null);

useEffect(()=>{
const checkauth=async()=>{
  console.log("meta env is", import.meta.env.VITE_URL);
const storeduser=localStorage.getItem("user");
const token=localStorage.getItem("token");
if(storeduser&&token)
{
  
    try{

      console.log("token is", token);
 const response = await axios.get(`${import.meta.env.VITE_URL}/user/auth`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
console.log("response is", response);
  if(response.status===200) {
    setuser(JSON.parse(storeduser));
  }
  else{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setuser(null);
    navigate("/login");
  }
    }
    catch(err){
      if(err.response && err.response.status === 401) {
       
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setuser(null);
        navigate("/login");
    }
    else{
      console.error("Error fetching user data:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setuser(null);
      navigate("/login");
    }

  }
}
  else{
   
      localStorage.removeItem("user");
    
   
      localStorage.removeItem("token");
    
  }
}
checkauth();
setInterval(checkauth, 5000); 

},[]);
  return (
   <AuthContext.Provider value={[user,setuser]}>
   {children}
    </AuthContext.Provider>
  )
}
export const useauth=()=>{
 return  useContext(AuthContext);
}

export default Authprovider;
