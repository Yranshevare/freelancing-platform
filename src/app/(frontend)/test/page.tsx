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

export default function Page() {
    const [password, setPassword] = useState("password")
    const [hashedPassword, setHashedPassword] = useState("")

    const hashPassword = async () => {
        try {
            // Sending the password to the server to hash it
            const response = await axios.post('/api/test', { password })
            
            // Setting the hashed password from the response
            setHashedPassword(response.data.hashedPassword)
        } catch (error) {
            console.error("Error hashing password:", error)
        }
    }

    return (
        <div>
            <p>Password: {password}</p>
            <p>Hashed Password: {hashedPassword}</p>
            <button onClick={hashPassword}>Hash Password</button>
        </div>
    )
}
