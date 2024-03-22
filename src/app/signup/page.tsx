"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

function page() {
  const router = useRouter();
  const [buttonDisabled , setButtonDisabled]= useState(false)
  const [loading , setLoading]=  useState(false)
    const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  useEffect(()=>{

    if(user.username && user.email&& user.password){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }

  },[user])

  const onSignup = async () => {
    try{
      setLoading(true);
      const response =await axios.post("api/users/signup" , user )
      console.log("Signup success" ,response.data)
      router.push("/login")

    }catch(error : any ){
      console.log("Signup failed ", error.message);
     toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };
  return (
    <div className="w-full bg-black flex justify-center items-center min-h-screen">
      <div className="flex bg-cyan-950 w-full max-w-md h-[500px]  flex-col space-y-5  shadow-blue-200 py-3 justify-center items-center ">
        <h1>{loading ? "Processing" :"Signup"}</h1>
        <label htmlFor="username">Username </label>
        <input
          className="p-3 text-black"
          type="text"
          id="username"
          name="username"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label htmlFor="username">Email </label>
        <input
          className="p-3 text-black"
          type="text"
          id="email"
          name="email"
          placeholder="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="username">Password </label>
        <input
          className="p-3 text-black"
          type="text"
          id="password"
          name="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={onSignup}
          className="bg-cyan-700 py-2 rounded-xl px-4 "
        > 
         {buttonDisabled ? "No signup": "Signup"}
        </button>
        <Link className="text-yellow-400" href="login">
          
          Login
        </Link>
      </div>
    </div>
  );
}

export default page;
