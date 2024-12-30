"use client"
import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import ProfilePage from '@/components/profilePage'

export default function page() {

   
    const [profileOwner,setProfileOwner] = useState({})
    const [loadProfile,setLoadProfile] = useState(0)


    const loadInfo = async() =>{
      try {
        const response = await axios.get('/api/profile/get')
        if(response.data.message === "Profile not found"){
          alert("Profile not found create new profile")
          setLoadProfile(2)
          return
        }
        
        setProfileOwner(response.data.profile) 
        // console.log(profileOwner)
        setLoadProfile(1)  
      } catch (error:any) {
        console.log(error.message)
      }
    }

    //loading the user info when you load the page
    useEffect( () => {
      loadInfo()
      
    },[])

  

    
   //first load th user info and then render the profile page in the mean time render the loading page 
  return (
    <>
        {
            (() => {
                if (loadProfile === 0) {
                  return <div className="loading-page">Loading...</div>;
                } 
                if (loadProfile === 2) {
                //   return <profilePage />;
                  return <ProfilePage profile={"create new user"} />;
                  // return <div className="loading-page">Creating new profile...</div>;
                
                } 
                if (loadProfile === 1) {
                  return <ProfilePage profile={profileOwner} />;
                    return <div> profile</div>
                }
              })()
        }
    </>
  )
}
