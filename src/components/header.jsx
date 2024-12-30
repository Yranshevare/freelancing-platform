import React, { useState,useEffect } from 'react'
import Link from 'next/link'

export default function Header({user}) {
  const [Username,setUsername] = useState("FreeLync"  )
  // console.log(user)
  useEffect(() =>{
    // if(user){
    //   console.log(user.profileUser[0].username)
    //   setUsername(user.profileUser[0].username)
    // }

    if (user?.profileUser?.[0]?.username) {
      setUsername(user.profileUser[0].username);
    }
  },[user])

  return (
    <div className='h-11 bg-cardBackground text-white flex'>
        <div className="w-1/2 flex items-center justify-center cursor-default">@{Username}</div>
        <div className='w-1/2 flex items-center justify-around '>
            <Link href="/signin" className='hover:text-gray-400 hover:scale-110 duration-200'>signin </Link>
            <Link href="/aboutUs" className='hover:text-gray-400 hover:scale-110 duration-200'>about us </Link>
            <Link href="#" className='hover:text-gray-400 hover:scale-110 duration-200'>contact us </Link>
        </div>
    </div>
  )
}
