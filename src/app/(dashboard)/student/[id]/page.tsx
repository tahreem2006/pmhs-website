import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Calender from "@/components/BigCalenderContainer";
import Annoncement from "@/components/AnnoucementBox";
import PieChart from "@/components/ClassPieChart";
import { notFound, redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import type { Class, Student } from '@prisma/client';
import prisma from '@/lib/prisma';
import FormModal from '@/components/FormModal';
const studentpage = async ({params}:{params:{id:string}}) => {
    const {userId,sessionClaims}=await auth();//finding who is sign-in
    const role=( sessionClaims?.metadata as {role?:string })?.role; 
    if (!userId) {
        return redirect("/sign-in");
      }

      const student:(Student &  {class: (Class &{_count:{lessons:number} }) }) | null=await prisma.student.findUnique({
        where:{
            id:params.id,
        },
        include:{
            class:{include:{_count:{select:{lessons:true}}}}
        }
      })
        if(!student)
        {
            return notFound();

        }



  return (
    <div className='flex flex-col flex-1 gap-4 lg:flex-row m-2'>
      <div className='w-full lg:w-2/3 flex flex-col gap-4 '>
      <div className='w-full flex flex-1 gap-3 flex-col lg:flex-row '>

            <div className='bg-blue-200 w-full lg:w-2/3 gap-2 flex py-6 px-4 rounded-2xl '>
                <div className='w-1/3 flex  justify-left  items-center'>
                <Image className="w-36 h-36 rounded-full object-cover " src={student.img || "/noavatar.jpg"} alt="" width={144} height={144}/>
                </div>
                <div className='w-2/3 '>
                   <div className='flex flex-col items-start justify-start gap-2'>
                    <div className='flex flex-col'>
                    <h3 className='text-bold text-m font-semibold capitalize'>{student.name +" "+ student.surname} </h3>
                    {role === "admin" && (<FormModal table="student" type="edit" data={student}/>)}
                    </div>
                    <span className='text-gray-500 text-xs mb-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit ratione sint numquam, illum, porro rerum, delectus perspiciatis magnam earum nam voluptatem et corrupti quisquam reprehenderit nesciunt itaque nulla laborum reiciendis. </span>
                    <div className='flex gap-3'>
                        <Image src="/date.png" alt="" width={16} height={16}/> 
                        <span>12/03/2006</span>
                    </div>
                    <div className='flex gap-3'>
                        <Image src="/phone.png" alt="" width={16} height={16}/> 
                        <span>{student.phone}</span>
                    </div>
                    {student.email && <div className='flex gap-3'>
                        <Image src="/mail.png" alt="" width={16} height={16}/> 
                        <span>{student.email}</span>
                    </div>}

                   </div>
                    
                </div>
            </div>

            <div className=' flex flex-1  w-full lg:w-1/3 sm:flex-col  '>
                <div className='flex flex-1 flex-col gap-2'>

                    <div className='bg-white w-full    flex justify-start gap-2 items-start pt-4 pl-6 pb-6 lg:pb-0 h-full rounded-2xl ' >
                        <div className=' bg-green-400 p-2 rounded-lg'>
                                < Image src="/attendance.png" alt="" width={24} height={24}/>
                            </div>

                            <div>
                                <h2 className='text-lg font-semibold'>
                                   {student.class.name[0]}
                                </h2>
                                <h6 className='text-m text-gray-500'>
                                    Grade
                                </h6>
                            </div>
                            
                             </div>
                             <div className='bg-white w-full pt-4 flex justify-start gap-2  pl-6 pb-6 lg:pb-0 items-start  h-full rounded-2xl ' >
                        <div className=' bg-pink-400 p-2 rounded-lg'>
                                < Image src="/class.png" alt="" width={24} height={24}/>
                            </div>

                            <div>
                                <h2 className='text-lg font-semibold'>
                                    {student.class._count.lessons}
                                </h2>
                                <h6 className='text-m text-gray-500'>
                                    Lessons
                                </h6>
                            </div>
                            
                             </div>

                </div>
                

            </div>
      </div>

      <div><Calender type="classId" id={student.classId}/></div>

      </div>


      <div className='w-full lg:w-1/3 flex flex-col gap-2'>
      <div className='flex flex-col gap-2 p-6 rounded-xl bg-white'>
        <h3 className='text-lg text-black font-semibold'>Shortcuts</h3>
      <div className='flex flex-wrap  gap-4 rounded-xl bg-white '>
          <Link className="py-2 px-6 bg-pink-200 rounded-xl text-gray-600" href={`/list/subject?classId=6a086917d4e821b5f3e12e26`}>Subject</Link> 
          <Link className="py-2 px-6 bg-purple-200 rounded-xl text-gray-600"  href={`/list/teacher?classId=6a086917d4e821b5f3e12e26`}>Teacher</Link> 
          <Link  className="py-2 px-6 bg-green-200 rounded-xl text-gray-600" href={`/list/exam?classId=6a086917d4e821b5f3e12e26`}>Exam</Link> 
          <Link className="py-2 px-6 bg-blue-200 rounded-xl  text-gray-600"  href={`/list/lesson?classId=6a086917d4e821b5f3e12e26`}>Lesson</Link> 
          <Link className="py-2 px-6 bg-lime-200 rounded-xl  text-gray-600"  href={`/list/result?studentId=6a086918d4e821b5f3e12e2c`}>Result</Link> 

      </div>
      </div>
      <div>

        <div><PieChart/></div>
      </div>
      <div className='p-4 bg-white rounded-xl' > <Annoncement/></div>
      </div>
    </div>
  )
}

export default studentpage
