import React, { useState } from 'react'

export default function ProjectCard({projectId}) {
    const [image,setImage] = useState('/loading_page_img.jpg')
  return (
    <div className='w-80 h-[450px] rounded-lg border flex flex-col items-center p-2 border-gray-800 m-2 cursor-pointer hover:shadow-2xl duration-75 text-black'>
            <div className='h-1/2 border-b border-b-gray-800 pt-2 w-full'>
                <div className='w-full h-full flex justify-center'>
                    <div id='image' className={`  rounded-t w-[95%] h-full bg-cover bg-center`}>
                        <img src={image} alt=""  className='h-full rounded-t'/> 
                    </div>
                </div>
                <div id='overlap' className='relative w-full h-full  bg-gradient-to-t from-white to-transparent top-[-100%] left-0 z-10 '></div>  
            </div>
            <div className='h-1/2 w-[95%]'>{projectId}</div>
    </div>
  )
}
