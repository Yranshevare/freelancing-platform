// // 'use client'
// // import React, { useState } from 'react'
// // import axios from 'axios'
// // export default function page() {
// //     const [test , setTest] = useState("password")
// //     axios.get('/api/test',test)
// //   return (
// //     <div>
// //       <p>{test}</p>
// //       <button onClick={hash}>hash</button>
// //     </div>
// //   )
// // }


// 'use client'
// import React, { useState } from 'react'
// import axios from 'axios'
// import ProfileForm from '@/components/profileForm'

// export default function Page() {
    
    
//     const [file, setFile] = useState(null);

//     const handleFileChange = (event:any) => {
//       const selectedFile = event.target.files[0];
//       setFile(selectedFile); // Optionally save the file in state
//     };
//     const submit = async() => {
//         console.log(file,'submit clicked');
        

//         try {
//             if(file){
//                 const data = new FormData()
//                 data.set('file',file)
//                 // console.log(data)
//                 const response  = await axios.post('/api/test',data)
//                 console.log(response,"from page.tsx")
//             }
//         } catch (error:any) {
//             console.error('Error:',error.message)
//         }
//     }
//     return (
//         <div className='flex items-center justify-center bg-heroBlue h-full'>
//             <input type="file" name="image" onChange={handleFileChange}/>
//             <button onClick={submit}>submit</button>
//         </div>
//     )
// }



import AddProjectFrom from '@/components/addProjectForm'

import React from 'react'

export default function page() {
  return (
    <>
      <AddProjectFrom/>
    </>
  )




  
}
