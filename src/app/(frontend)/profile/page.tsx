"use client"
import React, { useEffect, useState } from 'react'
import Header from '@/components/header'
import ProfileForm from '@/components/profileForm'

export default function page() {

    const [username,setUsername] = useState("ysdnesh")
    const [bio,setBio] = useState("lorem ipsum dolor sit ametjhguyngcudyu nguyn guygyu guhg hjgfy gjk hjgg uyg hhjgyug hjhg ")
    const [linkOne,setLinkOne] = useState("linksOne")
    const [linkTwo,setLinkTwo] = useState("linksTwo")
    // const [image,setImage] = useState("/loading_page_img.jpg") //url of img
    const [image,setImage] = useState("")
    const [butClick,setButClick] = useState(0)
    const [opacity,setOpacity] = useState("flex")
    const [display,setDisplay] = useState("hidden")

    const cancelBut = () => {
      setDisplay("hidden")
      setOpacity("flex")
      setButClick(0)
    }
    
    const openEditProfile = () => {
      setDisplay("flex")
      setOpacity("hidden")
      setButClick(1)
    }
   
  return (
    <>
      <div className={`${display} w-full flex flex-col items-center bg-heroBlue justify-center pt-11`}>
        <div className='w-full flex justify-end'>
          <button 
          onClick={cancelBut}
          className='h-14 w-14 flex items-center justify-center mr-11 rounded-[50%] opacity-55 bg-red-500 text-white'>X</button>
        </div>
        <ProfileForm/>
      </div>
       <div className={` flex-col items-center absolute top-0 w-full justify-center bg-heroBlue ${opacity}`}>
            {/* div for hero section */}
            <div className= 'w-full h-[70vh]'>
                 <Header/>
                 <div className='w-full h-[500px] flex items-center justify-center  mt-16'>
                    <div className='w-1/2 flex flex-col  justify-around  pl-4'>
                        <h2 className='text-2xl h-[50px] font-bold border-b border-b-gray-500 pb-3'>{username}</h2>
                        <p className='font-normal text-base py-1 text-gray-400'>{bio}</p>
                        
                        {/* div for links */}
                        <div className='w-1/2 flex flex-col py-2'>
                            {
                                linkOne.length > 0 && (
                                    <a href={linkOne} target='_blank' rel="noopener noreferrer">
                                      {linkOne}
                                    </a>
                                )
                            }

                            {
                                linkTwo.length > 0 && (
                                    <a href={linkTwo} target='_blank' rel="noopener noreferrer">
                                      {linkTwo}
                                    </a>
                                )
                            }
                        </div>
                        <div>
                            <button 
                            onClick={openEditProfile}
                            className='border p-2 rounded-xl hover:bg-[rgba(255,255,255,0.2)] w-full '>edit profile</button>
                        </div>

                    </div>
                    <div className='w-1/2 flex items-center justify-center'>
                        <div className='w-[400px] h-[400px] rounded-[50%]  border  border-gray-500 flex items-center justify-center'>

                            {/* div for image */}
                            <div className='w-96 h-96 rounded-[50%] bg-center bg-cover'>
                                {
                                     image.length > 0 ? (
                                        <img src={image} alt="" className='w-96 h-96 rounded-[50%] bg-white' />
                                      ) : (
                                        <button className='w-96 h-96 rounded-[50%] bg-circle'>
                                          imh
                                        </button>
                                      )
                                }
                            </div>
                            
                        </div>
                    </div>
                 </div>
             </div>

             {/* div for project section */}
             <div className='w-full shadow-top bg-white text-black flex flex-col items-center'> 
                <div className='flex justify-between w-[90%]'>
                    <h2 className='p-2 font-black text-2xl text-gray-600'>projects</h2>
                    <button 
                    onClick={() => setButClick(2)}
                    className='p-2'>Add project</button>
                </div>
                <div>
                    
                </div>
             </div>
       </div>
    </>
  )
}
