import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ProfileForm({cancel,user,Name,Bio,LinkOne,LinkTwo,Image}) {
    const [name,setName] = useState( "") 
    const [bio,setBio] = useState("")
    const [linkOne,setLinkOne] = useState("")
    const [linkTwo, setLinkTwo] = useState("")
    const [bioCharCount,setBioCharCount] = useState(0)
    const [bioCounterError,setBioCounterError] = useState("text-gray-400")
    const [nameError,setNameError] = useState("")
    const [bioError,setBioError] = useState("")
    const [saveError,setSaveError] = useState("")
    const [file,setFile] = useState("")
    const [image,setImage] = useState("")
    const [imgAlt,setImageAlt] = useState("set profile image")
    const [save,setSave] = useState("save")
    // console.log(Name,Bio,LinkOne,LinkTwo,Image)
    // console.log(user)
    // console.log('from profile edit form')

    // This code runs on every render, and since it updates the state using setName, setBio, etc., it triggers a re-render, which again runs this code, causing the infinite loop.
    // if (user) {
    //     setName(user.name);
    //     setBio(user.bio);
    //     setLinkOne(user.links[0] || "");
    //     setLinkTwo(user.links[1] || "");
    // }

    // const handleFileChange = (event) => {
    //     const selectedFile = event.target.files[0];
    //     setFile(selectedFile); // Optionally save the file in state
    //   };
    let imageFile 
    useEffect(() => {
        if (user !== "create new user") {
            setName(user.name || "");
            setBio(user.bio || "");
            setLinkOne(user.links[0] || "");
            setLinkTwo(user.links[1] || "");
            setImage(user.image || "") //url of img
            imageFile = file
            
        }
    }, [user]);



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
        }else{
            return true
        }
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile); // Optionally save the file in state\
        // console.log(selectedFile)
        setImage("")    
        setImageAlt("new file uploaded")
      };

      

    async function submit(){
        // console.log(name,bio,linkOne,linkTwo)
        setSave("saving...")
        setSaveError("")
        if(!validations()){
            return
        }

        // console.log("inside try of edit profile form")
        try {
            if(file){
                // console.log(file)
                // setImage(file)
                const data = new FormData()
                // console.log(data)

                data.set('file',file)
                // data.forEach((value, key) => {
                //     console.log(key, value); // Logs the name and content of each field
                // });

                const response = await axios.post('/api/profile/saveProfileImage',data)
                // console.log(response,"from img")
                setFile("")
                
                // console.log(file)
            }
            // console.log('reach to api req')
            const response = await axios.post('/api/profile/save',{
                name:name, 
                bio:bio, 
                linkOne:linkOne, 
                linkTwo:linkTwo
            })
            
            // console.log(response.data.profile.name)
            Name(response.data.profile.name)
            Bio(response.data.profile.bio)
            LinkOne(response.data.profile.links[0] || "")
            LinkTwo(response.data.profile.links[1] || "")
            Image(response.data.profile.image || "")
            setImage(response.data.profile.image  || '')
            // console.log(response.data.profile.image) 
            // console.log(image == response.data.profile.image)
            // console.log(response,"from without img")    
            // console.log(cancel)  
            cancel();
            setSave("save")
            

        } catch (error) {
            // console.log(error.message)
            setSaveError("something went wrong please try again")
            setSave("save")
        }

    }
  return (
    <div className='flex flex-col items-center justify-around h-[900px] rounded-xl my-8 bg-cardBackground w-1/2 '>
        <div className='w-[95%] border-b text-center h-[25%] flex  items-center justify-center my-2 pb-3'>
            <div className='w-[100%] flex flex-col items-center justify-center'>
                <input 
                onChange={handleFileChange}
                type="file"  
                id='inputImage' 
                className='hidden'/>
               
                <div className='w-40 h-40 border rounded-[50%] flex items-center justify-center'>
                    <label 
                    htmlFor="inputImage" 
                    className='hover:cursor-pointer h-full w-full flex items-center justify-center rounded-[50%]'>
                        <div className='w-[95%] h-[95%] flex items-center justify-center rounded-[50%]'>
                                    {/* <p className='font-normal text-sm opacity-65'>set profile image</p> */}
                                    {
                                        image.length>0?
                                        <img className='w-full h-full bg-cover overflow-hidden rounded-[50%] flex justify-center items-center' src={image} alt='Profile Pic'/>
                                        :
                                        <div className='w-full h-full flex items-center justify-center rounded-[50%] bg-[rgba(255,255,255,0.2)] '>
                                            <p className='font-normal text-sm opacity-65'>{imgAlt}</p>
                                        </div>
                                        
                                    }
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
            className='border p-2 rounded-xl hover:bg-[rgba(255,255,255,0.2)] '>{save}</button>
            <p className='w-full text-xs text-red-700 font-normal h-2 text-center pt-3'>{saveError}</p>
        </div>
    </div>
  )
}


export default ProfileForm