 
import { UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"


const navbar = async() => {

  const user=await currentUser();
  const role=user?.publicMetadata?.role as string;
  return (
    <div className="flex items-center justify-between p-4 ">
        <div className="hidden md:flex bg-white p-2 gap-1  border rounded-full   ">
            <Image src="/search.png" alt=""  width={20} height={20}/> 
            <input type="text" className="border-none outline-none w-[60%]" placeholder="Search..." />
        </div>

      <div className="flex gap-7 items-center  justify-end w-full">
        <div>
        <Image src="/message.png" alt=""  width={25} height={25}/> 
        </div>
        <div className="relative ">
        <Image src="/announcement.png" alt=""  width={25} height={25}/> 
        <div className="absolute rounded-full w-5 h-5 -top-3 -right-4 cursor-pointer flex justify-center items-center text-white text-xs bg-purple-500  ">1</div>
        </div>
        <div className="flex flex-col ">
         <span className="">Joe dnoe</span>  
         <span className="text-gray-500 bg-green-50    text-right ">{role}</span>  
       
        </div>
        <div  >
        {/* <Image src="/avatar.png" alt="" className="rounded-full" width={40} height={40}/> */}
         </div>  
        <UserButton/>
      </div>
    </div>
  )
}

export default navbar
