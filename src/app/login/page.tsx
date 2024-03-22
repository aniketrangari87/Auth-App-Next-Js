"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";



function page() {
  const router = useRouter()
  const [buttonDisabled , setButtonDisabled]= useState(false)
  const [loading , setLoading]=  useState(false)

    const[user ,setUser] =useState({
        email:"",
        password:"",
        
    })

    const  onLogin = async() =>{
      try{
        setLoading(true);
        const response =await axios.post("api/users/login" , user )
        console.log("Login success" ,response.data);
        router.push("/profile")
  
      }catch(error : any ){
        console.log("Login failed ", error.message);
      
      }finally{
        setLoading(false);
      }
    }
    useEffect(()=>{

      if( user.email.length >0 && user.password.length>0){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
  
    },[user])
  return (
    <div className='w-full  bg-slate-950 flex justify-center items-center min-h-screen'>
  
    <div className='flex bg-blue-900 w-full max-w-sm h-[400px]  flex-col space-y-5  shadow-blue-200 py-3 justify-center items-center '>
    <h1>{loading ? "Processing" :"Login"}</h1>
        <label htmlFor="username">Email </label>
        <input className='p-3  text-black' type="text" id='email' name='email' placeholder='email' value={user.email} 
        onChange={(e)=>setUser({...user , email : e.target.value})} />
        <label htmlFor="username">Password </label>
        <input className='p-3 text-black' type="text" id='password' name='password' placeholder='password' value={user.password} 
        onChange={(e)=>setUser({...user , password : e.target.value})} />
        <button onClick={onLogin} className='bg-cyan-700 py-2 rounded-xl px-4 '> {buttonDisabled ? "No Login": "Login"}</button>
        <Link className='text-yellow-400' href='signup'> Signup </Link>
    </div>
    </div>
  )
}

export default page