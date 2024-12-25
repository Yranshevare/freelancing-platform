import Image from "next/image";

export default function Home() {
  return (
    <>
      <div
       className="h-screen w-screen flex items-center justify-center bg-white text-black "
      >
        <div className="h-1/2 border border-green-500 bg-green-200 flex items-center justify-center w-1/2">
          <button className="py-2 bg-pink-200 px-2 rounded hover:bg-pink-500">signin/login</button>
        </div>
      </div>
    </>
  );
}
