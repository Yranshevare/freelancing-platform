'use client'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

export default function AddProjectForm( {cancel}) {
    const [file,setFile] = useState("")
    const [fileError,setFileError] = useState("")
    const [image,setImage] = useState('/loading_page_img.jpg')
    const [title, setTitle] = useState("");
    const [titleError,setTitleError] = useState("")
    const [description, setDescription] = useState("");
    const [descriptionError,setDescriptionError] = useState("")
    const [skills, setSkills] = useState("")
    const [skillsError,setSkillsError] = useState("")
    const [completionStatus, setCompletion] = useState(1); 
    const [haringState,setHaringState] = useState(1)
    const[save,setSave] = useState('save')
    const [saveError,setSaveError] = useState("")

    const handleChange = useCallback((event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    },[])
    useEffect(()=>{
      async function setImageTOLocalServer(){
        console.log(file)
        
      }
      setImageTOLocalServer()
    },[file])
    
    function validation(){
      // console.log("valid function")
      let valid = true
       if(title.trim() === ""){
        // console.log("title")
        setTitleError("Title is required")
        valid = false
       }
       if(description.trim() === ""){
        // console.log("description")
        setDescriptionError("Description is required")
        valid = false
       }
       if(skills.trim() === ""){
        // console.log("skills")
        setSkillsError("Skills are required")
        valid = false
       }
       if(!file){
        // console.log("file")
        setFileError("Please select a file")
        valid = false
       }

      if(title.trim() === "" || description.trim === "" || skills.trim === "" || !file){
        return false
      }
       return valid
    }
    const saveInfo = async () => {
      console.log(skills)
        setSave("saving...")
        setSaveError("")

        if(!validation()){
          setSaveError("All fields are required")   
          setSave("save")
          return
        }
        setFileError("")
        try {
          let imgUrl
          if(file){
            const data = new FormData()
            data.set('file',file)
            const response = await axios.post('/api/project/addImageToLocalServer',data)
            console.log(response)
            // setImage(response.data.url)
            imgUrl = response.data.data.url
            console.log(imgUrl)
  
          }

          const response = await axios.post('/api/project/add',{
            title:title, 
            description:description, 
            skills:skills,
            completionStatus:completionStatus, 
            hiringState:haringState,
            image:imgUrl,
          })
          // console.log(response)
          cancel()
          setSave("saved successfully")
        } catch (error) {
          setSaveError("something went wrong please try again")
        }
    }
    
  return (
    <div className='form-background'>
        <div className='form-card'>
            <div className='h-1/3 border-b border-b-gray-300 pb-2 flex flex-col items-center justify-center'>
                <input
                className='hidden'
                id='inputImage'
                onChange={handleChange} 
                type="file" />
                <label 
                className='h-[90%] w-[90%] bg-cardBackground rounded cursor-pointer'
                htmlFor="inputImage">
                    {
                      image.length > 0? (
                        <img src={image} alt="" className='w-full h-full  bg-cover' />
                      ) : (
                        <button className='w-full h-full rounded-[50%] bg-cardBackground'>
                          upload image
                        </button>
                      )
                    }
                </label>
                <p className='form-input-error'>{fileError}</p>
            </div>
            <div className='mt-2'>
                <p className='form-p'>TITLE*</p>
                <input 
                value={title}
                onFocus={()=>setTitleError("")}
                onChange={(e)=>setTitle(e.target.value)}
                className='form-input focus:outline-none'
                type="text" 
                placeholder='enter title'/>
                <p className='form-input-error'>{titleError}</p>
                <br />
                <p className='form-p'>DESCRIPTION*</p>
                <textarea
                value={description}
                onFocus={()=>setDescriptionError("")}
                onChange={(e)=>setDescription(e.target.value)}
                rows= "4"
                className='form-input focus:outline-none'
                placeholder='enter description'/>
                <p className='form-input-error'>{descriptionError}</p>    
                
            </div>
            <div className='mt-3'>
                <p className='form-p'>TECHNOLOGY USED IN THIS PROJECT*</p>
                <input 
                value={skills}
                onFocus={()=>setSkillsError("")}
                onChange={(e)=>setSkills(e.target.value)}
                className='form-input focus:outline-none'
                placeholder ='Enter skills '
                type="text" />
                <p className='form-input-error'>{skillsError}</p>
            </div>
            <div className='flex justify-between mt-3'>
                <div className='w-1/2'>
                    <p className='form-p'>STATUS OF YOUR PROJECT</p>
                    <div className="flex py-2">
                        <input
                          className="mx-3"
                          type="radio"
                          checked={completionStatus === 1}  // Check if the status is 'pending'
                          onChange={() => setCompletion(1)}  // Set completion status to 'pending' (1)
                        />
                        <p onClick={() => setCompletion(1)} className="form-p cursor-pointer">pending</p>
                    </div>
      
                    <div className="flex py-2">
                      <input
                        className="mx-3"
                        type="radio"
                        checked={completionStatus === 2}  // Check if the status is 'ongoing'
                        onChange={() => setCompletion(2)}  // Set completion status to 'ongoing' (2)
                      />
                      <p onClick={() => setCompletion(2)} className="form-p cursor-pointer">ongoing</p>
                    </div>

                    <div className="flex py-2">
                      <input
                        className="mx-3"
                        type="radio"
                        checked={completionStatus === 3}  // Check if the status is 'completed'
                        onChange={() => setCompletion(3)}  // Set completion status to 'completed' (3)
                      />
                      <p onClick={() => setCompletion(3)} className="form-p cursor-pointer">completed</p>
                    </div>
                    
                </div>
                <div className='w-1/2'>
                <p className='form-p'>HARING STATUS</p>
                    <div className="flex py-2">
                      <input
                        className="mx-3"
                        type="radio"
                        checked={haringState === 1}  // Check if the status is 'completed'
                        onChange={() => setHaringState(1)}  // Set completion status to 'completed' (3)
                      />
                      <p onClick={() => setHaringState(1)} className="form-p cursor-pointer">not haring any one</p>
                    </div>
                    <div className="flex py-2">
                      <input
                        className="mx-3"
                        type="radio"
                        checked={haringState === 2}  // Check if the status is 'completed'
                        onChange={() => setHaringState(2)}  // Set completion status to 'completed' (3)
                      />
                      <p onClick={() => setHaringState(2)} className="form-p cursor-pointer">up for haring</p>
                    </div>
                </div>
            </div>
            <div>
                <button 
                onClick={saveInfo}
                className='form-save-but w-full'>{save}</button> 
                <p className='form-input-error text-center'>{saveError}</p> 
            </div>
        </div>
    </div>
  )
}
