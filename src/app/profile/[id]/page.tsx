import React from 'react'

function page({params } : any ) {
  return (
    <div className='bg-black flex w-full justify-center items-center min-h-screen'>
    <div className='flex bg-slate-700 space-x-10 justify-center max-w-xl rounded-xl  w-full mx-auto  h-[400px] items-center '>
        <p className='text-lg'>  Profile of <span className='bg-cyan-800 py-4 font-semibold text-lg px-4 rounded-md'> {params.id}</span></p>
        </div>
    </div>
  )
}

export default page