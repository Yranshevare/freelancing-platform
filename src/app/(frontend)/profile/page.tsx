"use client"
import React, { useState } from 'react'
import Header from '@/components/header'

export default function page() {

    const [username,setUsername] = useState("ysdnesh")
    const [bio,setBio] = useState("lorem ipsum dolor sit ametjhguyngcudyu nguyn guygyu guhg hjgfy gjk hjgg uyg hhjgyug hjhg ")
    const [linkOne,setLinkOne] = useState("linksOne")
    const [linkTwo,setLinkTwo] = useState("linksTwo")
    // const [image,setImage] = useState("/loading_page_img.jpg") //url of img
    const [image,setImage] = useState("")
  return (
    <>
       <div className='flex flex-col items-center justify-center bg-heroBlue'>
            {/* div for hero section */}
            <div className='w-full h-[70vh] '>
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
                            <button className='border p-2 rounded-xl hover:bg-[rgba(255,255,255,0.2)] w-full '>edit profile</button>
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
                    <button className='p-2'>Add project</button>
                </div>
                <div>
                    
                </div>
             </div>
       </div>
    </>
  )
}
