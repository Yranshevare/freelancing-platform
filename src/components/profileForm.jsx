import React, { useEffect, useState } from 'react'

export default function ProfileForm() {
    const [name,setName] = useState("")
    const [bio,setBio] = useState("")
    const [linkOne,setLinkOne] = useState("")
    const [linkTwo, setLinkTwo] = useState("")
    const [bioCharCount,setBioCharCount] = useState(0)
    const [bioCounterError,setBioCounterError] = useState("text-gray-400")
    const [nameError,setNameError] = useState("")
    const [bioError,setBioError] = useState("")

    useEffect(()=>{
        setBioCharCount(bio.length)
        if(bio.length > 250){
            setBioCounterError("text-red-700")
        }else{
            setBioCounterError("text-gray-400")
        }
    },[bio])


    function validations(){
        if(name.trim() === "" || bio.trim() === "" ){
            setNameError("All fields are required")
            setBioError("All fields are required")
            return false
        }
    }

    function submit(){
        // console.log(name,bio,linkOne,linkTwo)
        if(!validations()){
            return
        }


    }
  return (
    <div className='flex flex-col items-center justify-around h-[900px] rounded-xl my-8 bg-cardBackground w-1/2 '>
        <div className='w-[95%] border-b text-center h-[25%] flex  items-center justify-center my-2 pb-3'>
            <div className='w-[100%] flex flex-col items-center justify-center'>
                <input type="file"  id='inputImage' className='hidden'/>
               
                <div className='w-40 h-40 border rounded-[50%] flex items-center justify-center'>
                    <label 
                    htmlFor="inputImage" 
                    className='hover:cursor-pointer h-full w-full flex items-center justify-center rounded-[50%]'>
                        <div className='w-[95%] h-[95%] bg-[rgba(255,255,255,0.2)] flex items-center justify-center rounded-[50%]'>
                                    <p className='font-normal text-sm opacity-65'>set profile image</p>
                        </div>
                    </label>
                </div>
            </div>
        </div>
        <div className=' flex justify-center flex-col my-2 w-[95%]'>
            <p className='font-normal text-sm opacity-65'>YOUR NAME*</p>
            <input 
            type="text"
            value={name}
            onChange={(e)=> setName(e.target.value)} 
            onFocus={()=>setNameError("")}
            className='w-[100%] rounded-md font-normal text-sm pl-1 focus:outline-none text-heroBlue py-1'
            placeholder="Name" />
            <p className='text-xs text-red-700 font-normal h-2'>{nameError}</p>
            <br />
            <p className='font-normal text-sm opacity-65'>BIO*</p>
            <textarea 
            name="bio" 
            id="bio"
            placeholder='bio'
            rows="4"
            value={bio}
            onChange={(e)=> setBio(e.target.value)}
            onFocus={()=> setBioError("")}
            className='w-[100%]  rounded-md font-normal text-sm pl-1 focus:outline-none text-heroBlue py-1'
            ></textarea>
            <div className='flex'>
                <p className='w-1/2 text-xs text-red-700 font-normal h-2'>{bioError}</p>
                <p className={`text-end font-normal text-xs w-1/2 mt-2 ${bioCounterError}`}>{bioCharCount}/250</p>
            </div>
        </div>
        <div className=' flex justify-center flex-col my-2 w-[95%]'>
            <p className='font-normal text-sm opacity-65'>LINKS</p>
            <input 
            type="text"
            value={linkOne}
            onChange={(e)=> setLinkOne(e.target.value)} 
            className='w-[100%] rounded-md font-normal text-sm pl-1 focus:outline-none text-heroBlue py-1 mb-2'
            placeholder='link one'/>
            <input 
            type="text" 
            value={linkTwo}
            onChange={(e)=> setLinkTwo(e.target.value)}
            className='w-[100%] rounded-md font-normal text-sm pl-1 focus:outline-none text-heroBlue py-1'
            placeholder='link two'/>
        </div>
        <div className=' flex justify-center flex-col my-2 w-[95%]'>
            <button 
            onClick={submit}
            className='border p-2 rounded-xl hover:bg-[rgba(255,255,255,0.2)] '>save</button>
        </div>
    </div>
  )
}
