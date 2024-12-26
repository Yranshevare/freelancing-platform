'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function page() {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [conformPassword,setConformPassword] = useState("")
  const [usernameError,setUsernameError] = useState("")
  const [emailError,setEmailError] = useState("")
  const [passwordError,setPasswordError] = useState("")
  const [confirmPasswordError,setConfirmPasswordError] = useState("")
  const router = useRouter()

  //validation on username
  useEffect(() => {
    if( username !== "" && username !==username.toLocaleLowerCase()){   //validation for lowercase characters 
      setUsernameError("Username should be in lowercase")
    }else if( username.includes(" ")){    //validation fro spaces
      setUsernameError("Username should not contain spaces")
    }else if( username.match(/[~`!#$%\^&*+=\-\[\]\\';,/{}()|\\":<>\?]/)){   //validation for special characters
      //match() returns an array of all matching special characters, or null if no matches are found.
      setUsernameError("Username should not contain special characters only characters are allowed are @ and _")
    }else{
      setUsernameError("")
    }
  },[username])


  //checking is any field empty or not
  const validation = () => {
    let valid = true
    if(conformPassword === "" ){
      setConfirmPasswordError("")
      valid = false
    }
    if(password === "" ){
      setPasswordError("Password is required")
      valid = false
    }
    if(email === "" ){
      setEmailError("Email is required")
      valid = false
    }
    if(username === "" ){
      setUsernameError("Username is required")
      valid = false
    }
    return valid
  }

  const submit = async() => {
    //validation on email
    if( email === "" ||!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){   
      setEmailError("Invalid email address")
    }else{
      setEmailError("")
    }

    //validation on password
    if( password !== "" && password.length < 8){    //validation for minimum length
      setPasswordError("Password should be at least 8 characters long")
    }else if(password.length > 7 && !password.match(/[~`!#$%\^&*+=\-\[\]\\';,/{}()@_|\\":<>\?]/)){   //validation for special characters
      setPasswordError("password at least contain one special character")
    }else{
      setPasswordError("")
    }
    //validation on conform password 
    if( conformPassword!== "" && conformPassword!== password){   //validation for matching password
      setConfirmPasswordError("Passwords do not match")
    }else{
      setConfirmPasswordError("")
    }

    //validation on states
    if(emailError!== "" || passwordError!== "" || usernameError!== "" || confirmPasswordError!== "" ){
      return
    }
    if(!validation()){
      return
    }
    
   
    
    
    
    console.log("signing in...")
    router.push('/login')
  }
  

  return (
    <>
      <div className='w-screen h-screen bg-heroBlue flex justify-center items-center'>
        <div className='w-1/2 h-[80%] bg-cardBackground rounded-xl flex justify-center items-center'>
          <div className='w-[90%] h-[100%] flex flex-col justify-around'>
            <div className='h-[10%] border-b-[1px] flex items-center'>
              <h2 className='font-bold text-2xl'>Sign In</h2>
            </div>
            <div className='h-[90%]  flex flex-col justify-around'>
              <div className='h-[25%] flex flex-col justify-center'>
                <p className='font-normal text-sm opacity-65'>USERNAME</p>
                <input 
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                onFocus={()=>setUsernameError("")}
                type="text"
                placeholder='USERNAME'  
                className='w-[100%] rounded-md font-normal text-sm pl-1 focus:outline-none text-heroBlue py-1'/>
                <p className='text-xs text-red-700 font-normal h-2'>{usernameError}</p>
              </div>
              <div className='h-[25%] flex flex-col justify-center'>
                <p className='font-normal text-sm opacity-65'>EMAIL</p>
                <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder='EMAIL'
                onFocus={()=>setEmailError("")}  
                className='w-[100%] rounded-md font-normal text-sm pl-1 focus:outline-none text-heroBlue py-1'/>
                <p  className='text-xs text-red-700 font-normal h-2'>{emailError}</p>
              </div>
              <div className='h-[25%] flex flex-col justify-around'>
                <p className='font-normal text-sm opacity-65'>PASSWORD</p>
                <input
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                onFocus={()=>setPasswordError("")} 
                type="password"
                placeholder='PASSWORD'  
                className='w-[100%] rounded-md font-normal text-sm pl-1 focus:outline-none text-heroBlue py-1'/>
                <p className='text-xs text-red-700 font-normal h-2'>{passwordError}</p>
  
                <p className='font-normal text-sm opacity-65'>CONFORM PASSWORD</p>
                <input 
                value={conformPassword}
                onChange={(e)=>setConformPassword(e.target.value)}
                type="password"
                placeholder='CONFORM PASSWORD'  
                className='w-[100%] rounded-md font-normal text-sm pl-1 focus:outline-none text-heroBlue py-1'/>
                <p className='text-xs text-red-700 font-normal h-2'>{confirmPasswordError}</p>
              </div>
              <div className='h-[25%] flex flex-col justify-center'>
                <button 
                onClick={submit}
                className='border p-2 rounded-xl hover:bg-[rgba(255,255,255,0.2)] '>sign in</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
