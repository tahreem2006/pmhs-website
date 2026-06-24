import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const Navbar = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;
  
  const fullName = user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user?.username || "Student";

  return (
    <div className="flex items-center justify-end mr-5 gap-2 p-4">
        
     
        <div className="flex flex-col text-right">
          <span className="font-medium text-slate-800 leading-tight">{fullName}</span>  
          <span className="text-gray-500 text-xs capitalize">{role}</span>  
        </div>

        
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-slate-200 shrink-0">
           <Image
            src={user?.imageUrl || "/noavatar.jpg"} 
            alt="User Avatar" 
            className="w-full h-full object-cover" 
            width={40} 
            height={40} 
          />
        </div>

      
        <SignOutButton>
          <button className="bg-red-50 mx-2 text-red-600 hover:bg-red-100 p-2 rounded-xl transition-colors shrink-0 flex items-center justify-center">
           <Image src="/logout.png" alt="Logout" width={20} height={20} /> 
          </button>
        </SignOutButton>

    </div>
  );
}

export default Navbar;