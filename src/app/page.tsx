'use client'

import Image from "next/image";
import Header from '../components/header.jsx'
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();
  return (
    <>
     <div className=" bg-[url('/loading_page_img.jpg')] w-screen h-screen bg-cover bg-center">
      <Header/>
      <div className="flex flex-col items-center justify-center mt-28">
        <div></div>
        <button 
        className="p-2 bg-white rounded text-black"
        onClick={()=>router.push('/login')}
        >logIn</button>
      </div>

     </div>
    </>
  );
} 
