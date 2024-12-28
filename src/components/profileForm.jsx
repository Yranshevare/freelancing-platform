import React from 'react'

export default function ProfileForm() {
  return (
    <div className='flex flex-col items-center justify-around h-[700px] rounded-xl my-8 bg-cardBackground w-1/2 '>
        <div className='w-[95%] border-b text-center h-[25%] flex  items-center justify-center my-2 pb-3'>
            <div className='w-[100%] flex flex-col items-center justify-center'>
                <input type="file"  id='inputImage' className='hidden'/>
               
                <div className='w-40 h-40 border rounded-[50%] flex items-center justify-center'>
                    <label 
                    htmlFor="inputImage" 
                    className='hover:cursor-pointer h-full w-full flex items-center justify-center rounded-[50%]'>
                        <div className='w-[95%] h-[95%] bg-[rgba(255,255,255,0.2)] rounded-[50%]'>
                        
                        </div>
                    </label>
                </div>
            </div>
        </div>
        <div className=' flex justify-center flex-col my-2 w-[95%]'>
            <p className='font-normal text-sm opacity-65'>Your Name*</p>
            <input 
            type="text" 
            className='w-[100%] rounded-md font-normal text-sm pl-1 focus:outline-none text-heroBlue py-1'
            placeholder="Name" />
            <br />
            <p className='font-normal text-sm opacity-65'>bio*</p>
            <textarea 
            name="bio" 
            id="bio"
            placeholder='bio'
            rows="4"
            className='w-[100%]  rounded-md font-normal text-sm pl-1 focus:outline-none text-heroBlue py-1'
            ></textarea>
        </div>
        <div className=' flex justify-center flex-col my-2 w-[95%]'>
            <p className='font-normal text-sm opacity-65'>links</p>
            <input 
            type="text" 
            className='w-[100%] rounded-md font-normal text-sm pl-1 focus:outline-none text-heroBlue py-1 mb-2'
            placeholder='link one'/>
            <input 
            type="text" 
            className='w-[100%] rounded-md font-normal text-sm pl-1 focus:outline-none text-heroBlue py-1'
            placeholder='link two'/>
        </div>
        <div className=' flex justify-center flex-col my-2 w-[95%]'>
            <button className='border p-2 rounded-xl hover:bg-[rgba(255,255,255,0.2)] '>save</button>
        </div>
    </div>
  )
}
