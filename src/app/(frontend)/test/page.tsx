// 'use client'
// import React, { useState } from 'react'
// import axios from 'axios'
// export default function page() {
//     const [test , setTest] = useState("password")
//     axios.get('/api/test',test)
//   return (
//     <div>
//       <p>{test}</p>
//       <button onClick={hash}>hash</button>
//     </div>
//   )
// }


'use client'
import React, { useState } from 'react'
import axios from 'axios'
import ProfileForm from '@/components/profileForm'

export default function Page() {
    
    async function getToken(){
        try{
            const response = await axios.get('/api/test')
            console.log(response)
        }catch(error){
            console.error('Error:',error)
        }
    }
    return (
        <div className='flex items-center justify-center bg-heroBlue h-full'>
            <button
            onClick={getToken}
            >click</button>
        </div>
    )
}
