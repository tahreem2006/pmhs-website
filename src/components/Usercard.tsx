import Image from "next/image";
import prisma from "@/lib/prisma";
import Link from "next/link"; // Added for the interactive link

const cardConfig = {
  admin: {
    title: "System Admins",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    styles: {
      bg: "bg-gradient-to-br from-purple-50 to-white",
      iconBox: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
      glow: "hover:shadow-purple-100",
      border: "border-purple-100",
      trend: "text-purple-600 bg-purple-100",
    }
  },
  teacher: {
    title: "Teaching Staff",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    styles: {
      bg: "bg-gradient-to-br from-blue-50 to-white",
      iconBox: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
      glow: "hover:shadow-blue-100",
      border: "border-blue-100",
      trend: "text-blue-600 bg-blue-100",
    }
  },
  student: {
    title: "Enrolled Students",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    styles: {
      bg: "bg-gradient-to-br from-emerald-50 to-white",
      iconBox: "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
      glow: "hover:shadow-emerald-100",
      border: "border-emerald-100",
      trend: "text-emerald-600 bg-emerald-50",
    }
  }
};

const Usercard = async ({ type }:{ type: "admin" | "teacher" | "student" }) => {
  const modelMap = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
  };
  
  const data = type === "admin" 
  ? await prisma.admin.count()
  : type === "teacher"
  ? await prisma.teacher.count()
  : await prisma.student.count();
  const config = cardConfig[type];

  return (
    <div className={`group relative flex flex-col p-6 flex-1 rounded-2xl border ${config.styles.border} ${config.styles.bg} shadow-sm hover:shadow-xl ${config.styles.glow} transition-all duration-300 ease-out cursor-pointer overflow-hidden`}>
   
      <div className="flex items-start justify-between z-10">
     
        <div className={`p-3 rounded-xl transition-all duration-300 ease-out ${config.styles.iconBox} group-hover:scale-110 group-hover:-rotate-3`}>
          {config.icon}
        </div>
        
     
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${config.styles.trend}`}>
          Active
        </span>
      </div>

     
      <div className="mt-8 z-10 flex flex-col gap-1">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          {data}
        </h1>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {config.title}
          </h2>
          
           
        </div>
      </div>

    </div>
  );
};

export default Usercard;