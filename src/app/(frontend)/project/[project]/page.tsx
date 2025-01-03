'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Header from '@/components/header'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function page({params}:any) {
  const [title,setTitle] = useState("title")
  const [description,setDescription] = useState("description")
  const [completion,setCompletion] = useState("completion")
  const [haring,setHaring] = useState("haring")
  const [skill,setSkill] = useState("skill")
  const[link,setLink] = useState("")
  const[linkEdit,setLinkEdit] = useState("edit")
  const [linkInput,setLinkInput] = useState(true)
  const [allowLoad,setAllowLoad] = useState(false)
  const [deleting,setDeleting] = useState("delete")
  const router = useRouter()

  
  
  const loadInfo = async() => {
    const projectId = params.project;
    try {
      const response = await axios.post('/api/project/get',{projectId})

      setTitle(response.data.project.title)
      setDescription(response.data.project.description)
      setCompletion(response.data.project.completionStatus)
      setHaring(response.data.project.haringStatus)
      setSkill(response.data.project.skills)
      setLink(response.data.project.link || "")
      
      setAllowLoad(true)

    } catch (error:any) {
      console.error('error loading project', error.message)
    }
  }


  useEffect(()=>{
    loadInfo()
  },[])

  const editLinkBut = useCallback(async() => {

    const projectId = params.project;

    setLinkInput(prev => !prev  )
    setLinkEdit("save")
  

    if(linkEdit == "save" && link.length > 0 ){
      alert(`confirm saving your link as: ${link} if no then refresh your page`)
      setLinkEdit("saving...")
      const response = await axios.post('/api/project/saveLink',{projectId: projectId, link: link})
      
    }
    if(linkInput){
      setLinkEdit("save")
    }else{
      link.length > 0 ?setLinkEdit("edit") :setLinkEdit("add")
    }


  },[linkEdit,link])




  const deleteProject = useCallback(async() => {
      setDeleting("deleting...")
    try {
      const projectId =await params.project;
        const response = await axios.post('/api/project/delete',{projectId})  
        console.log(response)
        setDeleting("deleted")
        router.push('/profile')
    } catch (error:any) {
      console.log("error while deleting project",error.message);
    }
  },[params.project])


  /*
    display whole project
    add link option
    edit project option
    delete project option
  */
  return (
    allowLoad == true ? 
    <div className='w-full h-screen text-black flex flex-col items-center  bg-white'>
    <div className='w-[90%] h-full mt-10'>
      <h1 className='mb-5 font-bold text-xl text-center'>{title}</h1>
      <hr />
      <h1 className='mt-2 '>DESCRIPTION:-</h1>
      <p className='ml-4 mb-5'>{description}</p>
      <hr />
      <div className='flex my-5 w-[95%] bg-blue-100 rounded-xl'>
        <p className='w-1/2 text-center p-4 '>{completion}</p>
        <p className='w-1/2 text-center p-4 '>{haring}</p>
      </div>
      <hr />
      <div className='my-5'>
        <h1 className=''>SKILLS:-</h1>
        <p className='ml-4'>{skill}</p>
      </div>
      <hr />
      <div className='my-5 flex h-8'>
        <input 
        value={link}
        onChange={(e)=>setLink(e.target.value)}
        type="text" 
        placeholder='add your link here....'
        disabled={linkInput} 
        className=' border h-full pl-2 w-[90%] rounded-l-lg border-r-0 focus:outline-none border-black'/>
        <button 
        onClick={editLinkBut}
        className='w-[10%] border border-black border-l-0 bg-gray-300 rounded-r-lg hover:bg-gray-500'>{linkEdit}</button>
      </div>
      <hr />
      <div className='flex justify-around py-5'>
        <button className='w-[40%] rounded-md border border-black hover:bg-gray-300'>edit</button>
        <button 
        onClick={deleteProject}
        className='w-[40%] rounded-md border border-black bg-red-300 hover:bg-red-400'>{deleting}</button>
      </div>
    </div>
  </div>
  :
  <div className='flex flex-col items-center justify-center h-screen bg-white'>
    <div className='w-[80%] h-full'>
      <h1 className='text-xl text-black text-center'>Loading...</h1>
    </div>
  </div>
  )
}
  