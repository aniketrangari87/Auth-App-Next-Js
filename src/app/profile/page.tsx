"use client";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {  useState } from "react";
import toast from "react-hot-toast";


function page() {
  const router = useRouter()
  const [data , setData] =useState("nothing") 
  const  logout=async()=>{
 
    try{
    await axios.get("/api/users/logout");
    toast.success("Logout Successfully");
    router.push('/login')
    }catch(error : any){
      console.log(error.message)
      toast.error(error.message)

    }


  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me');
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error:any) {
      console.error('Error:', error.message);
      console.log('Response:', error.response); // Log the detailed response
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center min-h-screen">
        <div>Profile page</div>
        <h2>{data ==="nothing"?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button onClick={getUserDetails} className="bg-purple-700 py-2 px-4 rounded-xl">Get User  </button>
        <button onClick={logout} className="bg-blue-700 py-2 px-4 rounded-xl">Logout</button>
      </div>
    </>
  );
}

export default page;
