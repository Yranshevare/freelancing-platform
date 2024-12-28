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
    

    return (
        <div className='flex items-center justify-center bg-heroBlue h-full'>
            <ProfileForm />
        </div>
    )
}
