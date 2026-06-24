import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Calender from "@/components/BigCalenderContainer";
import Annoncement from "@/components/notices/AnnoucementBox";
import PieChart from "@/components/ClassPieChart";
import FormModal from '@/components/FormModal';
import { auth } from "@clerk/nextjs/server";
import type { Teacher } from '@prisma/client';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
const page = async({params}:{params:{id:string}}) => {

    const {userId,sessionClaims}=await auth();//finding who is sign-in
    const role=( sessionClaims?.metadata as {role?:string })?.role; 
    if (!userId) {
        return redirect("/sign-in");
      }
    const teacher:(Teacher & {_count: {subjects:number ;classes:number} } ) | null =await prisma.teacher.findUnique({
        where:{
            id:params.id,//finding who is the teacher from the url
        },
        include:{
        _count:{
            select:{
                subjects:true,
                classes:true

            }
        }
    }
    })
    if(!teacher)
    {
        return notFound();
    }
  return (
    <div className='flex flex-col flex-1 gap-4 lg:flex-row m-2'>
      <div className='w-full lg:w-2/3 flex flex-col gap-4 '>
      <div className='w-full flex flex-1 gap-3 flex-col lg:flex-row '>

            <div className='bg-blue-200 w-full lg:w-2/3 gap-2 flex py-6 px-4 rounded-2xl '>
                <div className='w-1/3 w-30 h-30 flex  justify-left  items-center'>
                <Image className="w-36 h-36 rounded-full object-cover " src={teacher.img || "/noavatar.jpg"} alt="" width={144} height={144}/>
                </div>
                <div className='w-2/3 '>
                   <div className='flex flex-col items-start justify-start gap-2'>
                    <div className='flex gap-2 items-center'>
                    <h3 className='text-bold text-m font-semibold capitalize'>{teacher.name + " " + teacher.surname} </h3>
                    {role === "admin" && (        <FormModal table="teacher" type="edit" data={teacher}/>)}
                    </div>
                   
                    <span className='text-gray-500 text-xs mb-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit ratione sint numquam, illum, porro rerum, delectus perspiciatis magnam earum nam voluptatem et corrupti quisquam reprehenderit nesciunt itaque nulla laborum reiciendis. </span>
                    <div className='flex gap-3'>
                        <Image src="/date.png" alt="" width={16} height={16}/> 
                        <span>12/03/2006</span>
                    </div>
                    <div className='flex gap-3'>
                        <Image src="/phone.png" alt="" width={16} height={16}/> 
                        <span>{teacher.phone}</span>
                    </div>
                  {(teacher.email) &&   <div className='flex gap-3'>
                        <Image src="/mail.png" alt="" width={16} height={16}/> 
                        <span>{teacher.email}</span>
                    </div>
}
                   </div>
                </div>
            </div>

            <div className=' flex flex-1  w-full lg:w-1/3 sm:flex-col  '>
