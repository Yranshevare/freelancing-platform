'use client'
import React, { useState } from 'react'
import Link from 'next/link'

export default function page() {
    const [id,setId] = useState("")
    const [password, setPassword] = useState("")
    const submit = async() => {
        console.log(id,password)
    }

  return (
    <div className='h-screen w-screen flex items-center justify-center bg-heroBlue'>
        <div className='w-1/2 h-1/2 bg-cardBackground flex  items-center justify-center rounded-2xl shadow-[5px_5px_6px_rgba(255,255,255,0.1)]' >
            <div className='w-[90%] h-[90%] flex flex-col  justify-around'>
                <div className='h-[15%] w-[100%] border-b-[0.5px] flex items-center'>
                    <p className='text-4xl'>logIn</p>
                </div>
                <div className='h-[85%] flex flex-col justify-around'>
                    <div  className='w-[100%]'>
                        <p className='font-normal text-xs opacity-65 mb-2'>USERNAME / EMAIL</p>
                        <input 
                        value={id}
                        onChange={(e)=>setId(e.target.value)}
                        placeholder='USERNAME / EMAIL'
                        type="text" 
                        className='rounded focus:outline-none w-[100%] text-heroBlue  font-medium text-xs py-1 pl-1'/>
                    </div>
                    <div className='w-[100%]'>
                        <p className='font-normal text-xs opacity-65 mb-2'>PASSWORD</p>
                        <input 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder='PASSWORD'
                        type="password" 
                        className='rounded focus:outline-none w-[100%] text-heroBlue font-medium text-xs py-1 pl-1'/>
                    </div>
                    <div className='flex flex-col'>
                        <button 
                        className='border p-2 rounded-xl hover:bg-[rgba(255,255,255,0.2)]'
                        onClick={submit}
                        >login</button>
                        <Link href="/signin" className='font-medium text-xs text-center mt-3 opacity-30 hover:opacity-80 duration-300'>create new account</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
