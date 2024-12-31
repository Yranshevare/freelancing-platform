import React, { useState,useEffect, useCallback } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function Header({user}) {
  const [Username,setUsername] = useState("FreeLync"  )
  const [signin,setSignin] = useState(true )
  const [searchButton,setSearchButton] = useState(false)

  const router = useRouter()
  // console.log(user)
  useEffect(() =>{
    if(user){
      setSignin(false)
      setSearchButton(true)
    }

    if (user?.profileUser?.[0]?.username) {
      setUsername(user.profileUser[0].username);
    }
  },[user])


  const logout = useCallback(async () => {
    // console.log("User logged out")
    const response = await axios.get('/api/user/logout')
    router.push('/login')

  },[])
  return (
    <div className='h-11 bg-cardBackground text-white flex'>
        <div className="w-1/2 flex items-center justify-center cursor-default">@{Username}</div>
        
        <div className='w-1/2 flex items-center justify-around '>
            {/* <Link href="/signin" className='hover:text-gray-400 hover:scale-110 duration-200'>search </Link> */}
            {
            searchButton? (
              <button className='hover:text-gray-400 hover:scale-110 duration-200'>search</button>
            ) : null
        }
            
            
            <Link href="/aboutUs" className='hover:text-gray-400 hover:scale-110 duration-200'>about us </Link>
            <Link href="#" className='hover:text-gray-400 hover:scale-110 duration-200'>contact us </Link>
            {
              signin? (
                <Link href="/signin" className='hover:text-gray-400 hover:scale-110 duration-200'>signin </Link>
              ) : (
                <Link 
                onClick={logout}
                href="#" 
                className='hover:text-gray-400 hover:scale-110 duration-200'>logout </Link>
              )
            }

        </div>
    </div>
  )
}
