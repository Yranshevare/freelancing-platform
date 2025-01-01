'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function page() {
    const router = useRouter()

    const [id,setId] = useState("")
    const [idError,setIdError] = useState("")
    const [passwordError,setPasswordError] = useState("")
    const [password, setPassword] = useState("")
    const [submitError,setSubmitError] = useState("")
    const [login,setLogin] = useState("login")
    const submit = async() => {
        setLogin("loging in.... ")

        setIdError("")
        setPasswordError("")
        //validation on username
        if(id === "" ){
            setIdError("Please enter your username or email")
            return
        }

        //validation on password
        if(password === "" ){
            setPasswordError("Please enter your password")
            return
        }

       try {
            const response = await axios.post('/api/user/login',{
                id:id,
                password:password
            })
            if(response.data.message === "user not found"){
                setIdError("User not found")
                return
            }

            if(response.data.message === "Invalid password"){
                setPasswordError("Invalid password")
                return
            }

            if(response.data.message === "login successful"){
                // console.log(response.data.message)
                router.push('/profile')
            }
               setLogin('login') 
            // console.log(response)
       } catch (error:any) {
            console.log(error.message)
            setSubmitError("something went wrong please try again")
            setLogin("login")
            return
 
       }

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
                        onFocus={()=>setIdError("")}
                        placeholder='USERNAME / EMAIL'
                        type="text" 
                        className='rounded focus:outline-none w-[100%] text-heroBlue  font-medium text-xs py-1 pl-1'/>
                        <p className='text-xs text-red-700 font-normal h-2 pt-2'>{idError}</p>
                    </div>
                    <div className='w-[100%]'>
                        <p className='font-normal text-xs opacity-65 mb-2'>PASSWORD</p>
                        <input 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        onFocus={()=>setPasswordError("")}
                        placeholder='PASSWORD'
                        type="password" 
                        className='rounded focus:outline-none w-[100%] text-heroBlue font-medium text-xs py-1 pl-1'/>
                        <p className='text-xs text-red-700 font-normal h-2 pt-2'>{passwordError}</p>
                    </div>
                    <div className='flex flex-col'>
                        <button 
                        className='border p-2 rounded-xl hover:bg-[rgba(255,255,255,0.2)]'
                        onClick={submit}
                        >{login}</button>
                        <Link href="/signin" className='font-medium text-xs text-center mt-3 opacity-30 hover:opacity-80 duration-300'>create new account</Link>
                        <p className='text-xs text-red-700 font-normal h-2 pt-2 text-center'>{submitError}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
