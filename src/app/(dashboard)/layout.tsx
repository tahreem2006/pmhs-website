import type { Metadata } from "next";
import Link from "next/link"
import Menu from "@/components/Menu";
import Navbar   from "@/components/Navbar";
import Image  from "next/image"
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "random school",
  description: "Next.js  random School Management System",
};

export default function dashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
   <div className="flex h-screen w-screen">
      <div className="  px-1 py-2  w-[14%]    "><Link href="\" className="flex md:justify-start md:items-start justify-center items-center  gap-1" > <Image src="/logo.png"  alt="logo" width={32} height={32}></Image> <span className="hidden lg:block   font-semibold  " >randomschool</span></Link> 
      
      <Menu/>
       </div>

      <div className="w-[86%]   overflow-scroll bg-[#F7F8FA]">
        <Navbar/>
      {children}
      </div>
   </div>
  );
}
