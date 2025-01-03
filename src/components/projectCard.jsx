import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function ProjectCard({projectId}) {
    const [image,setImage] = useState('/loading_page_img.jpg')
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const router = useRouter()

    const loadProject = useCallback(async()=>{
      try {
         const response = await axios.post('/api/project/get',{projectId})
        //  console.log(response)
         setImage(response.data.project.image)
         setTitle(response.data.project.title)
         setDescription(response.data.project.description)
      } catch (error) {
            console.log(error)
      }
    },[])

    useEffect(() =>{
      loadProject()
    },[])
  return (
    <div 
    onClick={()=>(router.push(`/project/${projectId}`))}
    className='w-80 h-[450px] rounded-lg border flex flex-col items-center p-2 border-gray-800 m-2 cursor-pointer hover:shadow-2xl hover:scale-105 duration-300 text-black'>
            <div className='h-1/2 border-b border-b-gray-800 pt-2 w-full'>
                <div className='w-full h-full flex justify-center'>
                    <div id='image' className={`  rounded-t w-[95%] h-full bg-cover bg-center`}>
                        <img src={image} alt=""  className='h-full rounded-t'/> 
                    </div>
                </div>
                <div id='overlap' className='relative w-full h-full  bg-gradient-to-t from-white to-transparent top-[-100%] left-0 z-10 '></div>  
            </div>
            <div className='h-1/2 w-[95%] pt-2 flex flex-col justify-center'>
              <div className='font-bold text-xl text-center'>{title}</div>
              <div className='font-normal text-sm text-gray-600 text-center mt-3'>{description}</div>
            </div>
    </div>
  )
}
